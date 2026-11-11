<template>
  <div class="article-page">
    <aside class="chapter-rail">
      <ChapterTree
        :groups="groups"
        :selected="selectedPath"
        :loading="listLoading"
        @select="select"
      />
    </aside>

    <div class="article-main">
      <header class="toolbar">
        <div class="toolbar-inner">
          <button type="button" class="btn btn-ghost btn-sm rail-btn" @click="openDrawer('chapters')">
            <Icon name="list" :size="16" />
            章节
          </button>

          <div class="crumb" :title="currentTitle">
            <span v-if="currentGroup" class="crumb-group">{{ currentGroup }}</span>
            <span v-if="currentGroup" class="crumb-sep">/</span>
            <span class="crumb-title">{{ currentItem ? currentTitle : '未选择章节' }}</span>
          </div>

          <div class="toolbar-actions">
            <button type="button" class="aa-btn" aria-label="缩小字号" :disabled="fontSize <= 15" @click="adjustFont(-1)">A−</button>
            <button type="button" class="aa-btn" aria-label="放大字号" :disabled="fontSize >= 21" @click="adjustFont(1)">A+</button>
            <button type="button" class="btn btn-ghost btn-sm toc-btn" @click="openDrawer('toc')">
              <Icon name="list" :size="16" />
              目录
            </button>
          </div>
        </div>
        <div class="read-progress" aria-hidden="true"><i :style="{ width: readingProgress + '%' }" /></div>
      </header>

      <div class="article-grid">
        <div class="article-col">
          <!-- 加载 -->
          <div v-if="loading" class="article-skeleton">
            <div class="skeleton sk-title" />
            <div v-for="n in 7" :key="n" class="skeleton sk-line" :class="{ 'is-short': n % 3 === 0 }" />
          </div>

          <!-- 错误 -->
          <div v-else-if="error" class="notice notice-error">
            <Icon name="alert" :size="18" />
            <span class="err-text">{{ error }}</span>
            <button type="button" class="btn btn-sm" @click="retry">
              <Icon name="refresh" :size="14" />
              重试
            </button>
          </div>

          <!-- PDF -->
          <div v-else-if="pdfUrl" class="pdf-wrap">
            <div class="pdf-bar">
              <span class="chip chip-accent">
                <Icon name="file" :size="13" />
                PDF
              </span>
              <span class="pdf-name">{{ currentTitle }}</span>
              <a class="section-link" :href="pdfRawUrl" target="_blank" rel="noreferrer">
                新窗口打开
                <Icon name="external" :size="13" />
              </a>
            </div>
            <div class="pdf-frame card">
              <iframe :src="pdfUrl" title="PDF 阅读器" frameborder="0" />
            </div>
          </div>

          <!-- 正文 -->
          <article
            v-else-if="htmlContent"
            ref="articleRef"
            class="prose"
            :style="{ '--prose-size': fontSize + 'px' }"
            v-html="htmlContent"
          />

          <!-- 空 -->
          <div v-else class="empty-state">
            <span class="es-icon"><Icon name="book" :size="26" /></span>
            <p class="es-title">从左侧挑选一篇文稿</p>
            <p class="es-text">章节按文件夹分组，点击即可开始阅读。</p>
          </div>

          <nav v-if="prevItem || nextItem" class="chapter-nav" aria-label="章节导航">
            <button
              type="button"
              class="nav-card"
              :class="{ 'is-disabled': !prevItem }"
              :disabled="!prevItem"
              @click="prevItem && select(prevItem)"
            >
              <span class="nc-label"><Icon name="arrow-left" :size="14" /> 上一篇</span>
              <span class="nc-name">{{ prevItem ? prevItem.displayName : '已经是第一篇' }}</span>
            </button>
            <button
              type="button"
              class="nav-card is-next"
              :class="{ 'is-disabled': !nextItem }"
              :disabled="!nextItem"
              @click="nextItem && select(nextItem)"
            >
              <span class="nc-label">下一篇 <Icon name="arrow-right" :size="14" /></span>
              <span class="nc-name">{{ nextItem ? nextItem.displayName : '已经是最后一篇' }}</span>
            </button>
          </nav>
        </div>

        <aside v-if="articleToc.length" class="toc-rail">
          <ArticleToc :items="articleToc" :active-id="activeHeadingId" @navigate="scrollToHeading" />
        </aside>
      </div>
    </div>

    <!-- 移动端抽屉 -->
    <transition name="fade">
      <div v-if="drawer" class="drawer-backdrop" @click.self="drawer = false">
        <div class="drawer">
          <div class="drawer-head">
            <span>{{ drawer === 'chapters' ? '章节目录' : '本页目录' }}</span>
            <button type="button" class="btn-icon" aria-label="关闭" @click="drawer = false">
              <Icon name="close" :size="18" />
            </button>
          </div>
          <div class="drawer-body">
            <ChapterTree
              v-if="drawer === 'chapters'"
              :groups="groups"
              :selected="selectedPath"
              :loading="listLoading"
              @select="select($event, true)"
            />
            <ArticleToc
              v-else
              :items="articleToc"
              :active-id="activeHeadingId"
              @navigate="onTocNavigate"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, createApp, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { getActivePinia } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import Icon from '../components/ui/Icon.vue'
