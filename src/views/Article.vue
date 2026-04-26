<template>
  <div class="page-with-sidenav">
    <!-- 文章目录侧边栏 -->
    <aside class="sidenav">
      <div class="sidenav-title">章节目录</div>
      <div class="sidenav-list">
        <div
          v-for="(items, category) in grouped"
          :key="category"
          class="sidenav-category"
        >
          <div class="category-label">{{ category }}</div>
          <div
            v-for="item in items"
            :key="item.path"
            class="sidenav-item"
            :class="{ active: selectedFile === item.path }"
            @click="loadContent(item.path)"
          >
            {{ item.displayName }}
          </div>
        </div>
      </div>
    </aside>

    <!-- 文章内容 -->
    <div class="content-area">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <article v-else-if="htmlContent" class="markdown-body" ref="articleRef" v-html="htmlContent"></article>
      <div v-else class="empty">请从左侧选择章节</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import { listFiles, readTextFile, groupFiles, replaceMarkdownImageUrls } from '../services/contentSource'

marked.use({ breaks: true })

function preprocess(text) {
  return text
    .replace(/&emsp;/g, '<span class="em-sp"></span>')
    .replace(/&ensp;/g, '<span class="en-sp"></span>')
}

const files = ref([])
const selectedFile = ref('')
const htmlContent = ref('')
const loading = ref(false)
const error = ref('')
const articleRef = ref(null)

onMounted(async () => {
  try {
    const data = await listFiles('novels')
    files.value = data
  } catch (e) {
    error.value = '加载失败：' + e.message
  }
})

const grouped = computed(() => {
  const groups = groupFiles(files.value, 'novels')
  const map = {}
  for (const g of groups) {
    map[g.title] = g.items.map(f => ({
      ...f,
      displayName: f.name.replace(/\.md$/, '')
    }))
  }
  return map
})

async function loadContent(path) {
  if (!path) return
  selectedFile.value = path
  loading.value = true
  error.value = ''
  htmlContent.value = ''
  try {
    const text = await readTextFile('novels', path)
    let html = await marked.parse(preprocess(text), { breaks: true, gfm: true })
    html = await replaceMarkdownImageUrls(html, path)
    html = await resolveMusicMarkers(html)
    htmlContent.value = html
    // 等 DOM 更新后初始化音乐播放器
    setTimeout(initMusicPlayers, 50)
  } catch (e) {
    error.value = '加载失败：' + e.message
  } finally {
    loading.value = false
  }
}

// 替换 [music:歌曲名.mp3;title:标题] 为音频播放器 HTML
async function resolveMusicMarkers(html) {
  const musicRegex = /\[music:(.+?\.mp3)(?:;title:([^\]]+))?\]/g
  const matches = [...html.matchAll(musicRegex)]
  if (matches.length === 0) return html

  // 获取音乐文件列表
  let musicFiles = []
  try {
    musicFiles = await listFiles('musics')
  } catch (e) {
    console.warn('获取音乐列表失败:', e)
    return html
  }

  let result = html
  for (const match of matches) {
    const fullMatch = match[0]
    const filename = match[1]
    const customTitle = match[2]

    // 在音乐列表里找对应文件
    const musicFile = musicFiles.find(f => f.name === filename)
    if (!musicFile) continue

    // 构造 raw.githubusercontent.com URL（文件名需要 encode）
    const encodedPath = musicFile.path.split('/').map(p => encodeURIComponent(p)).join('/')
    const url = `https://raw.githubusercontent.com/Plana-EpicTankCommander/musicpage/main/${encodedPath}`
    const title = customTitle || filename.replace('.mp3', '')

    // 替换为音频播放器 HTML
    const playerHtml = `
      <div class="inline-player-container" data-src="${url}" data-title="${title}">
        <div class="ip-info"><h3>${title}</h3></div>
        <div class="ip-controls">
          <div class="ip-progress-container">
            <button class="ip-control-btn paused"></button>
            <span class="ip-time">00:00</span>
            <div class="ip-progress-bar">
              <div class="ip-progress"></div>
              <input type="range" min="0" max="100" value="0" class="ip-progress-slider">
            </div>
            <span class="ip-time total-time">00:00</span>
          </div>
          <div class="ip-volume-control hidden">
            <span class="ip-volume-label">音量</span>
            <span class="ip-volume-icon">🔊</span>
            <input type="range" min="0" max="100" value="10" class="ip-volume-slider">
            <span class="ip-volume-value">10%</span>
          </div>
        </div>
      </div>
    `
    result = result.replace(fullMatch, playerHtml)
  }
  return result
}

