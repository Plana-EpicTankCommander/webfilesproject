<template>
  <div class="page">
    <header class="page-head">
      <p class="eyebrow">Connections</p>
      <h1 class="page-title">状态</h1>
      <p class="lede">
        全站内容都来自 GitHub 仓库，页面本身不保存任何数据。
        下面可以逐个测试连通性，或者查看内容标记的写法。
      </p>
    </header>

    <div class="source-grid">
      <article v-for="source in sources" :key="source.key" class="source card">
        <div class="src-head">
          <span class="src-icon"><Icon :name="source.icon" :size="19" /></span>
          <span class="src-name">{{ source.label }}</span>
          <span class="badge" :class="`is-${status[source.key]}`">{{ statusText(status[source.key]) }}</span>
        </div>

        <dl class="src-meta">
          <div class="meta-row">
            <dt>仓库</dt>
            <dd>
              <a :href="source.url" target="_blank" rel="noreferrer">
                <span class="repo-owner">{{ source.owner }}/</span>
                <span class="repo-name">
                  {{ source.repoName }}
                  <Icon name="external" :size="12" />
                </span>
              </a>
            </dd>
          </div>
          <div class="meta-row">
            <dt>目录</dt>
            <dd><code>{{ source.dir || '根目录' }}</code></dd>
          </div>
        </dl>

        <button
          type="button"
          class="btn btn-sm test-btn"
          :disabled="status[source.key] === 'testing'"
          @click="test(source.key)"
        >
          <Icon name="refresh" :size="13" />
          {{ status[source.key] === 'testing' ? '测试中…' : '测试连接' }}
        </button>
      </article>
    </div>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">数据链路</h2>
      </div>
      <ul class="limits">
        <li class="limit-row">
          <span class="limit-k"><Icon name="list" :size="15" /> 目录清单</span>
          <span class="limit-v">
            读取仓库根目录的
            <a :href="manifestUrl" target="_blank" rel="noreferrer">manifest.json</a>（内容变更时由 GitHub Action 生成），不调用 API
          </span>
        </li>
        <li class="limit-row">
          <span class="limit-k"><Icon name="external" :size="15" /> 内容直链</span>
          <span class="limit-v">正文 / 图片 / 音频 / PDF 走 raw.githubusercontent.com，不占 API 额度</span>
        </li>
        <li class="limit-row">
          <span class="limit-k"><Icon name="refresh" :size="15" /> 兜底</span>
          <span class="limit-v">清单取不到时才回退 GitHub API（未登录 60 次/小时，按 IP 计算）</span>
        </li>
        <li class="limit-row">
          <span class="limit-k"><Icon name="clock" :size="15" /> 缓存</span>
          <span class="limit-v">清单与列表各缓存 2 分钟，切换页面不会重复请求</span>
        </li>
      </ul>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">文章内插入语法</h2>
      </div>

      <details class="doc">
        <summary>
          <Icon name="image" :size="16" />
          <span class="doc-title">插入图片</span>
          <Icon name="chevron-down" :size="15" class="doc-caret" />
        </summary>
        <div class="doc-body">
          <p>在 <code>.md</code> 中使用 Markdown 图片语法，图片放在仓库的 <code>images/</code> 目录：</p>
          <pre><code>![](图片文件名.png)
![](图片文件名.png?w=50)</code></pre>
          <p>路径末尾的 <code>?w=</code> 控制宽度百分比（1–150），默认 70%。相对路径会自动到 <code>images/</code> 查找，GitHub blob 链接会自动转成 raw 直链。</p>
          <p>想让读者点一下才看图，用弹窗标记（正文里不直接显示图片）：</p>
          <pre><code>[popup:图片文件名.png;text:点我看图]</code></pre>
          <p><code>text</code> 是按钮文字，省略时用文件名；点开后是灯箱，可缩放、平移，并在文章内所有弹窗图片之间左右切换。</p>
        </div>
      </details>

      <details class="doc">
        <summary>
          <Icon name="music" :size="16" />
          <span class="doc-title">插入音乐</span>
          <Icon name="chevron-down" :size="15" class="doc-caret" />
        </summary>
        <div class="doc-body">
          <p>在文章里写音乐标记，<code>.mp3</code> 放在 <code>sth_ineed</code> 仓库的 <code>musics/</code> 目录：</p>
          <pre><code>[music:歌曲名.mp3]
[music:歌曲名.mp3;title:自定义标题]</code></pre>
          <p>渲染后会得到一个内嵌音轨卡片，点击即交给底部播放器播放，和「声音」页共用同一个播放器。</p>
        </div>
      </details>

      <details class="doc">
        <summary>
          <Icon name="zoom" :size="16" />
          <span class="doc-title">插入可缩放画布</span>
          <Icon name="chevron-down" :size="15" class="doc-caret" />
        </summary>
        <div class="doc-body">
          <p>图片会放进一张固定高度的画布，支持滚轮缩放、拖动平移、双击复位：</p>
          <pre><code>[canvas:图片名.png]
[canvas:图片名.png;h:520;w:80;fit:cover;title:说明文字]</code></pre>
          <table>
            <thead>
              <tr><th>参数</th><th>含义</th><th>默认</th></tr>
            </thead>
            <tbody>
              <tr><td><code>h</code></td><td>画布高度（160–1200 px）</td><td>420</td></tr>
              <tr><td><code>w</code></td><td>画布宽度百分比（20–100）</td><td>100</td></tr>
              <tr><td><code>fit</code></td><td><code>contain</code> 完整显示 / <code>cover</code> 铺满裁切</td><td>contain</td></tr>
              <tr><td><code>title</code></td><td>图片替代文字</td><td>文件名</td></tr>
            </tbody>
          </table>
        </div>
      </details>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Icon from '../components/ui/Icon.vue'
