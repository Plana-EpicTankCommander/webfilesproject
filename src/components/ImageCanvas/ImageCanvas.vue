<template>
  <div class="image-canvas" :style="{ height: canvasHeight }">
    <div
      ref="viewport"
      class="canvas-viewport"
      :class="{ 'is-zoomed': !isAtFit, 'is-dragging': dragging }"
      :style="{ touchAction: isAtFit ? 'pan-y' : 'none' }"
      role="application"
      tabindex="0"
      :aria-label="`图片画布：${alt || '图片'}，支持缩放和平移`"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @dblclick="onDoubleClick"
      @keydown="onKeyDown"
    >
      <div v-if="!loaded && !error" class="canvas-status">加载中…</div>
      <div v-else-if="error" class="canvas-status is-error">图片加载失败</div>

      <div class="canvas-stage" :style="stageStyle">
        <img
          ref="imgRef"
          :src="src"
          :alt="alt"
          draggable="false"
          @load="onImageLoad"
          @error="onImageError"
        >
      </div>

      <div
        v-if="showToolbar && loaded"
        class="canvas-toolbar"
        @pointerdown.stop
        @dblclick.stop
        @wheel.stop
      >
        <button
          type="button"
          class="canvas-btn"
          :disabled="isAtFit"
          aria-label="缩小"
          title="缩小"
          @click="zoomOut"
        >−</button>
        <span class="canvas-zoom">{{ zoomPercent }}%</span>
        <button
          type="button"
          class="canvas-btn"
          :disabled="isAtMaxZoom"
          aria-label="放大"
          title="放大"
          @click="zoomIn"
        >+</button>
        <button
          type="button"
          class="canvas-btn canvas-btn-fit"
          aria-label="恢复适应画布"
          title="恢复适应画布"
          @click="resetView"
        >适合</button>
      </div>

      <div v-if="showHint && loaded && !interacted" class="canvas-hint">
        滚轮缩放 · 拖动平移 · 双击复位
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  MAX_ZOOM_FACTOR,
  clampScale,
  clampTranslation,
  computeFitScale,
  zoomAt
} from '../../utils/imageCanvas'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  // 画布高度：数字按 px 处理，也可以传 calc(...) / vh 这类字符串
  height: { type: [String, Number], default: '420px' },
  // contain: 完整显示；cover: 铺满画布（裁切）
  fitMode: { type: String, default: 'contain' },
  showToolbar: { type: Boolean, default: true },
  showHint: { type: Boolean, default: true },
  maxZoom: { type: Number, default: MAX_ZOOM_FACTOR }
})

const viewport = ref(null)
const imgRef = ref(null)

const viewWidth = ref(0)
const viewHeight = ref(0)
const naturalWidth = ref(0)
const naturalHeight = ref(0)

const scale = ref(1)
const tx = ref(0)
const ty = ref(0)

const loaded = ref(false)
const error = ref(false)
const dragging = ref(false)
const interacted = ref(false)

const canvasHeight = computed(() => (
  typeof props.height === 'number' ? `${props.height}px` : props.height
))

const fitScale = computed(() => computeFitScale(
  naturalWidth.value,
  naturalHeight.value,
  viewWidth.value,
  viewHeight.value,
  props.fitMode
))

const zoomPercent = computed(() => (
  fitScale.value > 0 ? Math.round((scale.value / fitScale.value) * 100) : 100
))

const isAtFit = computed(() => (
  fitScale.value > 0 && Math.abs(scale.value - fitScale.value) <= fitScale.value * 0.002
))

const isAtMaxZoom = computed(() => (
  fitScale.value > 0 && scale.value >= fitScale.value * (props.maxZoom > 1 ? props.maxZoom : 1) - 0.0001
))

const stageStyle = computed(() => {
  if (!naturalWidth.value || !naturalHeight.value) return { display: 'none' }
  return {
    width: `${naturalWidth.value}px`,
    height: `${naturalHeight.value}px`,
    marginLeft: `${-naturalWidth.value / 2}px`,
    marginTop: `${-naturalHeight.value / 2}px`,
    transform: `translate(${tx.value}px, ${ty.value}px) scale(${scale.value})`
  }
})

// ---------- 基础测量与约束 ----------

function measure() {
  const el = viewport.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  viewWidth.value = rect.width
  viewHeight.value = rect.height
}

function clampPosition() {
  const next = clampTranslation(
    tx.value,
    ty.value,
    scale.value,
    naturalWidth.value,
    naturalHeight.value,
    viewWidth.value,
    viewHeight.value
  )
  tx.value = next.tx
  ty.value = next.ty
}

function fitView(markInteracted = true) {
  scale.value = fitScale.value || 1
  tx.value = 0
  ty.value = 0
  if (markInteracted) interacted.value = true
}