import ChapterTree from '../components/article/ChapterTree.vue'
import ArticleToc from '../components/article/ArticleToc.vue'
import ImageCanvas from '../components/ImageCanvas/ImageCanvas.vue'
import InlineTrack from '../components/player/InlineTrack.vue'
import {
  listFiles,
  readTextFile,
  groupFiles,
  replaceMarkdownImageUrls,
  resolveCanvasMarkers,
  getPdfUrl,
  getPdfRawUrl
} from '../services/contentSource'

marked.use({ breaks: true })

const LAST_KEY = 'chireiden:last-chapter'
const FONT_KEY = 'chireiden:font-size'

const route = useRoute()
const router = useRouter()

const groups = ref([])
const flatItems = ref([])
const selectedPath = ref('')
const htmlContent = ref('')
const pdfUrl = ref('')
const pdfRawUrl = ref('')
const loading = ref(false)
const listLoading = ref(true)
const error = ref('')
const articleRef = ref(null)

const articleToc = ref([])
const activeHeadingId = ref('')
const readingProgress = ref(0)

const fontSize = ref(readFontSize())
const drawer = ref('')

const mountedApps = []

const flatIndex = computed(() => flatItems.value.findIndex((item) => item.path === selectedPath.value))
const currentItem = computed(() => (flatIndex.value >= 0 ? flatItems.value[flatIndex.value] : null))
const currentGroup = computed(() => currentItem.value?.group || '')
const currentTitle = computed(() => currentItem.value?.displayName || '')
const prevItem = computed(() => (flatIndex.value > 0 ? flatItems.value[flatIndex.value - 1] : null))
const nextItem = computed(() => {
  const next = flatIndex.value + 1
  return flatIndex.value >= 0 && next < flatItems.value.length ? flatItems.value[next] : null
})

function readFontSize() {
  try {
    const raw = Number(localStorage.getItem(FONT_KEY))
    if (raw >= 15 && raw <= 21) return raw
  } catch {
    /* ignore */
  }
  return 17
}

function preprocess(text) {
  return text
    .replace(/&emsp;/g, '<span class="em-sp"></span>')
    .replace(/&ensp;/g, '<span class="en-sp"></span>')
}

function displayNameOf(item) {
  return item.fileType === 'pdf'
    ? item.name.replace(/\.pdf$/i, '')
    : item.name.replace(/\.md$/i, '')
}

onMounted(async () => {
  await loadList()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  destroyEmbeds()
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
})

