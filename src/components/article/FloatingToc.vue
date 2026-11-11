<template>
  <div
    ref="root"
    class="toc-widget"
    :class="{ 'is-collapsed': collapsed, 'is-dragging': dragging, 'is-ready': ready }"
    :style="{ left: pos.x + 'px', top: pos.y + 'px' }"
    role="navigation"
    aria-label="文章目录"
  >
    <div
      class="tw-head"
      role="button"
      tabindex="0"
      :aria-expanded="!collapsed"
      :title="collapsed ? '点击展开目录，按住拖动' : '点击收起目录，按住拖动'"
      @pointerdown="onDown"
      @click="onHeadClick"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <Icon name="list" :size="15" />
      <span class="tw-label">目录</span>
      <span class="tw-count">{{ items.length }}</span>
      <Icon name="chevron-down" :size="14" class="tw-caret" />
    </div>

    <div v-show="!collapsed" class="tw-body">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="tw-item"
        :class="{ 'is-active': item.id === activeId }"
        :style="{ paddingLeft: 10 + (Math.min(item.level, 4) - 1) * 10 + 'px' }"
        :title="item.text"
        @click="$emit('navigate', item.id)"
      >
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import Icon from '../ui/Icon.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  activeId: { type: String, default: '' }
})

defineEmits(['navigate'])

const STORE_KEY = 'chireiden:toc-widget'
const EDGE = 10

const root = ref(null)
const collapsed = ref(false)
const dragging = ref(false)
const ready = ref(false)
const pos = reactive({ x: 24, y: 96 })

let drag = null
let moved = false

function readState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null')
    return raw && typeof raw === 'object' ? raw : null
  } catch {
    return null
  }
}

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ ...pos, collapsed: collapsed.value }))
  } catch {
    /* ignore */
  }
}

function size() {
  const el = root.value
  if (!el) return { width: 0, height: 0 }
  const rect = el.getBoundingClientRect()
  return { width: rect.width, height: rect.height }
}

function clampToViewport(x, y) {
  const { width, height } = size()
  const narrow = window.innerWidth < 768
  // 手机上给底部 Tab 栏留出位置，避免浮层压在导航上
  const bottomInset = narrow ? 72 : EDGE
  const maxX = Math.max(EDGE, window.innerWidth - width - EDGE)
  const maxY = Math.max(EDGE, window.innerHeight - height - bottomInset)
  return {
    x: Math.min(Math.max(EDGE, x), maxX),
    y: Math.min(Math.max(EDGE, y), maxY)
  }
}

function setPos(x, y) {
  const next = clampToViewport(x, y)
  pos.x = Math.round(next.x)
  pos.y = Math.round(next.y)
}

function placeDefault() {
  const { width, height } = size()
  const narrow = window.innerWidth < 768
  const x = window.innerWidth - width - (narrow ? 14 : 28)
  // 手机端默认放在右下角、底部 Tab 栏上方；桌面放在右侧栏位附近
  const y = narrow
    ? Math.max(120, window.innerHeight - height - 78)
    : Math.max(84, window.innerHeight * 0.26)
  setPos(x, y)
}

function toggle() {
  collapsed.value = !collapsed.value
  nextTick(() => {
    setPos(pos.x, pos.y)
    saveState()
  })
}

function onHeadClick() {
  if (moved) {
    moved = false
    return
  }
  toggle()
}

function onDown(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  const el = event.currentTarget
  try {
    el.setPointerCapture(event.pointerId)
  } catch {
    /* ignore */
  }
  drag = { startX: event.clientX, startY: event.clientY, x: pos.x, y: pos.y }
  moved = false
  dragging.value = true
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(event) {
  if (!drag) return
  const dx = event.clientX - drag.startX
  const dy = event.clientY - drag.startY
  if (!moved && Math.hypot(dx, dy) < 4) return
  moved = true
  setPos(drag.x + dx, drag.y + dy)
}

function onUp() {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
  if (drag && moved) saveState()
  drag = null
  dragging.value = false
}

function onResize() {
  setPos(pos.x, pos.y)
}

onMounted(() => {
  const saved = readState()
  collapsed.value = saved ? Boolean(saved.collapsed) : window.innerWidth < 768
  nextTick(() => {
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      setPos(saved.x, saved.y)
    } else {
      placeDefault()
    }
    ready.value = true
  })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  onUp()
})
</script>

<style scoped>
.toc-widget {
  position: fixed;
  z-index: 45;
  width: 218px;
  max-width: calc(100vw - 20px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(38, 33, 48, 0.16), 0 2px 6px rgba(38, 33, 48, 0.08);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.18s var(--ease), box-shadow 0.18s var(--ease);
}

.toc-widget.is-ready {
  opacity: 1;
}

.toc-widget.is-collapsed {
  width: auto;
  border-radius: 999px;
}

.toc-widget.is-dragging {
  box-shadow: 0 18px 44px rgba(38, 33, 48, 0.26);
  transition: none;
}

.tw-head {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 10px 9px 12px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line);
  cursor: grab;
  user-select: none;
  touch-action: none;
}

.is-collapsed .tw-head {
  border-bottom: 0;
  border-radius: 999px;
  padding-right: 12px;
}

.is-dragging .tw-head {
  cursor: grabbing;
}

.tw-head:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.tw-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--ink);
}

.tw-count {
  min-width: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-size: 0.66rem;
  line-height: 16px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.tw-caret {
  margin-left: auto;
  color: var(--ink-faint);
  transition: transform var(--fast) var(--ease);
}

.is-collapsed .tw-caret {
  transform: rotate(-90deg);
}

.tw-body {
  max-height: min(52vh, 420px);
  overflow-y: auto;
  padding: 6px;
  background: var(--surface);
}

.tw-item {
  display: block;
  width: 100%;
  padding: 6px 8px;
  border-radius: 7px;
  text-align: left;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--ink-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background var(--fast), color var(--fast);
}

.tw-item:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.tw-item.is-active {
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-weight: 600;
}

@media (max-width: 768px) {
  .toc-widget {
    width: 200px;
  }
}
</style>
