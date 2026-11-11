<template>
  <div class="inline-track" :class="{ 'is-active': isActive, 'is-playing': isPlaying }" @click="toggle">
    <button type="button" class="it-btn" :aria-label="isPlaying ? '暂停' : '播放'">
      <Icon :name="isPlaying ? 'pause' : 'play'" :size="15" :stroke-width="isPlaying ? 2.4 : 1.6" :fill="!isPlaying" />
    </button>
    <div class="it-meta">
      <div class="it-title">{{ title }}</div>
      <div class="it-sub">{{ isPlaying ? '正在播放' : isActive ? '已暂停' : '文章内嵌音轨' }}</div>
    </div>
    <span v-if="isPlaying" class="it-eq" aria-hidden="true"><i /><i /><i /></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
import { usePlayerStore } from '../../stores/player'

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, default: '未命名曲目' }
})

const player = usePlayerStore()
const isActive = computed(() => player.current?.src === props.src)
const isPlaying = computed(() => isActive.value && player.playing)

function toggle() {
  if (isActive.value) {
    player.toggle()
  } else {
    player.play({ src: props.src, title: props.title })
  }
}
</script>

<style scoped>
.inline-track {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 12px 16px 12px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: border-color var(--fast), box-shadow var(--fast), transform var(--fast);
}

.inline-track:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.inline-track.is-active {
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  background: var(--accent-soft);
}

.it-btn {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: var(--accent);
  box-shadow: 0 4px 12px rgba(107, 74, 174, 0.3);
  transition: transform var(--fast), background var(--fast);
}

.inline-track:hover .it-btn {
  transform: scale(1.05);
}

[data-theme='dark'] .it-btn {
  color: #17121f;
}

.it-meta {
  min-width: 0;
  flex: 1;
}

.it-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.it-sub {
  margin-top: 2px;
  font-size: 0.72rem;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
}

.is-active .it-sub {
  color: var(--accent);
}

.it-eq {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 15px;
  margin-right: 4px;
}

.it-eq i {
  width: 2.5px;
  border-radius: 2px;
  background: var(--accent);
  animation: eq 1.05s var(--ease) infinite;
}

.it-eq i:nth-child(1) { height: 45%; animation-delay: -0.2s; }
.it-eq i:nth-child(2) { height: 100%; animation-delay: -0.55s; }
.it-eq i:nth-child(3) { height: 70%; animation-delay: -0.1s; }

@keyframes eq {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}
</style>