function setZoom(target, anchorX = 0, anchorY = 0) {
  if (!loaded.value || !fitScale.value) return
  const next = clampScale(target, fitScale.value, props.maxZoom)
  const nextPosition = zoomAt(tx.value, ty.value, scale.value, next, anchorX, anchorY)
  scale.value = next
  tx.value = nextPosition.tx
  ty.value = nextPosition.ty
  clampPosition()
  interacted.value = true
}

function resetView() {
  measure()
  fitView()
}

function zoomIn() {
  setZoom(scale.value * 1.25)
}

function zoomOut() {
  setZoom(scale.value / 1.25)
}

// ---------- 指针交互（拖动 / 双指缩放） ----------

const pointers = new Map()
let dragStart = null
let pinchStart = null

function anchorFromClient(clientX, clientY) {
  const rect = viewport.value.getBoundingClientRect()
  return {
    x: clientX - rect.left - rect.width / 2,
    y: clientY - rect.top - rect.height / 2
  }
}

function onPointerDown(event) {
  if (!loaded.value) return
  if (event.pointerType === 'mouse' && event.button !== 0) return

  interacted.value = true
  viewport.value.focus({ preventScroll: true })
  try {
    viewport.value.setPointerCapture(event.pointerId)
  } catch {
    // 某些浏览器 / 已释放的指针会抛错，忽略即可
  }

  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

  if (pointers.size === 1) {
    dragStart = {
      x: event.clientX,
      y: event.clientY,
      tx: tx.value,
      ty: ty.value
    }
    pinchStart = null
    dragging.value = !isAtFit.value
  } else if (pointers.size === 2) {
    const [a, b] = [...pointers.values()]
    dragStart = null
    dragging.value = false
    pinchStart = {
      distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      scale: scale.value,
      tx: tx.value,
      ty: ty.value,
      midX: (a.x + b.x) / 2,
      midY: (a.y + b.y) / 2
    }
  }
}

function onPointerMove(event) {
  if (!pointers.has(event.pointerId)) return
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

  if (pointers.size === 2 && pinchStart) {
    const [a, b] = [...pointers.values()]
    const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1
    const midX = (a.x + b.x) / 2
    const midY = (a.y + b.y) / 2
    const anchor = anchorFromClient(pinchStart.midX, pinchStart.midY)

    const target = clampScale(
      pinchStart.scale * (distance / pinchStart.distance),
      fitScale.value,
      props.maxZoom
    )
    const ratio = target / (pinchStart.scale || 1)
    const nextTx = anchor.x - (anchor.x - pinchStart.tx) * ratio + (midX - pinchStart.midX)
    const nextTy = anchor.y - (anchor.y - pinchStart.ty) * ratio + (midY - pinchStart.midY)
    const clamped = clampTranslation(
      nextTx,
      nextTy,
      target,
      naturalWidth.value,
      naturalHeight.value,
      viewWidth.value,
      viewHeight.value
    )

    scale.value = target
    tx.value = clamped.tx
    ty.value = clamped.ty
    interacted.value = true
    return
  }

  if (pointers.size === 1 && dragging.value && dragStart) {
    const clamped = clampTranslation(
      dragStart.tx + (event.clientX - dragStart.x),
      dragStart.ty + (event.clientY - dragStart.y),
      scale.value,
      naturalWidth.value,
      naturalHeight.value,
      viewWidth.value,
      viewHeight.value
    )
    tx.value = clamped.tx
    ty.value = clamped.ty
  }
}

function onPointerUp(event) {
  pointers.delete(event.pointerId)

  if (viewport.value?.hasPointerCapture?.(event.pointerId)) {
    try {
      viewport.value.releasePointerCapture(event.pointerId)
    } catch {
      // 指针可能已经被浏览器释放
    }
  }

  if (pointers.size === 0) {
    pointers.clear()
    dragStart = null
    pinchStart = null
    dragging.value = false
    return
  }

  if (pointers.size === 1) {
    const [remaining] = [...pointers.values()]
    pinchStart = null
    dragStart = {
      x: remaining.x,
      y: remaining.y,
      tx: tx.value,
      ty: ty.value
    }
    dragging.value = !isAtFit.value
  }
}

// ---------- 滚轮 / 双击 / 键盘 ----------

function onWheel(event) {
  if (!loaded.value) return
  event.preventDefault()

  let delta = event.deltaY
  if (event.deltaMode === 1) delta *= 16
  else if (event.deltaMode === 2) delta *= viewHeight.value

  const anchor = anchorFromClient(event.clientX, event.clientY)
  const factor = Math.exp(-delta * 0.0015)
  setZoom(scale.value * factor, anchor.x, anchor.y)
}

function onDoubleClick(event) {
  if (!loaded.value) return
  interacted.value = true
  if (isAtFit.value) {
    const anchor = anchorFromClient(event.clientX, event.clientY)
    setZoom(fitScale.value * 2.5, anchor.x, anchor.y)
  } else {
    fitView()
  }
}

