<template>
  <div class="page">
    <h2>📊 状态</h2>
    <p class="subtitle">内容获取来源</p>

    <div class="source-list">
      <div class="source-item">
        <div class="source-icon">📝</div>
        <div class="source-info">
          <div class="source-name">文章</div>
          <div class="source-detail">
            仓库：
            <a :href="novelsUrl" target="_blank">{{ novelsUrl }}</a>
          </div>
          <div class="source-detail">目录：<code>{{ REPO_CONFIG.novels.baseDir }}</code></div>
        </div>
        <div class="source-action">
          <button class="test-btn" :class="novelsStatus" :disabled="novelsStatus === 'testing'" @click="testRepo('novels')">
            {{ statusText(novelsStatus) }}
          </button>
        </div>
      </div>

      <div class="source-item">
        <div class="source-icon">🖼️</div>
        <div class="source-info">
          <div class="source-name">图片</div>
          <div class="source-detail">
            仓库：
            <a :href="imagesUrl" target="_blank">{{ imagesUrl }}</a>
          </div>
          <div class="source-detail">目录：<code>{{ REPO_CONFIG.images.baseDir }}</code></div>
        </div>
        <div class="source-action">
          <button class="test-btn" :class="imagesStatus" :disabled="imagesStatus === 'testing'" @click="testRepo('images')">
            {{ statusText(imagesStatus) }}
          </button>
        </div>
      </div>

      <div class="source-item">
        <div class="source-icon">🎵</div>
        <div class="source-info">
          <div class="source-name">音乐</div>
          <div class="source-detail">
            仓库：
            <a :href="musicsUrl" target="_blank">{{ musicsUrl }}</a>
          </div>
          <div class="source-detail">目录：<code>{{ REPO_CONFIG.musics.baseDir || '根目录' }}</code></div>
        </div>
        <div class="source-action">
          <button class="test-btn" :class="musicsStatus" :disabled="musicsStatus === 'testing'" @click="testRepo('musics')">
            {{ statusText(musicsStatus) }}
          </button>
        </div>
      </div>
    </div>

    <p class="note">
      💡 所有内容均从 GitHub 仓库获取，文章和图片使用
      <code>raw.githubusercontent.com</code> 直链访问，音乐使用下载链接播放。
    </p>

    <div class="usage-guide">
      <h3>📖 文章内插入说明</h3>

      <div class="guide-section">
        <div class="guide-title">🖼️ 插入图片</div>
        <div class="guide-content">
          <p>在文章（<code>.md</code> 文件）中使用 Markdown 图片语法：</p>
          <code>![](图片文件名.png)</code>
          <p>图片文件需上传到仓库的 <code>images/</code> 目录。</p>
          <p class="url-rule">📋 URL 替换规则（代码逻辑）：</p>
          <ol>
            <li>读取文章相对路径（如 <code>novels/ChinaRise.md</code>）</li>
            <li>如果图片是相对路径（如 <code>![](隐忍.jpg)</code>）：<br>
              → 自动拼接为 <code>images/隐忍.jpg</code><br>
              → 生成完整 URL：<br>
              <code>https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/隐忍.jpg</code>
            </li>
            <li>如果图片是 GitHub blob 绝对链接（如 <code>![](https://github.com/.../blob/main/images/xxx.png)</code>）：<br>
              → 自动转换为 <code>raw.githubusercontent.com</code> 直链
            </li>
            <li>如果图片是其他外部 URL → 保持不变</li>
          </ol>
        </div>
      </div>

      <div class="guide-section">
        <div class="guide-title">🎵 插入音乐播放器</div>
        <div class="guide-content">
          <p>在文章中使用音乐标记语法，<code>.mp3</code> 文件需上传到 <code>musicpage</code> 仓库根目录：</p>
          <code>[music:歌曲名.mp3]</code>
          <p>或带自定义标题（显示在播放器上）：</p>
          <code>[music:歌曲名.mp3;title:我的标题]</code>
          <p class="url-rule">📋 URL 替换规则（代码逻辑）：</p>
          <ol>
            <li>匹配 <code>[music:xxx.mp3]</code> 语法，支持文件名含中括号（如 <code>[TFR]瞄准强敌打！.mp3</code>）</li>
            <li>在 <code>musicpage</code> 仓库根目录查找对应的 <code>.mp3</code> 文件</li>
            <li>找到后生成直链：<br>
              <code>https://raw.githubusercontent.com/Plana-EpicTankCommander/musicpage/main/歌曲名.mp3</code>
            </li>
            <li>自动渲染为嵌入式音乐播放器</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

const novelsUrl = `https://github.com/${REPO_CONFIG.novels.owner}/${REPO_CONFIG.novels.repo}`
const imagesUrl = `https://github.com/${REPO_CONFIG.images.owner}/${REPO_CONFIG.images.repo}`
const musicsUrl = `https://github.com/${REPO_CONFIG.musics.owner}/${REPO_CONFIG.musics.repo}`

const novelsStatus = ref('idle')
const imagesStatus = ref('idle')
const musicsStatus = ref('idle')

function statusText(s) {
  if (s === 'idle') return '测试连接'
  if (s === 'testing') return '测试中...'
  if (s === 'ok') return '✓ 可连接'
  if (s === 'fail') return '✗ 连接失败'
  return s
}

async function testRepo(type) {
  const statusRef = type === 'novels' ? novelsStatus : type === 'images' ? imagesStatus : musicsStatus
  statusRef.value = 'testing'

  const config = REPO_CONFIG[type]
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}`

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    statusRef.value = res.ok ? 'ok' : 'fail'
  } catch {
    statusRef.value = 'fail'
  }
}
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 700px;
  min-height: 100vh;
  background-color: rgba(245, 245, 245, 0.85);
  background-image: url('https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/%E6%B0%B4%E7%9D%80%E6%99%AE%E6%8B%89%E5%A8%9C.png');
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 30% auto;
  background-attachment: fixed;
}

h2 {
  margin-bottom: 0.3rem;
}

.subtitle {
  color: #888;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.source-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.source-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f5f5f5;
  padding: 1rem 1.2rem;
  border-radius: 10px;
}

.source-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 2rem;
  text-align: center;
}

.source-info {
  flex: 1;
  min-width: 0;
}

.source-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.source-name {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.3rem;
}

.source-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.2rem;
}

.source-detail > a {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4a90e2;
  text-decoration: none;
}

.source-detail > a:hover {
  text-decoration: underline;
}

.source-detail code {
  background: #e8e8e8;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}

.test-btn {
  padding: 0.2rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.test-btn:hover:not(:disabled) {
  background: #eee;
}

.test-btn:disabled {
  cursor: default;
  opacity: 0.7;
}

.test-btn.ok {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.test-btn.fail {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}

.note {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #888;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #4a90e2;
}

.note code {
  background: #e8e8e8;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}

.usage-guide {
  margin-top: 2rem;
}

.usage-guide h3 {
  margin-bottom: 1rem;
  color: #333;
}

.guide-section {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
}

.guide-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.guide-content {
  font-size: 0.9rem;
  color: #666;
}

.guide-content p {
  margin: 0.4rem 0;
}

.guide-content code {
  background: #e8e8e8;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  word-break: break-all;
}

.guide-content .url-rule {
  font-weight: bold;
  margin-top: 0.6rem;
  color: #444;
}

.guide-content ol {
  margin: 0.3rem 0 0 1.2rem;
  padding-left: 0.5rem;
}

.guide-content li {
  margin: 0.3rem 0;
  color: #666;
  font-size: 0.85em;
  line-height: 1.5;
}
</style>