async function loadList() {
  listLoading.value = true
  try {
    const data = await listFiles('novels')
    groups.value = groupFiles(data, 'novels').map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, displayName: displayNameOf(item) }))
    }))
    flatItems.value = groups.value.flatMap((group) =>
      group.items.map((item) => ({ ...item, group: group.title }))
    )

    const target = pickInitial()
    if (target) await loadContent(target, false)
    else listLoading.value = false
  } catch (e) {
    listLoading.value = false
    error.value = `章节列表加载失败：${e.message}`
  }
}

function pickInitial() {
  const wanted = typeof route.query.doc === 'string' ? route.query.doc : readLast()
  const found = flatItems.value.find((item) => item.path === wanted)
  return found || flatItems.value[0] || null
}

function readLast() {
  try {
    return localStorage.getItem(LAST_KEY) || ''
  } catch {
    return ''
  }
}

function remember(path) {
  try {
    localStorage.setItem(LAST_KEY, path)
  } catch {
    /* ignore */
  }
}

async function loadContent(item, scroll = true) {
  if (!item) return
  destroyEmbeds()
  selectedPath.value = item.path
  remember(item.path)
  loading.value = true
  error.value = ''
  htmlContent.value = ''
  pdfUrl.value = ''
  pdfRawUrl.value = ''
  articleToc.value = []
  activeHeadingId.value = ''
  readingProgress.value = 0

  try {
    if (item.fileType === 'pdf') {
      pdfUrl.value = await getPdfUrl(item.path)
      pdfRawUrl.value = getPdfRawUrl(item.path)
      loading.value = false
      if (scroll) window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const text = await readTextFile('novels', item.path)
    let html = await marked.parse(preprocess(text), { breaks: true, gfm: true })
    html = await replaceMarkdownImageUrls(html, item.path)
    html = await resolveCanvasMarkers(html, item.path)
    html = await resolveMusicMarkers(html)
    htmlContent.value = html
    loading.value = false
    await nextTick()

    parseArticleToc()
    mountEmbeds()

    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' })
    await nextTick()
    onScroll()
  } catch (e) {
    error.value = `加载失败：${e.message}`
  } finally {
    loading.value = false
    listLoading.value = false
  }
}

// ---------- 音乐标记 ----------

async function resolveMusicMarkers(html) {
  const musicRegex = /\[music:(.+?\.mp3)(?:;title:([^\]]+))?\]/g
  const matches = [...html.matchAll(musicRegex)]
  if (matches.length === 0) return html

  let musicFiles = []
  try {
    musicFiles = await listFiles('musics')
  } catch (e) {
    console.warn('获取音乐列表失败:', e)
    return html
  }

  let result = html
  for (const match of matches) {
    const [fullMatch, filename, customTitle] = match
    const musicFile = musicFiles.find((file) => file.name === filename)
    if (!musicFile) continue

    const encodedPath = musicFile.path.split('/').map((part) => encodeURIComponent(part)).join('/')
    const url = `https://raw.githubusercontent.com/Plana-EpicTankCommander/musicpage/main/${encodedPath}`
    const title = customTitle || filename.replace(/\.mp3$/i, '')
    const host = `<div class="inline-track-host" data-track-src="${escapeAttr(url)}" data-track-title="${escapeAttr(title)}"></div>`
    result = result.replace(fullMatch, () => host)
  }
  return result
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// ---------- 目录 ----------

function parseArticleToc() {
  articleToc.value = []
  if (!articleRef.value) return
  const headings = articleRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const items = []
  headings.forEach((heading, index) => {
    const id = `heading-${index}`
    heading.id = id
    items.push({
      id,
      level: Number(heading.tagName.charAt(1)),
      text: heading.textContent?.trim() || ''
    })
  })
  articleToc.value = items
  activeHeadingId.value = items[0]?.id || ''
}

function scrollToHeading(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (drawer.value === 'toc') drawer.value = ''
}

function onTocNavigate(id) {
  drawer.value = ''
  nextTick(() => scrollToHeading(id))
}

// ---------- 滚动：阅读进度 + 目录高亮 ----------

let scrollRaf = 0

function onScroll() {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0
    updateReadingProgress()
    updateActiveHeading()
  })
}

