<template>
  <div class="page">
    <header class="page-head">
      <p class="eyebrow">Sound</p>
      <h1 class="page-title">耳畔</h1>
      <p class="lede">
        {{ items.length || '—' }} 首曲子，来自 <code class="inline-code">musicpage</code> 仓库。
        点击任意一首开始，播放器会固定在页面底部。
      </p>
    </header>

    <div class="sound-bar">
      <button type="button" class="btn btn-primary" :disabled="!items.length" @click="playAll">
        <Icon name="play" :size="15" fill />
        全部播放
      </button>
      <button type="button" class="btn" :disabled="!items.length" @click="shuffleAll">
        <Icon name="shuffle" :size="15" />
        随机播放
      </button>
      <span class="volume-hint">
        <Icon name="volume" :size="14" />
        默认音量 10%，可在播放器上调节
      </span>
    </div>

    <div v-if="loading" class="track-card card">
      <div v-for="n in 4" :key="n" class="skeleton track-skeleton" />
    </div>

    <div v-else-if="error" class="notice notice-error">
      <Icon name="alert" :size="18" />
      <span class="err-text">{{ error }}</span>
      <button type="button" class="btn btn-sm" @click="load">
        <Icon name="refresh" :size="14" />
        重试
      </button>
    </div>

    <ol v-else-if="items.length" class="track-card card">
      <li v-for="(track, i) in items" :key="track.src">
        <button
          type="button"
          class="track"
          :class="{ 'is-active': player.current?.src === track.src }"
          @click="play(track, i)"
        >
          <span class="t-index">
            <span v-if="player.current?.src === track.src" class="t-eq" :class="{ 'is-paused': !player.playing }">
              <i /><i /><i />
            </span>
            <span v-else>{{ String(i + 1).padStart(2, '0') }}</span>
          </span>

          <span class="t-main">
            <span class="t-title">{{ track.title }}</span>
            <span v-if="track.tag" class="t-tag">{{ track.tag }}</span>
          </span>

          <span class="t-action">
            <Icon
              :name="player.current?.src === track.src && player.playing ? 'pause' : 'play'"
              :size="14"
              :stroke-width="player.current?.src === track.src && player.playing ? 2.4 : 1.5"
              :fill="!(player.current?.src === track.src && player.playing)"
            />
          </span>
        </button>
      </li>
    </ol>

    <div v-else class="empty-state">
      <span class="es-icon"><Icon name="music" :size="24" /></span>
      <p class="es-title">还没有曲子</p>
      <p class="es-text">把 .mp3 上传到 musicpage 仓库根目录即可。</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Icon from '../components/ui/Icon.vue'
import { usePlayerStore } from '../stores/player'
import { listFiles, itemMusicUrl } from '../services/contentSource'

const player = usePlayerStore()

const items = ref([])
const loading = ref(true)
const error = ref('')

onMounted(load)

function parseTitle(name) {
  const base = name.replace(/\.mp3$/i, '')
  const match = base.match(/^\[([^\]]+)\]\s*(.+)$/) || base.match(/^【([^】]+)】\s*(.+)$/)
  if (match) return { tag: match[1], title: match[2] }
  return { tag: '', title: base }
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await listFiles('musics')
    items.value = data.map((item) => {
      const parsed = parseTitle(item.name)
      return {
        ...parsed,
        name: item.name,
        src: itemMusicUrl(item)
      }
    })
  } catch (e) {
    error.value = `曲目列表加载失败：${e.message}`
  } finally {
    loading.value = false
  }
}

function play(track, index) {
  if (player.current?.src === track.src) {
    player.toggle()
    return
  }
  player.playQueue(items.value, index)
}

function playAll() {
  if (!items.value.length) return
  if (player.loop === 'shuffle') player.cycleLoop()
  player.playQueue(items.value, 0)
}

function shuffleAll() {
  if (!items.value.length) return
  if (player.loop !== 'shuffle') player.cycleLoop()
  player.playQueue(items.value, Math.floor(Math.random() * items.value.length))
}
</script>

<style scoped>
.page {
  max-width: 920px;
}

.inline-code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.88em;
  padding: 0.1em 0.4em;
  border-radius: 5px;
  background: var(--surface-2);
  color: var(--accent-ink);
}

.sound-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.volume-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 0.72rem;
  color: var(--ink-faint);
}

.track-card {
  overflow: hidden;
  padding: 6px;
}

.track-skeleton {
  height: 54px;
  margin: 6px;
}

.track {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 13px 16px;
  border-radius: 11px;
  text-align: left;
  transition: background var(--fast);
}

.track:hover {
  background: var(--surface-2);
}

.track.is-active {
  background: var(--accent-soft);
}

.t-index {
  width: 26px;
  flex-shrink: 0;
  font-size: 0.74rem;
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.track.is-active .t-index {
  color: var(--accent);
}

.t-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.t-title {
  font-size: 0.92rem;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track.is-active .t-title {
  font-weight: 600;
  color: var(--accent-ink);
}

.t-tag {
  flex-shrink: 0;
  padding: 1px 7px;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  color: var(--ink-faint);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
}

.track.is-active .t-tag {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}

.t-action {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast), border-color var(--fast);
}

.track:hover .t-action {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.track.is-active .t-action {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.t-eq {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 13px;
}

.t-eq i {
  width: 2.5px;
  border-radius: 2px;
  background: var(--accent);
  animation: eq 1.05s var(--ease) infinite;
}

.t-eq i:nth-child(1) { height: 45%; animation-delay: -0.2s; }
.t-eq i:nth-child(2) { height: 100%; animation-delay: -0.55s; }
.t-eq i:nth-child(3) { height: 70%; animation-delay: -0.1s; }

.t-eq.is-paused i {
  animation-play-state: paused;
  opacity: 0.5;
}

@keyframes eq {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}

.err-text {
  flex: 1;
}

.empty-state {
  padding: 64px 24px;
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

@media (max-width: 640px) {
  .volume-hint {
    margin-left: 0;
    width: 100%;
  }
  .track {
    gap: 10px;
    padding: 12px 10px;
  }
}
</style>