// 用原生 JS 初始化文章里的音频播放器
function initMusicPlayers() {
  if (!articleRef.value) return
  const players = articleRef.value.querySelectorAll('.inline-player-container')
  players.forEach(container => {
    const btn = container.querySelector('.ip-control-btn')
    const audio = container.querySelector('audio')
    const progressBar = container.querySelector('.ip-progress')
    const slider = container.querySelector('.ip-progress-slider')
    const currentTimeEl = container.querySelector('.ip-time')
    const totalTimeEl = container.querySelector('.total-time')

    // 如果还没有 audio 元素，创建一个
    let audioEl = container.querySelector('audio.element')
    if (!audioEl) {
      audioEl = document.createElement('audio')
      audioEl.className = 'element'
      audioEl.src = container.dataset.src
      container.appendChild(audioEl)
    }

    // 格式化时间
    const formatTime = (seconds) => {
      if (isNaN(seconds) || seconds === 0) return '00:00'
      const m = Math.floor(seconds / 60)
      const s = Math.floor(seconds % 60)
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    // 播放/暂停
    btn.addEventListener('click', () => {
      if (audioEl.paused) {
        // 暂停其他所有
        document.querySelectorAll('.inline-player-container audio').forEach(a => {
          if (a !== audioEl) { a.pause(); a.dispatchEvent(new Event('pause')) }
        })
        audioEl.play()
        btn.textContent = ''
        btn.classList.remove('paused')
        btn.classList.add('playing')
        // 初始化音量为15%
        audioEl.volume = 0.10
        // 显示音量控制
        const volCtrl = container.querySelector('.ip-volume-control')
        if (volCtrl) {
          volCtrl.classList.remove('hidden')
          const volSlider = volCtrl.querySelector('.ip-volume-slider')
          const volValue = volCtrl.querySelector('.ip-volume-value')
          const volIcon = volCtrl.querySelector('.ip-volume-icon')
          if (volSlider) volSlider.value = 10
          if (volValue) volValue.textContent = '10%'
          if (volIcon) volIcon.textContent = '🔈'
        }
      } else {
        audioEl.pause()
        btn.textContent = ''
        btn.classList.remove('playing')
        btn.classList.add('paused')
      }
    })

    // 时间更新
    audioEl.addEventListener('timeupdate', () => {
      if (isNaN(audioEl.duration)) return
      const pct = (audioEl.currentTime / audioEl.duration) * 100
      if (progressBar) progressBar.style.width = pct + '%'
      if (slider) slider.value = pct
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audioEl.currentTime)
    })

    // 元数据加载完成
    audioEl.addEventListener('loadedmetadata', () => {
      if (totalTimeEl) totalTimeEl.textContent = formatTime(audioEl.duration)
    })

    // 播放结束
    audioEl.addEventListener('ended', () => {
      btn.textContent = ''
      btn.classList.remove('playing')
      btn.classList.add('paused')
      if (progressBar) progressBar.style.width = '0%'
      if (slider) slider.value = 0
      if (currentTimeEl) currentTimeEl.textContent = '00:00'
    })

    // 进度条拖动
    if (slider) {
      slider.addEventListener('input', () => {
        if (isNaN(audioEl.duration)) return
        audioEl.currentTime = (audioEl.duration * parseInt(slider.value)) / 100
      })
    }

    // 音量控制
    const volumeSlider = container.querySelector('.ip-volume-slider')
    const volumeValue = container.querySelector('.ip-volume-value')
    const volumeIcon = container.querySelector('.ip-volume-icon')
    if (volumeSlider) {
      volumeSlider.addEventListener('input', () => {
        const vol = parseInt(volumeSlider.value) / 100
        audioEl.volume = vol
        if (volumeValue) volumeValue.textContent = volumeSlider.value + '%'
        if (volumeIcon) volumeIcon.textContent = vol === 0 ? '🔇' : vol < 0.5 ? '🔉' : '🔊'
      })
      // 初始化音量图标
      if (volumeIcon) volumeIcon.textContent = '🔊'
    }
  })
}
</script>

<style scoped>
.page-with-sidenav {
  display: flex;
  min-height: 100vh;
}