function updateReadingProgress() {
  const el = articleRef.value
  if (!el) {
    readingProgress.value = 0
    return
  }
  const rect = el.getBoundingClientRect()
  const top = rect.top + window.scrollY
  const total = Math.max(rect.height - window.innerHeight, 1)
  const value = ((window.scrollY - top) / total) * 100
  readingProgress.value = Math.min(100, Math.max(0, value))
}

function updateActiveHeading() {
  if (!articleToc.value.length) return
  let current = articleToc.value[0].id
  for (const item of articleToc.value) {
    const el = document.getElementById(item.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= 150) current = item.id
    else break
  }
  activeHeadingId.value = current
}

// ---------- 嵌入组件（画布 / 音乐） ----------

function mountEmbeds() {
  const root = articleRef.value
  if (!root) return

  root.querySelectorAll('.image-canvas-host').forEach((host) => {
    if (!host.dataset.canvasSrc) return
    const app = createApp(ImageCanvas, {
      src: host.dataset.canvasSrc,
      alt: host.dataset.canvasAlt || '',
      height: host.dataset.canvasHeight || '420px',
      fitMode: host.dataset.canvasFit || 'contain'
    })
    app.mount(host)
    mountedApps.push(app)
  })

  root.querySelectorAll('.inline-track-host').forEach((host) => {
    const app = createApp(InlineTrack, {
      src: host.dataset.trackSrc,
      title: host.dataset.trackTitle || '未命名曲目'
    })
    const pinia = getActivePinia()
    if (pinia) app.use(pinia)
    app.mount(host)
    mountedApps.push(app)
  })
}

function destroyEmbeds() {
  while (mountedApps.length) {
    const app = mountedApps.pop()
    try {
      app.unmount()
    } catch (e) {
      console.warn('嵌入组件卸载失败:', e)
    }
  }
}

// ---------- 交互 ----------

function select(item, fromDrawer = false) {
  if (!item) return
  if (fromDrawer) drawer.value = ''
  if (item.path === selectedPath.value) return
  if (route.query.doc !== item.path) {
    router.replace({ path: '/article', query: { doc: item.path } }).catch(() => {})
  }
  loadContent(item)
}

watch(
  () => route.query.doc,
  (doc) => {
    if (!doc || typeof doc !== 'string' || doc === selectedPath.value) return
    const found = flatItems.value.find((item) => item.path === doc)
    if (found) loadContent(found)
  }
)

function adjustFont(delta) {
  const next = Math.min(21, Math.max(15, fontSize.value + delta))
  if (next === fontSize.value) return
  fontSize.value = next
  try {
    localStorage.setItem(FONT_KEY, String(next))
  } catch {
    /* ignore */
  }
}

function openDrawer(mode) {
  drawer.value = mode
}

function retry() {
  if (flatItems.value.length && currentItem.value) loadContent(currentItem.value)
  else loadList()
}
</script>

<style scoped>
.article-page {
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, 1fr);
  min-height: 100vh;
}

/* ---------- 左侧章节栏 ---------- */

.chapter-rail {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 26px 18px 22px 26px;
  border-right: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 55%, transparent);
}

/* ---------- 主区域 ---------- */

.article-main {
  min-width: 0;
  padding: 0 40px 120px;
}

.toolbar {
  position: sticky;
  top: 0;
  z-index: 20;
  margin: 0 -40px;
  padding: 0 40px;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(12px);
}

.toolbar-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 58px;
}

.rail-btn {
  display: none;
}

.crumb {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.82rem;
  overflow: hidden;
}

.crumb-group {
  flex-shrink: 0;
  color: var(--accent);
  letter-spacing: 0.04em;
}

.crumb-sep {
  color: var(--line-strong);
}

.crumb-title {
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 0.98rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.aa-btn {
  height: 30px;
  min-width: 34px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast);
}

.aa-btn:hover:not(:disabled) {
  background: var(--surface-2);
  color: var(--ink);
}

