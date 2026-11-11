<template>
  <transition name="pb">
    <div v-if="player.hasTrack" class="player" role="region" aria-label="音乐播放器">
      <div class="pb-left">
        <span class="pb-cover" :class="{ 'is-playing': player.playing }">
          <Icon name="music" :size="17" />
        </span>
        <div class="pb-meta">
          <div class="pb-title">{{ title }}</div>
          <div class="pb-sub">{{ player.index + 1 }} / {{ player.queue.length }} · 古明地灵殿</div>
        </div>
      </div>

      <div class="pb-center">
        <div class="pb-controls">
          <button type="button" class="pb-btn" aria-label="上一首" @click="player.prev()">
            <Icon name="prev" :size="15" />
          </button>
          <button
            type="button"
            class="pb-play"
            :aria-label="player.playing ? '暂停' : '播放'"
            @click="player.toggle()"
          >
            <Icon
              :name="player.playing ? 'pause' : 'play'"
              :size="17"
              :stroke-width="player.playing ? 2.4 : 1.6"
              :fill="!player.playing"
            />
          </button>
          <button type="button" class="pb-btn" aria-label="下一首" @click="player.next()">
            <Icon name="next" :size="15" />
          </button>
        </div>

        <div class="pb-timeline">
          <span class="pb-time">{{ fmt(player.currentTime) }}</span>
          <input
            class="pb-slider"
            type="range"
            min="0"
            max="1000"
            step="1"
            :value="Math.round(player.progress * 10)"
            :style="{ '--fill': player.progress + '%' }"
            aria-label="播放进度"
            @input="onSeek"
          />
          <span class="pb-time">{{ fmt(player.duration) }}</span>
        </div>
      </div>

      <div class="pb-right">
        <button
          type="button"
          class="pb-btn"
          :class="{ 'is-on': player.loop !== 'list' }"
          :aria-label="loopLabel"
          :title="loopLabel"
          @click="player.cycleLoop()"
        >
          <Icon :name="player.loop === 'one' ? 'repeat-one' : player.loop === 'shuffle' ? 'shuffle' : 'repeat'" :size="16" />
        </button>
        <button type="button" class="pb-btn" :aria-label="player.volume > 0 ? '静音' : '取消静音'" @click="player.toggleMute()">
          <Icon :name="player.volume > 0 ? 'volume' : 'volume-off'" :size="16" />
        </button>
        <input
          class="pb-slider pb-volume"
          type="range"
          min="0"
          max="100"
          step="1"
          :value="Math.round(player.volume * 100)"
          :style="{ '--fill': player.volume * 100 + '%' }"
          aria-label="音量"
          @input="onVolume"
        />
        <button type="button" class="pb-btn" aria-label="关闭播放器" @click="player.stop()">
          <Icon name="close" :size="15" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
import { usePlayerStore } from '../../stores/player'

const player = usePlayerStore()

const title = computed(() => player.current?.title || '未命名曲目')

const loopLabel = computed(() => {
  if (player.loop === 'one') return '单曲循环'
  if (player.loop === 'shuffle') return '随机播放'
  return '列表循环'
})

function fmt(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function onSeek(event) {
  player.seekPercent(Number(event.target.value) / 10)
}

function onVolume(event) {
  player.setVolume(Number(event.target.value) / 100)
}
</script>

<style scoped>
.player {
  position: fixed;
  left: var(--sidebar-w);
  right: 0;
  bottom: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(280px, 1.6fr) minmax(150px, 1fr);
  align-items: center;
  gap: 18px;
  height: var(--player-h);
  padding: 0 20px;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  border-top: 1px solid var(--line);
  backdrop-filter: blur(16px);
  box-shadow: 0 -8px 30px rgba(38, 33, 48, 0.07);
}

.pb-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.pb-cover {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(145deg, #7b56c4, #4d3488);
  box-shadow: 0 4px 12px rgba(85, 58, 148, 0.28);
}

.pb-cover.is-playing {
  animation: breathe 3.2s var(--ease) infinite;
}

@keyframes breathe {
  0%, 100% { box-shadow: 0 4px 12px rgba(85, 58, 148, 0.28); }
  50% { box-shadow: 0 6px 22px rgba(123, 86, 196, 0.55); }
}

.pb-meta {
  min-width: 0;
}

.pb-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pb-sub {
  font-size: 0.7rem;
  color: var(--ink-faint);
  margin-top: 1px;
  font-variant-numeric: tabular-nums;
}

.pb-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.pb-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pb-btn {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast);
}

.pb-btn:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.pb-btn.is-on {
  color: var(--accent);
}

.pb-play {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: var(--accent);
  box-shadow: 0 4px 12px rgba(107, 74, 174, 0.35);
  transition: transform var(--fast), background var(--fast);
}

.pb-play:hover {
  background: var(--accent-strong);
  transform: scale(1.05);
}

[data-theme='dark'] .pb-play {
  color: #17121f;
}

.pb-timeline {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 9px;
}

.pb-time {
  font-size: 0.68rem;
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
  min-width: 34px;
  text-align: center;
}

.pb-slider {
  --fill: 0%;
  flex: 1;
  min-width: 0;
  height: 4px;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent) 0 var(--fill), var(--line-strong) var(--fill) 100%);
  cursor: pointer;
}

.pb-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform var(--fast);
}

.pb-slider:hover::-webkit-slider-thumb {
  transform: scale(1.15);
}

.pb-slider::-moz-range-thumb {
  width: 11px;
  height: 11px;
  border: 0;
  border-radius: 50%;
  background: var(--accent);
}

.pb-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.pb-volume {
  flex: 0 1 88px;
}

.pb-enter-active,
.pb-leave-active {
  transition: transform 0.24s var(--ease), opacity 0.24s var(--ease);
}

.pb-enter-from,
.pb-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .player {
    left: 0;
    bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom, 0px));
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
    padding: 0 14px;
    height: 66px;
  }
  .pb-right {
    display: none;
  }
  .pb-center {
    flex-direction: row;
    gap: 10px;
  }
  .pb-timeline {
    display: none;
  }
  .pb-cover {
    width: 38px;
    height: 38px;
  }
  .pb-sub {
    display: none;
  }
}
</style>
