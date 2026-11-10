const GITHUB_API = 'https://api.github.com'
const GITHUB_RAW = 'https://raw.githubusercontent.com'

// 简单内存缓存：2分钟内不重复请求
const listCache = {}
const LIST_CACHE_TTL = 2 * 60 * 1000  // 2 分钟

const REPO_CONFIG = {
  novels: {
    owner: 'Plana-EpicTankCommander',
    repo: 'sth_ineed',
    branch: 'main',
    baseDir: 'novels'
  },
  images: {
    owner: 'Plana-EpicTankCommander',
    repo: 'sth_ineed',
    branch: 'main',
    baseDir: 'images'
  },
  musics: {
    owner: 'Plana-EpicTankCommander',
    repo: 'musicpage',
    branch: 'main',
    baseDir: ''
  }
}

const MIME_TYPES = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  md: 'text/markdown;charset=utf-8',
  pdf: 'application/pdf'
}

function guessMimeType(path) {
  const ext = path.split('.').pop()?.toLowerCase() || ''
  return MIME_TYPES[ext] || 'application/octet-stream'
}

function naturalSort(a, b) {
  const aIsMain = a.includes('主线')
  const bIsMain = b.includes('主线')
  if (aIsMain && !bIsMain) return -1
  if (!aIsMain && bIsMain) return 1
  const splitA = a.split(/(\d+)/)
  const splitB = b.split(/(\d+)/)
  for (let i = 0; i < Math.min(splitA.length, splitB.length); i++) {
    if (i % 2 === 0) {
      const cmp = splitA[i].localeCompare(splitB[i], 'zh-CN')
      if (cmp !== 0) return cmp
    } else {
      const na = parseInt(splitA[i])
      const nb = parseInt(splitB[i])
      if (na !== nb) return na - nb
    }
  }
  return splitA.length - splitB.length
}

// 规范化路径（处理 .. 和 .）
function normalizePosixPath(filePath) {
  const segments = filePath.replace(/\\/g, '/').split('/')
  const normalized = []
  for (const seg of segments) {
    if (!seg || seg === '.') continue
    if (seg === '..') { normalized.pop(); continue }
    normalized.push(seg)
  }
  return normalized.join('/')
}

// 获取目录部分
function dirname(filePath) {
  const normalized = normalizePosixPath(filePath)
  const lastSlash = normalized.lastIndexOf('/')
  return lastSlash === -1 ? '' : normalized.slice(0, lastSlash)
}

// 从 markdown 文件路径解析资源路径
function resolveMarkdownAssetRepoPath(markdownPath, assetUrl) {
  const trimmed = assetUrl.trim()
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('data:') || trimmed.startsWith('//')) return null
  // 已经是完整 URL
  if (/^https?:\/\//i.test(trimmed)) return null
  // 相对路径
  const markdownDir = dirname(markdownPath)
  const joined = markdownDir ? `${markdownDir}/${trimmed}` : trimmed
  return normalizePosixPath(joined)
}

// 根据仓库路径判断属于哪个栏目
function resolveSectionFromRepoPath(repoPath) {
  const normalized = normalizePosixPath(repoPath)
  for (const section of Object.keys(REPO_CONFIG)) {
    const baseDir = REPO_CONFIG[section].baseDir
    if (normalized === baseDir || normalized.startsWith(`${baseDir}/`)) {
      return section
    }
  }
  return null
}

// 去掉栏目的基础目录
function stripBaseDir(section, repoPath) {
  const normalized = normalizePosixPath(repoPath)
  const baseDir = REPO_CONFIG[section]?.baseDir || ''
  if (normalized === baseDir) return ''
  if (normalized.startsWith(`${baseDir}/`)) {
    return normalized.slice(baseDir.length + 1)
  }
  return normalized
}