.sidenav {
  width: 160px;
  background: #1a1a1a;
  color: #fff;
  padding: 1rem 0;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}

.sidenav-title {
  font-size: 0.8rem;
  color: #888;
  padding: 0 0.8rem 0.6rem;
  border-bottom: 1px solid #333;
  margin-bottom: 0.6rem;
  flex-shrink: 0;
}

.sidenav-list {
  overflow-y: auto;
  flex: 1;
}

.sidenav-category {
  margin-bottom: 0.5rem;
}

.category-label {
  font-size: 0.75rem;
  color: #666;
  padding: 0.3rem 0.8rem;
}

.sidenav-item {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  color: #aaa;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.1rem 0.3rem;
  transition: background 0.2s, color 0.2s;
  word-break: break-all;
}

.sidenav-item:hover {
  background: #333;
  color: #fff;
}

.sidenav-item.active {
  background: #4a90e2;
  color: #fff;
}

.content-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  background-color: rgba(245, 245, 245, 0.85);
  background-image: url('https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/%E6%B0%B4%E7%9D%80%E6%99%AE%E6%8B%89%E5%A8%9C.png');
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 30% auto;
  background-attachment: fixed;
}

.content-area > * {
  align-self: center;
  width: 100%;
  max-width: 900px;
}

.content-area h2 {
  padding: 0 2rem;
}

.loading, .error, .empty {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
}

.loading { background: #f0f0f0; color: #666; }
.error { background: #ffe0e0; color: #c00; }
.empty { background: #f9f9f9; color: #999; }

.markdown-body {
  text-align: left;
  line-height: 1.8;
  color: #333;
}

.markdown-body :deep(h1) { border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-top: 2rem; }
.markdown-body :deep(h2) { border-bottom: 1px solid #eee; padding-bottom: 0.3rem; margin-top: 1.5rem; }
.markdown-body :deep(h3) { margin-top: 1.2rem; }
.markdown-body :deep(p) { margin: 0.8rem 0; }
.markdown-body :deep(.em-sp) { display: inline-block; width: 2em; }
.markdown-body :deep(.en-sp) { display: inline-block; width: 1em; }
.markdown-body :deep(code) { background: #f5f5f5; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
.markdown-body :deep(pre) { background: #f5f5f5; padding: 1rem; border-radius: 8px; overflow-x: auto; }
.markdown-body :deep(blockquote) { border-left: 4px solid #4a90e2; margin: 1rem 0; padding: 0.5rem 1rem; background: #f0f7ff; }
.markdown-body :deep(img) { max-width: 70%; height: auto; display: block; margin: 0 auto; }
</style>

<style>
/* 全局样式：文章内音乐播放器（不能用 scoped） */
.inline-player-container {
  width: 61.8%;
  max-width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  margin: 8px auto;
  color: #333;
}

.inline-player-container audio {
  display: none;
}

.ip-info {
  text-align: center;
  margin-bottom: 8px;
}

.ip-info h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5em;
}

.ip-controls {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ip-progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 61.8%;
  margin: 0 auto;
}

.ip-control-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #b19cd9;
  background: #b19cd9;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  padding: 0;
}

.ip-control-btn:hover {
  transform: scale(1.1);
}

.ip-control-btn.playing {
  border-color: #6c9bff;
  background: #6c9bff;
}

.ip-time {
  font-size: 0.85em;
  color: #666;
  min-width: 40px;
  text-align: center;
}

.ip-progress-bar {
  flex: 1;
  position: relative;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.ip-progress {
  position: absolute;
  height: 100%;
  background: #1a73e8;
  border-radius: 3px;
  transition: width 0.1s linear;
  width: 0%;
}

.ip-progress-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 0;
}

.ip-volume-control.hidden {
  visibility: hidden;
  opacity: 0;
  height: 20px;
}

.ip-volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 5px;
  width: 61.8%;
  margin: 0 auto;
  height: 20px;
  transition: visibility 0.2s, opacity 0.2s;
}

.ip-volume-label {
  color: #666;
  font-size: 0.85em;
  min-width: 30px;
}

.ip-volume-icon {
  font-size: 0.9em;
}

.ip-volume-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
}

.ip-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #1a73e8;
  border-radius: 50%;
  cursor: pointer;
}

.ip-volume-value {
  color: #666;
  font-size: 0.85em;
  min-width: 35px;
  text-align: right;
}
</style>
