<template>
  <transition name="lb">
    <div v-if="index >= 0 && items.length" class="lb" role="dialog" aria-modal="true" aria-label="图片预览">
      <header class="lb-head">
        <span class="lb-count">{{ index + 1 }} / {{ items.length }}</span>
        <span class="lb-name">{{ current?.displayName }}</span>
        <div class="lb-actions">
          <a class="lb-btn" :href="current?.url" target="_blank" rel="noreferrer" aria-label="新窗口查看原图">
            <Icon name="external" :size="17" />
          </a>
          <button type="button" class="lb-btn" aria-label="关闭" @click="close">
            <Icon name="close" :size="18" />
          </button>
        </div>
      </header>

      <div class="lb-stage">
        <button type="button" class="lb-nav is-prev" aria-label="上一张" :disabled="items.length < 2" @click="step(-1)">
          <Icon name="chevron-left" :size="22" />
        </button>

        <div class="lb-canvas">
          <ImageCanvas
            v-if="current"
            :key="current.url"
            :src="current.url"
            :alt="current.displayName"
            height="calc(100vh - 176px)"
          />
        </div>

        <button type="button" class="lb-nav is-next" aria-label="下一张" :disabled="items.length < 2" @click="step(1)">
          <Icon name="chevron-right" :size="22" />
        </button>
      </div>

      <footer class="lb-foot">
        <div class="lb-thumbs">
          <button
            v-for="(item, i) in items"
            :key="item.url"
            type="button"
            class="lb-thumb"
            :class="{ 'is-active': i === index }"
            :aria-label="item.displayName"
            @click="$emit('update:index', i)"
          >
            <img :src="item.url" alt="" loading="lazy" decoding="async" />
          </button>
        </div>
        <p class="lb-tip">滚轮缩放 · 拖动平移 · ← → 切换</p>
      </footer>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import Icon from '../ui/Icon.vue'
import ImageCanvas from '../ImageCanvas/ImageCanvas.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  index: { type: Number, default: -1 }
})

const emit = defineEmits(['update:index', 'close'])

const current = computed(() => (props.index >= 0 ? props.items[props.index] : null))

function close() {
  emit('close')
}

function step(delta) {
  const total = props.items.length
  if (!total) return
  emit('update:index', (props.index + delta + total) % total)
}

function onKeydown(event) {
  if (props.index < 0) return
  const inCanvas = event.target instanceof Element && event.target.closest('.canvas-viewport')
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (!inCanvas && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    event.preventDefault()
    step(event.key === 'ArrowLeft' ? -1 : 1)
  }
}

let previousOverflow = ''

watch(
  () => props.index,
  (value) => {
    if (typeof document === 'undefined') return
    if (value >= 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow
    }
  }
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = previousOverflow
})
</script>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  flex-direction: column;
  background: rgba(16, 12, 24, 0.94);
  backdrop-filter: blur(8px);
  color: #f2eefb;
}

.lb-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  flex-shrink: 0;
}

.lb-count {
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  color: rgba(242, 238, 251, 0.62);
  font-variant-numeric: tabular-nums;
}

.lb-name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-serif);
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lb-actions {
  display: flex;
  gap: 6px;
}

.lb-btn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: rgba(242, 238, 251, 0.8);
  background: rgba(255, 255, 255, 0.08);
  transition: background var(--fast), color var(--fast);
}

.lb-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.lb-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
}

.lb-canvas {
  flex: 1;
  min-width: 0;
  height: 100%;
}

.lb-canvas :deep(.image-canvas) {
  height: 100%;
  background: transparent;
  border-radius: var(--radius);
}

.lb-canvas :deep(.canvas-viewport) {
  background:
    radial-gradient(circle at 50% 0%, rgba(169, 139, 245, 0.1), transparent 62%),
    rgba(10, 8, 14, 0.5);
}

.lb-nav {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: rgba(242, 238, 251, 0.85);
  background: rgba(255, 255, 255, 0.07);
  transition: background var(--fast), transform var(--fast);
}

.lb-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.18);
  transform: scale(1.04);
}

.lb-nav:disabled {
  opacity: 0.25;
  cursor: default;
}

.lb-foot {
  flex-shrink: 0;
  padding: 10px 20px 14px;
}

.lb-thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
}

.lb-thumb {
  flex-shrink: 0;
  width: 62px;
  height: 44px;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.06);
  opacity: 0.55;
  transition: opacity var(--fast), border-color var(--fast);
}

.lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lb-thumb:hover {
  opacity: 0.85;
}

.lb-thumb.is-active {
  opacity: 1;
  border-color: var(--accent);
}

.lb-tip {
  margin-top: 6px;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: rgba(242, 238, 251, 0.42);
  text-align: center;
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.2s var(--ease);
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .lb-head {
    padding: 10px 14px;
  }
  .lb-stage {
    padding: 0 6px;
    gap: 4px;
  }
  .lb-nav {
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.05);
  }
  .lb-tip {
    display: none;
  }
}
</style>