// 把 github.com blob URL 转成 raw.githubusercontent.com URL
function convertGitHubBlobToRaw(url) {
  // 匹配 https://github.com/owner/repo/blob/branch/path
  const match = url.match(/^https?:\/\/github\.com\/([^\/]+\/[^\/]+)\/blob\/([^\/]+)\/(.+)$/)
  if (match) {
    return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${match[3]}`
  }
  return null // 不是 blob URL 或不是 github.com
}

// 把 markdown 里引用的图片路径解析成可访问的 URL
// 规则：GitHub blob 链接转 raw 直链；外部 URL 原样保留；相对路径优先去 images/ 目录找
async function resolveImageAssetUrl(markdownPath, assetUrl) {
  const trimmed = (assetUrl || '').trim()
  if (!trimmed) return null

  // 先尝试直接转换绝对 GitHub blob URL
  const rawUrl = convertGitHubBlobToRaw(trimmed)
  if (rawUrl) return rawUrl

  // 外部链接保持不变
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  // 锚点、data URI、协议相对地址不处理
  if (trimmed.startsWith('#') || trimmed.startsWith('data:') || trimmed.startsWith('//')) return null

  // 再尝试相对路径
  const repoPath = resolveMarkdownAssetRepoPath(markdownPath, trimmed)
  if (!repoPath) return null
  let section = resolveSectionFromRepoPath(repoPath)
  let filePath = section ? stripBaseDir(section, repoPath) : repoPath

  // 如果图片在小说目录下（相对路径如 "图片.png"），改为从 images/ 目录查找
  if (section === 'novels' || (!section && repoPath.split('/').length <= 2)) {
    section = 'images'
    filePath = trimmed.split('/').pop()
  }

  if (!section || !filePath) return null
  return getImageUrl(section, filePath)
}

// 替换 markdown HTML 中的图片 URL
// 支持尺寸参数语法：![](图片.png?w=50) 表示图片宽度为 50%
async function replaceMarkdownImageUrls(html, markdownPath) {
  const imgRegex = /<img\b[^>]*src="([^"]*)"[^>]*>/g
  const matches = [...html.matchAll(imgRegex)]
  if (matches.length === 0) return html

  let result = html
  for (const match of matches) {
    // 非法转义不应让整篇文章加载失败
    let imgUrl = match[1]
    try {
      imgUrl = decodeURIComponent(match[1])
    } catch {
      imgUrl = match[1]
    }

    // 解析尺寸参数：图片路径尾部 ?w=数字 表示宽度百分比
    let sizePercent = null
    let cleanUrl = imgUrl
    const sizeMatch = imgUrl.match(/^(.+?)\?w=(\d{1,3})$/)
    if (sizeMatch) {
      const pct = parseInt(sizeMatch[2], 10)
      if (pct >= 1 && pct <= 150) {
        sizePercent = pct
        cleanUrl = sizeMatch[1]
      }
    }

    const newUrl = await resolveImageAssetUrl(markdownPath, cleanUrl)
    if (!newUrl) continue

    // 替换整个 img 标签
    const oldTag = match[0]
    let newTag = oldTag.replace(match[1], newUrl)
    if (sizePercent !== null) {
      newTag = newTag.replace('<img', `<img style="max-width:${sizePercent}%"`)
    }
    result = result.replace(oldTag, newTag)
  }
  return result
}

// ---------- 画布图片标记：[canvas:图片.png;h:520;w:80;fit:cover;title:说明] ----------

const CANVAS_MARKER_RE = /\[canvas:([^\]]+)\]/g

function escapeHtmlAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function parseCanvasMarker(content) {
  const parts = content.split(';')
  const file = parts[0].trim()
  if (!file) return null

  const options = {}
  for (const part of parts.slice(1)) {
    const index = part.indexOf(':')
    if (index <= 0) continue
    options[part.slice(0, index).trim().toLowerCase()] = part.slice(index + 1).trim()
  }

  const parsedWidth = parseInt(options.w, 10)
  const parsedHeight = parseInt(options.h, 10)

  return {
    file,
    width: Number.isFinite(parsedWidth) ? Math.min(100, Math.max(20, parsedWidth)) : 100,
    height: Number.isFinite(parsedHeight) ? Math.min(1200, Math.max(160, parsedHeight)) : 420,
    fit: options.fit === 'cover' ? 'cover' : 'contain',
    alt: options.title || file.split('/').pop()
  }
}

// 把 [canvas:...] 标记替换成占位 div，交给 Article 页面挂载 ImageCanvas 组件
export async function resolveCanvasMarkers(html, markdownPath) {
  const matches = [...html.matchAll(CANVAS_MARKER_RE)]
  if (matches.length === 0) return html

  let result = html
  for (const match of matches) {
    const marker = parseCanvasMarker(match[1])
    if (!marker) continue

    const url = await resolveImageAssetUrl(markdownPath, marker.file)
    if (!url) continue

    const host = `<div class="image-canvas-host"`
      + ` style="width:${marker.width}%;margin:1rem auto;"`
      + ` data-canvas-src="${escapeHtmlAttribute(url)}"`
      + ` data-canvas-height="${marker.height}px"`
      + ` data-canvas-fit="${marker.fit}"`
      + ` data-canvas-alt="${escapeHtmlAttribute(marker.alt)}"`
      + `></div>`

    result = result.replace(match[0], () => host)
  }
  return result
}

// 获取文件列表（需要 GitHub API）
async function listFiles(section) {
  const config = REPO_CONFIG[section]
  if (!config) return []

  // 检查缓存，2 分钟内不重复请求
  const now = Date.now()
  if (listCache[section] && (now - listCache[section].ts) < LIST_CACHE_TTL) {
    return listCache[section].data
  }

  let result = []
  if (section === 'novels') {
    // 递归获取所有子目录里的 .md 文件
    result = await fetchDirRecursive(config.owner, config.repo, config.branch, config.baseDir)
  } else {
    const path = config.baseDir
    const url = `${GITHUB_API}/repos/${config.owner}/${config.repo}/contents/${path}`
    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    if (!res.ok) {
      if (res.status === 403) throw new Error('API 请求次数超限，请稍后再试')
      throw new Error(`请求失败: ${res.status}`)
    }
    const data = await res.json()
    if (!Array.isArray(data)) return []
    result = data.filter(f => {
      if (f.type !== 'file') return false
      if (section === 'images') return /\.(png|jpg|jpeg|gif|webp)$/i.test(f.name) && f.name !== 'README.md'
      if (section === 'musics') return f.name.endsWith('.mp3')
      if (section === 'pdfs') return f.name.toLowerCase().endsWith('.pdf')
      return false
    })
  }

  // 写入缓存
  listCache[section] = { data: result, ts: now }
  return result
}

// 递归获取目录下所有文件，返回带上 folder 信息
async function fetchDirRecursive(owner, repo, branch, path, basePath = '') {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
  if (!res.ok) return []
  const data = await res.json()
  if (!Array.isArray(data)) return []

  const files = []
  for (const item of data) {
    if (item.type === 'file' && item.name !== 'README.md') {
      const isMd = item.name.endsWith('.md')
      const isPdf = item.name.toLowerCase().endsWith('.pdf')
      if (!isMd && !isPdf) continue
      const relativePath = item.path.replace(/^novels\//, '')
      const folder = relativePath.includes('/') ? relativePath.split('/')[0] : ''
      files.push({ ...item, folder, fileType: isMd ? 'md' : 'pdf' })
    } else if (item.type === 'dir') {
      const subFiles = await fetchDirRecursive(owner, repo, branch, item.path, item.path)
      files.push(...subFiles)
    }
  }
  return files
}

// 用 raw.githubusercontent.com 读取文本
export async function readTextFile(section, path) {
  const config = REPO_CONFIG[section]
  const url = `${GITHUB_RAW}/${config.owner}/${config.repo}/${config.branch}/${path}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`请求失败: ${res.status}`)
  return res.text()
}

