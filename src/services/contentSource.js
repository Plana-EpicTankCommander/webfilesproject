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
  md: 'text/markdown;charset=utf-8'
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

// 替换 markdown HTML 中的图片 URL
async function replaceMarkdownImageUrls(html, markdownPath) {
  const imgRegex = /<img\b[^>]*src="([^"]*)"[^>]*>/g
  const matches = [...html.matchAll(imgRegex)]
  if (matches.length === 0) return html

  let result = html
  for (const match of matches) {
    const imgUrl = decodeURIComponent(match[1])  // marked 会把中文 URL 编码，需要先解码

    // 先尝试直接转换绝对 GitHub blob URL
    const rawUrl = convertGitHubBlobToRaw(imgUrl)
    if (rawUrl) {
      result = result.replace(match[1], rawUrl)
      continue
    }

    // 再尝试相对路径
    const repoPath = resolveMarkdownAssetRepoPath(markdownPath, imgUrl)
    if (!repoPath) continue
    let section = resolveSectionFromRepoPath(repoPath)
    let filePath = section ? stripBaseDir(section, repoPath) : repoPath

    // 如果图片在小说目录下（相对路径如 "图片.png"），改为从 images/ 目录查找
    // 条件：section 是 novels，或者 section 为 null 且路径段数<=2（即 "文件名.jpg" 或 "novels/文件名.jpg"）
    if (section === 'novels' || (!section && repoPath && repoPath.split('/').length <= 2)) {
      section = 'images'
      // 用文件名本身，不要完整路径
      filePath = imgUrl.split('/').pop()
    }

    if (!section || !filePath) continue
    const newUrl = await getImageUrl(section, filePath)
    result = result.replace(match[1], newUrl)
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
  const result = data.filter(f => {
    if (f.type !== 'file') return false
    if (section === 'novels') return f.name.endsWith('.md') && f.name !== 'README.md'
    if (section === 'images') return /\.(png|jpg|jpeg|gif|webp)$/i.test(f.name) && f.name !== 'README.md'
    if (section === 'musics') return f.name.endsWith('.mp3')
    return false
  })

  // 写入缓存
  listCache[section] = { data: result, ts: now }
  return result
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

export function groupFiles(files, section) {
  const groups = {}
  for (const f of files) {
    let groupName
    if (section === 'novels') {
      const name = f.name.replace(/\.md$/, '')
      const parts = name.split('-')
      groupName = parts.length > 2 ? parts.slice(0, -1).join('-') : parts[0]
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