import { REPO_CONFIG, MANIFEST_URL } from '../services/contentSource'

const owner = REPO_CONFIG.novels.owner
const manifestUrl = MANIFEST_URL

const sources = [
  {
    key: 'novels',
    label: '文章',
    icon: 'book',
    owner,
    repoName: REPO_CONFIG.novels.repo,
    dir: REPO_CONFIG.novels.baseDir,
    url: `https://github.com/${owner}/${REPO_CONFIG.novels.repo}`
  },
  {
    key: 'images',
    label: '图片',
    icon: 'image',
    owner,
    repoName: REPO_CONFIG.images.repo,
    dir: REPO_CONFIG.images.baseDir,
    url: `https://github.com/${owner}/${REPO_CONFIG.images.repo}`
  },
  {
    key: 'musics',
    label: '音乐',
    icon: 'music',
    owner,
    repoName: REPO_CONFIG.musics.repo,
    dir: REPO_CONFIG.musics.baseDir,
    url: `https://github.com/${owner}/${REPO_CONFIG.musics.repo}`
  }
]

const status = reactive({ novels: 'idle', images: 'idle', musics: 'idle' })

function statusText(value) {
  if (value === 'testing') return '测试中'
  if (value === 'ok') return '可连接'
  if (value === 'fail') return '连接失败'
  return '未测试'
}

async function test(key) {
  const config = REPO_CONFIG[key]
  if (!config) return
  status[key] = 'testing'
  try {
    const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, {
      headers: { Accept: 'application/vnd.github.v3+json' }
    })
    status[key] = res.ok ? 'ok' : 'fail'
  } catch {
    status[key] = 'fail'
  }
}
</script>

<style scoped>
.source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 16px;
}

.source {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
}

.src-head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.src-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--accent-soft);
  color: var(--accent);
}

.src-name {
  flex: 1;
  font-family: var(--font-serif);
  font-size: 1.02rem;
  font-weight: 700;
}

.badge {
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  background: var(--surface-2);
  color: var(--ink-faint);
}

.badge.is-ok {
  background: var(--accent-soft);
  color: var(--accent-ink);
}

.badge.is-fail {
  background: var(--accent-2-soft);
  color: var(--accent-2);
}

.badge.is-testing {
  background: var(--surface-2);
  color: var(--ink-soft);
}

.src-meta {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 0;
  font-size: 0.8rem;
}

.meta-row {
  display: flex;
  gap: 10px;
  min-width: 0;
}

.meta-row dt {
  flex-shrink: 0;
  width: 34px;
  color: var(--ink-faint);
}

.meta-row dd {
  margin: 0;
  min-width: 0;
  color: var(--ink-soft);
  overflow-wrap: break-word;
  line-height: 1.5;
}

.meta-row a {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  color: var(--accent-ink);
}

.repo-owner {
  color: var(--ink-faint);
}

.repo-name {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
  color: var(--accent-ink);
}

.meta-row a:hover {
  text-decoration: underline;
}

.meta-row code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.9em;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--surface-2);
}

.test-btn {
  align-self: flex-start;
}

.limits {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}

.limit-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
}

.limit-row + .limit-row {
  border-top: 1px solid var(--line);
}

.limit-k {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 120px;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--ink);
}

.limit-v {
  font-size: 0.82rem;
  color: var(--ink-soft);
  flex: 1;
  min-width: 0;
}

.limit-v a {
  color: var(--accent-ink);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: color-mix(in srgb, var(--accent) 35%, transparent);
}

.limit-v a:hover {
  text-decoration-color: var(--accent);
}

.doc {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  margin-bottom: 10px;
  overflow: hidden;
}

.doc + .doc {
  margin-top: 10px;
}

.doc summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 18px;
  cursor: pointer;
  list-style: none;
  font-size: 0.9rem;
  color: var(--ink);
  transition: background var(--fast);
}

.doc summary::-webkit-details-marker {
  display: none;
}

.doc summary:hover {
  background: var(--surface-2);
}

.doc-title {
  flex: 1;
  font-weight: 600;
}

.doc-caret {
  color: var(--ink-faint);
  transition: transform var(--fast);
}

.doc[open] .doc-caret {
  transform: rotate(180deg);
}

.doc-body {
  padding: 0 18px 18px;
  font-size: 0.86rem;
  line-height: 1.8;
  color: var(--ink-soft);
}

.doc-body p {
  margin: 8px 0;
}

.doc-body code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.9em;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--accent-ink);
}

.doc-body pre {
  margin: 10px 0;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--line);
  overflow-x: auto;
  font-size: 0.82rem;
  line-height: 1.7;
}

.doc-body pre code {
  padding: 0;
  background: none;
  color: var(--ink);
}

.doc-body table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 0.8rem;
}

.doc-body th,
.doc-body td {
  border: 1px solid var(--line);
  padding: 7px 10px;
  text-align: left;
}

.doc-body th {
  background: var(--surface-2);
  font-weight: 600;
  color: var(--ink);
}

@media (max-width: 640px) {
  .limit-k {
    width: auto;
  }
}
</style>