.aa-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.toc-btn {
  display: none;
}

.read-progress {
  height: 2px;
  margin: 0 -40px;
  background: var(--line);
}

.read-progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transition: width 0.12s linear;
}

/* ---------- 内容网格 ---------- */

.article-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 36px;
  max-width: 760px;
  margin: 0 auto;
  padding-top: 30px;
}

.article-col {
  min-width: 0;
}

.toc-rail {
  display: none;
}

.article-skeleton {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}

.sk-title {
  height: 30px;
  width: 46%;
  margin-bottom: 10px;
}

.sk-line {
  height: 15px;
  width: 100%;
}

.sk-line.is-short {
  width: 68%;
}

.err-text {
  flex: 1;
}

/* ---------- PDF ---------- */

.pdf-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 0.84rem;
}

.pdf-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--ink-soft);
}

.pdf-frame {
  overflow: hidden;
  padding: 0;
}

.pdf-frame iframe {
  display: block;
  width: 100%;
  height: calc(100vh - 210px);
  min-height: 520px;
  border: 0;
  background: var(--surface);
}

/* ---------- 空状态 ---------- */

.empty-state {
  padding: 60px 24px;
  text-align: center;
  border-radius: var(--radius);
  border: 1px dashed var(--line-strong);
}

.es-icon {
  display: inline-grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  margin-bottom: 14px;
}

.es-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
}

.es-text {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--ink-faint);
}

/* ---------- 上下篇 ---------- */

.chapter-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.nav-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: var(--surface);
  text-align: left;
  transition: border-color var(--fast), box-shadow var(--fast), transform var(--fast);
}

.nav-card:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--accent) 36%, var(--line));
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.nav-card.is-next {
  text-align: right;
  align-items: flex-end;
}

.nav-card.is-disabled {
  opacity: 0.5;
  cursor: default;
}

.nc-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
}

.nc-name {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* ---------- 抽屉 ---------- */

.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(22, 16, 32, 0.42);
  backdrop-filter: blur(2px);
  display: flex;
}

.drawer {
  width: min(320px, 86vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-right: 1px solid var(--line);
  box-shadow: var(--shadow-lg);
  animation: slide-in 0.24s var(--ease);
}

@keyframes slide-in {
  from { transform: translateX(-16px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px 14px 20px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 0.95rem;
}

.drawer-body {
  flex: 1;
  min-height: 0;
  padding: 16px 16px 24px;
  overflow: hidden;
}

.drawer-body :deep(.toc) {
  position: static;
  max-height: none;
  border-left: 0;
  padding: 0;
}

/* ---------- 响应式 ---------- */

@media (min-width: 1400px) {
  .article-grid {
    grid-template-columns: minmax(0, 1fr) 176px;
    max-width: 968px;
  }
  .toc-rail {
    display: block;
  }
  .toc-btn {
    display: none;
  }
}

@media (max-width: 1399px) {
  .toc-btn {
    display: inline-flex;
  }
}

@media (max-width: 1023px) {
  .article-page {
    grid-template-columns: minmax(0, 1fr);
  }
  .chapter-rail {
    display: none;
  }
  .rail-btn {
    display: inline-flex;
  }
  .article-main {
    padding: 0 22px 90px;
  }
  .toolbar {
    margin: 0 -22px;
    padding: 0 22px;
    top: 0;
  }
  .read-progress {
    margin: 0 -22px;
  }
}

@media (max-width: 768px) {
  .toolbar {
    top: calc(var(--topbar-h) + env(safe-area-inset-top, 0px));
  }
  .article-grid {
    padding-top: 22px;
  }
  .chapter-nav {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 40px;
  }
  .nav-card.is-next {
    text-align: left;
    align-items: flex-start;
  }
  .pdf-frame iframe {
    height: calc(100vh - 260px);
  }
}

@media (max-width: 430px) {
  .aa-btn {
    display: none;
  }
  .toolbar-inner {
    gap: 8px;
  }
}
</style>