// 用 raw.githubusercontent.com 读取图片
// 音乐直接用 raw URL
export async function getImageUrl(section, path) {
  const config = REPO_CONFIG[section]
  const baseDir = config.baseDir ? config.baseDir + '/' : ''
  return `${GITHUB_RAW}/${config.owner}/${config.repo}/${config.branch}/${baseDir}${path}`
}
export async function getMusicUrl(section, path) {
  const config = REPO_CONFIG[section]
  return `${GITHUB_RAW}/${config.owner}/${config.repo}/${config.branch}/${path}`
}

export async function getPdfUrl(path) {
  const encodedPath = path.split('/').map(p => encodeURIComponent(p)).join('/')
  const rawUrl = `${GITHUB_RAW}/Plana-EpicTankCommander/sth_ineed/main/${encodedPath}`
  // 用 PDF.js viewer（任何浏览器都支持）
  return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(rawUrl)}`
}

export function groupFiles(files, section) {
  const groups = {}
  for (const f of files) {
    let groupName
    if (section === 'novels') {
      // 按子文件夹归类，folder 为空说明在根目录
      groupName = f.folder || '根目录'
    } else if (section === 'images') {
      const parts = f.name.split('-')
      groupName = parts.length > 1 ? parts[0] : '其他'
    } else {
      groupName = '全部'
    }
    if (!groups[groupName]) groups[groupName] = []
    groups[groupName].push(f)
  }
  return Object.entries(groups)
    .map(([title, items]) => ({
      title,
      items: items.sort((a, b) => naturalSort(a.name, b.name)),
      isExpanded: title === '主线'
    }))
    .sort((a, b) => {
      if (a.title === '主线') return -1
      if (b.title === '主线') return 1
      return a.title.localeCompare(b.title, 'zh-CN')
    })
}

export { listFiles, naturalSort, replaceMarkdownImageUrls }