function nudge(dx, dy) {
  const clamped = clampTranslation(
    tx.value + dx,
    ty.value + dy,
    scale.value,
    naturalWidth.value,
    naturalHeight.value,
    viewWidth.value,
    viewHeight.value
  )
  tx.value = clamped.tx
  ty.value = clamped.ty
}

function onKeyDown(event) {
  if (!loaded.value) return
  const step = 48
  switch (event.key) {
    case '+':
    case '=':
      event.preventDefault()
      zoomIn()
      break
    case '-':
    case '_':
      event.preventDefault()
      zoomOut()
      break
    case '0':
    case 'Home':
      event.preventDefault()
      resetView()
      break
    case 'ArrowLeft':
      event.preventDefault()
      nudge(step, 0)
      break
    case 'ArrowRight':
      event.preventDefault()
      nudge(-step, 0)
      break
    case 'ArrowUp':
      event.preventDefault()
      nudge(0, step)
      break
    case 'ArrowDown':
      event.preventDefault()
      nudge(0, -step)
      break
    default:
      break
  }
}

// ---------- 图片加载 / 尺寸变化 ----------

async function onImageLoad() {
  const img = imgRef.value
  if (!img) return
  naturalWidth.value = img.naturalWidth
  naturalHeight.value = img.naturalHeight
  loaded.value = true
  error.value = false
  await nextTick()
  measure()
  fitView(false)
}

function onImageError() {
  loaded.value = false
  error.value = true
}

let resizeObserver = null

function handleResize() {
  const oldFit = fitScale.value
  measure()
  if (!loaded.value) return

  const newFit = fitScale.value
  const zoomed = oldFit > 0 && Math.abs(scale.value - oldFit) > oldFit * 0.002
  if (newFit > 0 && zoomed) {
    // 窗口尺寸变化时保留相对缩放比例
    scale.value = clampScale(newFit * (scale.value / oldFit), newFit, props.maxZoom)
    clampPosition()
  } else {
    fitView(false)
  }
}

watch(() => props.src, () => {
  loaded.value = false
  error.value = false
  naturalWidth.value = 0
  naturalHeight.value = 0
  scale.value = 1
  tx.value = 0
  ty.value = 0
  interacted.value = false
  nextTick(() => {
    const img = imgRef.value
    if (img?.complete && img.naturalWidth) onImageLoad()
  })
})

watch(() => props.fitMode, () => {
  if (loaded.value) fitView(false)
})

onMounted(() => {
  measure()
  viewport.value?.addEventListener('wheel', onWheel, { passive: false })

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(viewport.value)
  } else {
    window.addEventListener('resize', handleResize)
  }

  const img = imgRef.value
  if (img?.complete && img.naturalWidth) onImageLoad()
})

onBeforeUnmount(() => {
  viewport.value?.removeEventListener('wheel', onWheel)
  window.removeEventListener('resize', handleResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  pointers.clear()
  dragStart = null
  pinchStart = null
})
</script>

<style scoped>
.image-canvas {
  position: relative;
  width: 100%;
  min-height: 200px;
  overflow: hidden;
  border-radius: 10px;
  background: #10141a;
}

.canvas-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: default;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  background:
    radial-gradient(circle at 50% 0%, rgba(108, 155, 255, 0.08), transparent 60%),
    #10141a;
}

.canvas-viewport.is-zoomed {
  cursor: grab;
}

.canvas-viewport.is-dragging {
  cursor: grabbing;
}

.canvas-viewport:focus-visible {
  box-shadow: inset 0 0 0 2px rgba(108, 155, 255, 0.55);
}

.canvas-stage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  will-change: transform;
}

.canvas-stage img {
  display: block;
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.canvas-status {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b96a8;
  font-size: 0.9rem;
  background: rgba(16, 20, 26, 0.6);
}

.canvas-status.is-error {
  color: #ff8a8a;
}

.canvas-toolbar {
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 999px;
  background: rgba(16, 20, 26, 0.72);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
}

.canvas-btn {
  min-width: 26px;
  height: 26px;
  padding: 0 8px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #e8edf5;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s;
}

.canvas-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.24);
}

.canvas-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.canvas-btn-fit {
  font-size: 12px;
}

.canvas-zoom {
  min-width: 42px;
  text-align: center;
  color: #cfd8e6;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.canvas-hint {
  position: absolute;
  left: 12px;
  bottom: 14px;
  z-index: 3;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(16, 20, 26, 0.6);
  color: #aab6c8;
  font-size: 12px;
  pointer-events: none;
}

@media (pointer: coarse) {
  .canvas-btn {
    min-width: 32px;
    height: 32px;
    font-size: 15px;
  }

  .canvas-btn-fit {
    font-size: 13px;
  }

  .canvas-hint {
    display: none;
  }
}
</style>
