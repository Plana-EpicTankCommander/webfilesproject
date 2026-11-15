/**
 * HOI4-style interactive world map.
 *
 * Framework free. The map is rendered on a single canvas inside a shadow root,
 * using one compact JSON file that contains country metadata, first-level
 * division colours, shared boundary arcs and graticule lines.
 */
import { MAP_CSS } from './map-styles.js'

export const DEFAULT_MAP_SRC = 'https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json'
const MAX_ZOOM = 32
const MIN_ZOOM = 1
const GRID_COLUMNS = 56

const DEFAULTS = {
  src: DEFAULT_MAP_SRC,
  height: '520px',
  width: '100%',
  fit: 'contain',
  title: '',
  subtitle: '',
  kicker: 'ATLAS · 01',
  focus: '',
  zoom: 0,
  showTitle: true,
  showCompass: true,
  showGraticule: false,
  showLegend: true,
  showDivisionBorders: false,
  onDivisionClick: null,
  data: null,
  interactive: true
}

const dataCache = new Map()

function normalizeOptions(options = {}) {
  return { ...DEFAULTS, ...options }
}

function toHeight(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return `${Math.max(220, value)}px`
  if (typeof value === 'string' && value.trim()) {
    const trimmed = value.trim()
    if (/^\d+(\.\d+)?$/.test(trimmed)) return `${Math.max(220, Number(trimmed))}px`
    return trimmed
  }
  return DEFAULTS.height
}

function parseHeightPx(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const match = value.trim().match(/^(\d+(?:\.\d+)?)(px)?$/)
    if (match) return Number(match[1])
  }
  return null
}

function toWidth(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return `${Math.min(100, Math.max(20, value))}%`
  if (typeof value === 'string' && value.trim()) {
    const trimmed = value.trim()
    if (/^\d+(\.\d+)?$/.test(trimmed)) return `${Math.min(100, Math.max(20, Number(trimmed)))}%`
    return trimmed
  }
  return DEFAULTS.width
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function decodeArc(encoded) {
  let x = 0
  let y = 0
  const points = []
  for (let i = 0; i + 1 < encoded.length; i += 2) {
    x += encoded[i]
    y += encoded[i + 1]
    points.push([x, y])
  }
  return points
}

async function fetchMapData(src, onProgress) {
  if (dataCache.has(src)) {
    const cached = dataCache.get(src)
    if (cached instanceof Promise) return cached
    return cached
  }

  const promise = (async () => {
    const response = await fetch(src, { cache: 'no-cache' })
    if (!response.ok) throw new Error(`地图数据请求失败：HTTP ${response.status}`)

    const total = Number(response.headers.get('content-length')) || 0
    if (!response.body || !total) {
      const data = await response.json()
      onProgress?.(1)
      return data
    }

    const reader = response.body.getReader()
    const chunks = []
    let received = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      received += value.length
      onProgress?.(clamp(received / total, 0, 1))
    }
    onProgress?.(1)
    const buffer = new Uint8Array(received)
    let offset = 0
    for (const chunk of chunks) {
      buffer.set(chunk, offset)
      offset += chunk.length
    }
    const text = new TextDecoder('utf-8').decode(buffer)
    return JSON.parse(text)
  })()

  dataCache.set(src, promise)
  try {
    const data = await promise
    dataCache.set(src, data)
    return data
  } catch (error) {
    dataCache.delete(src)
    throw error
  }
}

export class Hoi4Map {
  constructor(host, options = {}) {
    if (!host) throw new Error('Hoi4Map 需要一个容器元素')
    this.host = host
    this.options = normalizeOptions(options)
    this.src = this.options.src || DEFAULT_MAP_SRC
    this.explicitHeightPx = parseHeightPx(this.options.height)
    this.destroyed = false
    this.ready = false
    this.data = null
    this.pendingReveal = false

    this.viewW = 1
    this.viewH = 1
    this.dpr = 1
    this.fitScale = 1
    this.scale = 1
    this.tx = 0
    this.ty = 0
    this.snapMargin = 0

    this.pointers = new Map()
    this.drag = null
    this.pinch = null
    this.dragging = false
    this.hoverDivision = null
    this.hoverCountry = null
    this.selectedCountry = null
    this.fastRaf = 0
    this.qualityRaf = 0
    this.settleTimer = 0
    this.hintTimer = 0

    this.arcs = []
    this.fillGroups = new Map()
    this.countryPathCache = new Map()
    this.grid = null
    this.labelCountries = []

    this.bound = {
      pointerDown: (event) => this.onPointerDown(event),
      pointerMove: (event) => this.onPointerMove(event),
      pointerUp: (event) => this.onPointerUp(event),
      pointerCancel: (event) => this.onPointerUp(event, true),
      pointerLeave: () => this.onPointerLeave(),
      wheel: (event) => this.onWheel(event),
      doubleClick: (event) => this.onDoubleClick(event),
      keyDown: (event) => this.onKeyDown(event),
      toolbarClick: (event) => this.onToolbarClick(event),
      cardClose: () => this.clearSelection(),
      retry: () => this.load(),
      fullscreenChange: () => this.onFullscreenChange()
    }

    this.setupDom()
    this.host.__hoi4Map = this
    this.bindEvents()
    this.observeResize()
    this.makeGrain()
    this.resize()
    if (this.options.data) this.useData(this.options.data)
    else this.load()
  }

  useData(data) {
    this.data = data
    this.ready = true
    this.prepare(data)
    this.frame.dataset.busy = 'false'
    this.loading.hidden = true
    this.pendingReveal = false
    this.fitScale = this.computeFitScale()
    this.resize()
    this.applyInitialView()
    this.updateChrome()
    this.updateToolbar()
    this.invalidateQuality()
  }

  setData(data) {
    if (this.destroyed || !data) return
    const oldWidth = this.data?.meta?.width
    const oldHeight = this.data?.meta?.height
    this.hideTooltip()
    this.clearSelection()
    this.ready = true
    this.prepare(data)
    this.fitScale = this.computeFitScale()
    const dimensionsChanged = oldWidth !== data.meta.width || oldHeight !== data.meta.height
    if (dimensionsChanged) {
      this.scale = this.fitScale
      this.tx = (this.viewW - data.meta.width * this.scale) / 2
      this.ty = (this.viewH - data.meta.height * this.scale) / 2
    }
    this.clampTransform()
    this.updateChrome()
    this.updateToolbar()
    this.snapshot = null
    this.invalidateQuality()
  }

  // ---------------------------------------------------------------------------
  // DOM
  // ---------------------------------------------------------------------------

  setupDom() {
    this.host.style.display = this.host.style.display || 'block'
    this.host.style.width = toWidth(this.options.width)
    this.root = this.host.shadowRoot || this.host.attachShadow({ mode: 'open' })

    this.root.innerHTML = `
      <style>${MAP_CSS}</style>
      <div class="hm-frame" data-busy="true">
        <canvas class="hm-canvas" tabindex="0" role="application" aria-label="可缩放的世界政治地图"></canvas>
        <div class="hm-grain"></div>

        <header class="hm-plate">
          <span class="hm-plate-kicker"></span>
          <h2 class="hm-title"></h2>
          <p class="hm-subtitle"></p>
        </header>

        <svg class="hm-compass" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="24.5" fill="none" stroke="currentColor" stroke-opacity=".34"/>
          <circle cx="32" cy="32" r="19" fill="none" stroke="currentColor" stroke-opacity=".16" stroke-dasharray="1 3"/>
          <path d="M32 4 L36.5 28 L32 32 L27.5 28 Z" fill="currentColor" fill-opacity=".82"/>
          <path d="M32 60 L27.5 36 L32 32 L36.5 36 Z" fill="currentColor" fill-opacity=".32"/>
          <path d="M4 32 L28 27.5 L32 32 L28 36.5 Z" fill="currentColor" fill-opacity=".32"/>
          <path d="M60 32 L36 36.5 L32 32 L36 27.5 Z" fill="currentColor" fill-opacity=".32"/>
          <text x="32" y="11" text-anchor="middle" fill="currentColor" fill-opacity=".8" font-family="Georgia,serif" font-size="6.5">N</text>
          <text x="55.5" y="34" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-family="Georgia,serif" font-size="5.5">E</text>
          <text x="32" y="57.5" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-family="Georgia,serif" font-size="5.5">S</text>
          <text x="8.5" y="34" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-family="Georgia,serif" font-size="5.5">W</text>
        </svg>

        <div class="hm-toolbar" role="group" aria-label="地图控制">
          <button type="button" class="hm-btn" data-action="zoom-out" aria-label="缩小" title="缩小">−</button>
          <span class="hm-zoom" aria-live="off">100%</span>
          <button type="button" class="hm-btn" data-action="zoom-in" aria-label="放大" title="放大">+</button>
          <button type="button" class="hm-btn hm-fit" data-action="reset" aria-label="回到全图" title="回到全图">适合</button>
          <button type="button" class="hm-btn hm-full" data-action="fullscreen" aria-label="全屏" title="全屏">⛶</button>
        </div>

        <div class="hm-hint">滚轮缩放 · 拖动平移 · 双击放大</div>
        <div class="hm-legend">
          <span class="hm-legend-countries"></span>
          <i></i>
          <span class="hm-legend-divisions"></span>
        </div>

        <div class="hm-tooltip" role="status">
          <span class="hm-tt-kicker"><i class="hm-tt-dot"></i><span class="hm-tt-country"></span></span>
          <strong class="hm-tt-name"></strong>
          <small class="hm-tt-sub"></small>
        </div>

        <div class="hm-card" hidden>
          <button type="button" class="hm-card-close" aria-label="关闭国家信息">×</button>
          <div class="hm-card-head">
            <span class="hm-swatch"></span>
            <div>
              <strong class="hm-card-name"></strong>
              <em class="hm-card-en"></em>
            </div>
          </div>
          <dl class="hm-card-stats">
            <div class="hm-stat"><dt>代码</dt><dd class="hm-card-code"></dd></div>
            <div class="hm-stat"><dt>一级行政区</dt><dd class="hm-card-count"></dd></div>
          </dl>
        </div>

        <div class="hm-loading">
          <div class="hm-spinner"></div>
          <p>正在展开地图…</p>
          <div class="hm-progress"><i></i></div>
          <small>0%</small>
        </div>

        <div class="hm-error" hidden>
          <p class="hm-error-text"></p>
          <button type="button" class="hm-retry">重试</button>
        </div>

        <div class="hm-live" aria-live="polite"></div>
      </div>
    `

    this.frame = this.root.querySelector('.hm-frame')
    this.canvas = this.root.querySelector('.hm-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.plate = this.root.querySelector('.hm-plate')
    this.plateKicker = this.root.querySelector('.hm-plate-kicker')
    this.titleEl = this.root.querySelector('.hm-title')
    this.subtitleEl = this.root.querySelector('.hm-subtitle')
    this.zoomLabel = this.root.querySelector('.hm-zoom')
    this.toolbar = this.root.querySelector('.hm-toolbar')
    this.hintEl = this.root.querySelector('.hm-hint')
    this.legend = this.root.querySelector('.hm-legend')
    this.legendCountries = this.root.querySelector('.hm-legend-countries')
    this.legendDivisions = this.root.querySelector('.hm-legend-divisions')
    this.tooltip = this.root.querySelector('.hm-tooltip')
    this.tooltipCountry = this.root.querySelector('.hm-tt-country')
    this.tooltipName = this.root.querySelector('.hm-tt-name')
    this.tooltipSub = this.root.querySelector('.hm-tt-sub')
    this.card = this.root.querySelector('.hm-card')
    this.cardSwatch = this.root.querySelector('.hm-swatch')
    this.cardName = this.root.querySelector('.hm-card-name')
    this.cardEn = this.root.querySelector('.hm-card-en')
    this.cardCode = this.root.querySelector('.hm-card-code')
    this.cardCount = this.root.querySelector('.hm-card-count')
    this.loading = this.root.querySelector('.hm-loading')
    this.progressBar = this.root.querySelector('.hm-progress i')
    this.loadingPercent = this.root.querySelector('.hm-loading small')
    this.errorBox = this.root.querySelector('.hm-error')
    this.errorText = this.root.querySelector('.hm-error-text')
    this.live = this.root.querySelector('.hm-live')

    this.frame.style.setProperty('--hm-height', toHeight(this.options.height))
    this.plateKicker.textContent = this.options.kicker || DEFAULTS.kicker
    this.titleEl.textContent = this.options.title || '世界政治地图'
    this.subtitleEl.textContent = this.options.subtitle || 'WORLD POLITICAL MAP'
    this.plate.hidden = !this.options.showTitle || this.options.title === 'none'
    this.root.querySelector('.hm-compass').hidden = !this.options.showCompass
    this.legend.hidden = !this.options.showLegend
    if (!document.fullscreenEnabled) this.root.querySelector('.hm-full').hidden = true
    if (!this.options.interactive) {
      this.toolbar.hidden = true
      this.hintEl.hidden = true
    }

    this.hintTimer = window.setTimeout(() => this.dismissHint(), 6000)
  }

  bindEvents() {
    const canvas = this.canvas
    canvas.addEventListener('pointerdown', this.bound.pointerDown)
    canvas.addEventListener('pointermove', this.bound.pointerMove)
    canvas.addEventListener('pointerup', this.bound.pointerUp)
    canvas.addEventListener('pointercancel', this.bound.pointerCancel)
    canvas.addEventListener('pointerleave', this.bound.pointerLeave)
    canvas.addEventListener('wheel', this.bound.wheel, { passive: false })
    canvas.addEventListener('dblclick', this.bound.doubleClick)
    canvas.addEventListener('keydown', this.bound.keyDown)
    this.toolbar.addEventListener('click', this.bound.toolbarClick)
    this.root.querySelector('.hm-card-close').addEventListener('click', this.bound.cardClose)
    this.root.querySelector('.hm-retry').addEventListener('click', this.bound.retry)
    document.addEventListener('fullscreenchange', this.bound.fullscreenChange)
  }

  observeResize() {
    if (typeof ResizeObserver === 'undefined') {
      this.windowResize = () => this.resize()
      window.addEventListener('resize', this.windowResize)
      return
    }
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.frame)
  }

  makeGrain() {
    const size = 180
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const image = ctx.createImageData(size, size)
    for (let i = 0; i < image.data.length; i += 4) {
      const value = 118 + Math.floor(Math.random() * 118)
      image.data[i] = value
      image.data[i + 1] = value
      image.data[i + 2] = value
      image.data[i + 3] = Math.floor(Math.random() * 24)
    }
    ctx.putImageData(image, 0, 0)
    this.frame.style.setProperty('--hm-grain', `url(${canvas.toDataURL('image/png')})`)
  }

  // ---------------------------------------------------------------------------
  // Loading / data
  // ---------------------------------------------------------------------------

  async load() {
    if (this.destroyed) return
    this.ready = false
    this.frame.dataset.busy = 'true'
    this.loading.hidden = false
    this.loading.classList.remove('is-done')
    this.errorBox.hidden = true
    this.progressBar.style.width = '0%'
    this.loadingPercent.textContent = '0%'

    try {
      const data = await fetchMapData(this.src, (progress) => {
        if (this.destroyed) return
        const pct = Math.round(progress * 100)
        this.progressBar.style.width = `${pct}%`
        this.loadingPercent.textContent = `${pct}%`
      })
      if (this.destroyed) return
      this.prepare(data)
      this.ready = true
      this.frame.dataset.busy = 'false'
      this.resize()
      this.applyInitialView()
      this.updateChrome()
      this.updateToolbar()
      this.dismissHint()
      this.pendingReveal = true
      this.invalidateQuality()
    } catch (error) {
      if (this.destroyed) return
      this.frame.dataset.busy = 'false'
      this.loading.hidden = true
      this.errorBox.hidden = false
      this.errorText.textContent = error?.message || '地图加载失败'
      console.error('[hoi4-map]', error)
    }
  }

  prepare(data) {
    if (!data || !Array.isArray(data.arcs) || !Array.isArray(data.divisions)) {
      throw new Error('地图 JSON 格式不正确')
    }
    this.data = data
    this.arcs = data.arcs.map(decodeArc)
    this.fillGroups.clear()
    this.countryPathCache.clear()
    this.hoverDivision = null
    this.hoverCountry = null
    this.selectedCountry = null

    const byDivision = new Map()
    const grid = {
      cols: GRID_COLUMNS,
      rows: 1,
      cell: data.meta.width / GRID_COLUMNS,
      cells: []
    }
    grid.rows = Math.ceil(data.meta.height / grid.cell)
    grid.cells = Array.from({ length: grid.cols * grid.rows }, () => [])

    for (const division of data.divisions) {
      const rings = this.ringsForDivision(division)
      if (!rings.length) continue
      const path = this.pathFromRings(rings)
      const bbox = this.boundsOfRings(rings)
      division._rings = rings
      division._path = path
      division._bbox = bbox

      let group = this.fillGroups.get(division.color)
      if (!group) {
        group = new Path2D()
        this.fillGroups.set(division.color, group)
      }
      group.addPath(path)

      const col0 = clamp(Math.floor((bbox[0] - data.meta.width * 0) / grid.cell), 0, grid.cols - 1)
      const col1 = clamp(Math.floor(bbox[2] / grid.cell), 0, grid.cols - 1)
      const row0 = clamp(Math.floor(bbox[1] / grid.cell), 0, grid.rows - 1)
      const row1 = clamp(Math.floor(bbox[3] / grid.cell), 0, grid.rows - 1)
      for (let row = row0; row <= row1; row++) {
        for (let col = col0; col <= col1; col++) {
          grid.cells[row * grid.cols + col].push(division)
        }
      }
      byDivision.set(division.id, division)
    }

    this.grid = grid
    this.byDivision = byDivision
    this.countryByCode = new Map(data.countries.map((country) => [country.code, country]))
    this.labelCountries = [...data.countries].sort((a, b) => b.area - a.area)

    this.coastPath = this.pathFromArcList(data.coast || [])
    this.borderPath = this.pathFromArcList(data.borders || [])
    this.graticulePath = this.pathFromGraticule(data.graticule || [])
    this.divisionBorderPath = null
    if (this.options.showDivisionBorders) {
      const national = new Set([...(data.coast || []), ...(data.borders || [])])
      const internal = []
      for (let i = 0; i < data.arcs.length; i++) {
        if (!national.has(i)) internal.push(i)
      }
      this.divisionBorderPath = this.pathFromArcList(internal)
    }
    this.countryPaths = new Map()
    for (const country of data.countries) {
      const path = this.pathFromArcList(country.arcs || [])
      this.countryPaths.set(country.code, path)
    }
  }

  ringsForDivision(division) {
    const rings = []
    for (const polygon of division.polygons || []) {
      for (const refs of polygon) {
        const points = []
        for (const ref of refs) {
          const index = ref < 0 ? ~ref : ref
          const arc = this.arcs[index]
          if (!arc || arc.length === 0) continue
          if (ref < 0) {
            for (let i = arc.length - 1; i >= 0; i--) this.pushPoint(points, arc[i])
          } else {
            for (let i = 0; i < arc.length; i++) this.pushPoint(points, arc[i])
          }
        }
        if (points.length > 1) {
          const first = points[0]
          const last = points[points.length - 1]
          if (first[0] === last[0] && first[1] === last[1]) points.pop()
        }
        if (points.length >= 3) rings.push(points)
      }
    }
    return rings
  }

  pushPoint(points, point) {
    const last = points[points.length - 1]
    if (last && last[0] === point[0] && last[1] === point[1]) return
    points.push(point)
  }

  pathFromRings(rings) {
    const path = new Path2D()
    for (const ring of rings) {
      path.moveTo(ring[0][0], ring[0][1])
      for (let i = 1; i < ring.length; i++) path.lineTo(ring[i][0], ring[i][1])
      path.closePath()
    }
    return path
  }

  pathFromArcList(indices) {
    const path = new Path2D()
    for (const index of indices) {
      const arc = this.arcs[index]
      if (!arc || arc.length < 2) continue
      path.moveTo(arc[0][0], arc[0][1])
      for (let i = 1; i < arc.length; i++) path.lineTo(arc[i][0], arc[i][1])
    }
    return path
  }

  pathFromGraticule(lines) {
    const path = new Path2D()
    for (const encoded of lines) {
      const arc = decodeArc(encoded)
      if (arc.length < 2) continue
      path.moveTo(arc[0][0], arc[0][1])
      for (let i = 1; i < arc.length; i++) path.lineTo(arc[i][0], arc[i][1])
    }
    return path
  }

  boundsOfRings(rings) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const ring of rings) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
    return [minX, minY, maxX, maxY]
  }

  // ---------------------------------------------------------------------------
  // Layout / camera
  // ---------------------------------------------------------------------------

  resize() {
    if (this.destroyed) return
    const rect = this.frame.getBoundingClientRect()
    if (rect.width < 2 || rect.height < 2) return

    // A world map is ~2.24:1. On a narrow portrait canvas a fixed 540px height
    // would leave a huge empty ocean, so cap the frame at the map's own aspect
    // plus room for the title plate and toolbar.
    if (this.ready && this.data && this.explicitHeightPx && document.fullscreenElement !== this.frame) {
      const aspect = this.data.meta.width / this.data.meta.height
      const target = rect.width < 760
        ? Math.round(Math.max(280, Math.min(this.explicitHeightPx, rect.width / aspect + 128)))
        : Math.round(this.explicitHeightPx)
      if (Math.abs(rect.height - target) > 2) {
        this.frame.style.setProperty('--hm-height', `${target}px`)
        return
      }
    }

    const oldFit = this.fitScale
    const oldScale = this.scale
    const oldW = this.viewW
    const oldH = this.viewH
    const centerX = oldFit ? (oldW / 2 - this.tx) / oldScale : 0
    const centerY = oldFit ? (oldH / 2 - this.ty) / oldScale : 0

    this.viewW = Math.max(2, this.frame.clientWidth)
    this.viewH = Math.max(2, this.frame.clientHeight)
    this.dpr = clamp(window.devicePixelRatio || 1, 1, 2)
    this.canvas.width = Math.max(1, Math.round(this.viewW * this.dpr))
    this.canvas.height = Math.max(1, Math.round(this.viewH * this.dpr))
    this.ctx = this.canvas.getContext('2d')

    // The snapshot is intentionally larger than the viewport. The margin gives
    // the fast path something to reveal while the user is still dragging.
    this.snapMargin = Math.round(Math.min(this.viewW, this.viewH) * 0.32)
    const mapW = Math.round((this.viewW + this.snapMargin * 2) * this.dpr)
    const mapH = Math.round((this.viewH + this.snapMargin * 2) * this.dpr)
    if (!this.mapCanvas) this.mapCanvas = document.createElement('canvas')
    this.mapCanvas.width = Math.max(1, mapW)
    this.mapCanvas.height = Math.max(1, mapH)
    this.mapCtx = this.mapCanvas.getContext('2d')
    this.snapshot = null

    this.buildOcean()

    if (this.ready && this.data) {
      this.fitScale = this.computeFitScale()
      if (oldFit > 0 && oldScale > 0) {
        const relative = oldScale / oldFit
        this.scale = clamp(this.fitScale * relative, this.fitScale * MIN_ZOOM, this.fitScale * MAX_ZOOM)
        this.tx = this.viewW / 2 - centerX * this.scale
        this.ty = this.viewH / 2 - centerY * this.scale
      } else {
        this.scale = this.fitScale
        this.tx = (this.viewW - this.data.meta.width * this.scale) / 2
        this.ty = (this.viewH - this.data.meta.height * this.scale) / 2
      }
      this.clampTransform()
      this.updateToolbar()
      this.invalidateQuality()
    } else {
      this.renderEmpty()
    }
  }

  setHeight(value) {
    this.options.height = value
    this.explicitHeightPx = parseHeightPx(value)
    this.frame.style.setProperty('--hm-height', toHeight(value))
    this.resize()
  }

  computeFitScale() {
    if (!this.data) return 1
    const worldW = this.data.meta.width
    const worldH = this.data.meta.height
    const raw = this.options.fit === 'cover'
      ? Math.max(this.viewW / worldW, this.viewH / worldH)
      : Math.min(this.viewW / worldW, this.viewH / worldH)
    return raw * (this.options.fit === 'cover' ? 1.01 : 0.965)
  }

  applyInitialView() {
    if (!this.ready) return
    this.fitScale = this.computeFitScale()
    const zoom = Number(this.options.zoom) || 0
    const focus = this.options.focus

    if (focus) {
      this.focusOn(focus, zoom || 2.6)
    } else if (zoom > MIN_ZOOM) {
      this.scale = clamp(this.fitScale * zoom, this.fitScale * MIN_ZOOM, this.fitScale * MAX_ZOOM)
      this.tx = this.viewW / 2 - (this.data.meta.width * this.scale) / 2
      this.ty = this.viewH / 2 - (this.data.meta.height * this.scale) / 2
      this.clampTransform()
    } else {
      this.resetView(false)
    }
    this.updateToolbar()
  }

  resetView(animate = true) {
    if (!this.ready) return
    this.scale = this.fitScale
    this.tx = (this.viewW - this.data.meta.width * this.scale) / 2
    this.ty = (this.viewH - this.data.meta.height * this.scale) / 2
    this.updateToolbar()
    this.invalidateFast()
    this.scheduleQuality(100)
    if (animate) this.dismissHint()
  }

  focusOn(codeOrId, zoomMultiplier = 2.6) {
    if (!this.ready) return false
    let country = this.countryByCode.get(codeOrId)
    if (!country) {
      const division = this.byDivision.get(codeOrId)
      if (division) country = this.countryByCode.get(division.country)
    }
    if (!country) {
      this.resetView(false)
      return false
    }
    const [x0, y0, x1, y1] = country.bbox
    // Overseas territories can make a country's bbox enormous; the label
    // anchor is a much better focus point (e.g. mainland France).
    const centerX = Number.isFinite(country.label?.[0]) ? country.label[0] : (x0 + x1) / 2
    const centerY = Number.isFinite(country.label?.[1]) ? country.label[1] : (y0 + y1) / 2
    const span = Math.max(x1 - x0, y1 - y0)
    let multiplier = Math.max(1.2, Math.min(MAX_ZOOM, zoomMultiplier))
    if (span > 0 && span < 220) {
      // Microstates need a much deeper zoom to be more than a dot.
      const auto = (Math.min(this.viewW, this.viewH) * 0.5) / (span * this.fitScale)
      multiplier = Math.max(multiplier, clamp(auto, 2.6, MAX_ZOOM))
    }
    const target = clamp(
      this.fitScale * multiplier,
      this.fitScale * MIN_ZOOM,
      this.fitScale * MAX_ZOOM
    )
    this.scale = target
    this.tx = this.viewW / 2 - centerX * target
    this.ty = this.viewH / 2 - centerY * target
    this.clampTransform()
    this.updateToolbar()
    this.invalidateFast()
    this.scheduleQuality(100)
    return true
  }

  setView({ focus = '', zoom = 0 } = {}) {
    if (focus) return this.focusOn(focus, Number(zoom) || 2.6)
    if (Number(zoom) > 1) {
      this.scale = clamp(this.fitScale * Number(zoom), this.fitScale * MIN_ZOOM, this.fitScale * MAX_ZOOM)
      this.tx = this.viewW / 2 - (this.data.meta.width * this.scale) / 2
      this.ty = this.viewH / 2 - (this.data.meta.height * this.scale) / 2
      this.clampTransform()
      this.updateToolbar()
      this.invalidateFast()
      this.scheduleQuality(100)
      return true
    }
    this.resetView()
    return true
  }

  clampTransform() {
    if (!this.data) return
    const scaledW = this.data.meta.width * this.scale
    const scaledH = this.data.meta.height * this.scale
    if (scaledW <= this.viewW) this.tx = (this.viewW - scaledW) / 2
    else this.tx = clamp(this.tx, this.viewW - scaledW, 0)
    if (scaledH <= this.viewH) this.ty = (this.viewH - scaledH) / 2
    else this.ty = clamp(this.ty, this.viewH - scaledH, 0)
  }

  zoomAt(targetScale, screenX, screenY) {
    if (!this.ready) return
    const next = clamp(targetScale, this.fitScale * MIN_ZOOM, this.fitScale * MAX_ZOOM)
    if (Math.abs(next - this.scale) < 1e-9) return
    const worldX = (screenX - this.tx) / this.scale
    const worldY = (screenY - this.ty) / this.scale
    this.scale = next
    this.tx = screenX - worldX * next
    this.ty = screenY - worldY * next
    this.clampTransform()
    this.updateToolbar()
    this.invalidateFast()
    this.scheduleQuality(180)
    this.dismissHint()
  }

  updateToolbar() {
    if (!this.zoomLabel) return
    const percent = this.fitScale ? Math.round((this.scale / this.fitScale) * 100) : 100
    this.zoomLabel.textContent = `${percent}%`
    this.frame.dataset.zoomed = this.scale > this.fitScale * 1.01 ? 'true' : 'false'
    // At world scale there is nothing to pan: let a vertical swipe scroll the
    // article instead of trapping the page. Once zoomed, the map owns touch.
    if (this.canvas) {
      this.canvas.style.touchAction = this.scale > this.fitScale * 1.01 ? 'none' : 'pan-y'
    }
    const minus = this.root.querySelector('[data-action="zoom-out"]')
    const plus = this.root.querySelector('[data-action="zoom-in"]')
    if (minus) minus.disabled = this.scale <= this.fitScale * 1.001
    if (plus) plus.disabled = this.scale >= this.fitScale * MAX_ZOOM * 0.999
  }

  updateChrome() {
    if (!this.data) return
    const meta = this.data.meta
    this.titleEl.textContent = this.options.title || meta.title || '世界政治地图'
    this.subtitleEl.textContent = this.options.subtitle || meta.titleEn || 'WORLD POLITICAL MAP'
    this.legendCountries.textContent = `${meta.countries} 国家`
    this.legendDivisions.textContent = `${meta.divisions.toLocaleString('zh-CN')} 一级行政区`
    this.canvas.setAttribute('aria-label', `可缩放的世界政治地图，${meta.countries} 个国家，${meta.divisions} 个一级行政区`)
  }

  // ---------------------------------------------------------------------------
  // Ocean / background
  // ---------------------------------------------------------------------------

  buildOcean() {
    const w = Math.max(1, Math.round(this.viewW * this.dpr))
    const h = Math.max(1, Math.round(this.viewH * this.dpr))
    if (!this.oceanCanvas) this.oceanCanvas = document.createElement('canvas')
    if (this.oceanCanvas.width !== w || this.oceanCanvas.height !== h) {
      this.oceanCanvas.width = w
      this.oceanCanvas.height = h
    }
    const ctx = this.oceanCanvas.getContext('2d')
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, this.viewW, this.viewH)

    const linear = ctx.createLinearGradient(0, 0, 0, this.viewH)
    linear.addColorStop(0, '#13242c')
    linear.addColorStop(0.46, '#0d1a20')
    linear.addColorStop(1, '#071014')
    ctx.fillStyle = linear
    ctx.fillRect(0, 0, this.viewW, this.viewH)

    const radial = ctx.createRadialGradient(
      this.viewW * 0.5, this.viewH * 0.38, 0,
      this.viewW * 0.5, this.viewH * 0.42, Math.max(this.viewW, this.viewH) * 0.72
    )
    radial.addColorStop(0, 'rgba(65, 105, 118, 0.26)')
    radial.addColorStop(0.48, 'rgba(26, 50, 60, 0.12)')
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = radial
    ctx.fillRect(0, 0, this.viewW, this.viewH)

    // Subtle sea texture: tiny specks and long, faint current-like strokes.
    const specks = Math.round((this.viewW * this.viewH) / 900)
    for (let i = 0; i < specks; i++) {
      const x = Math.random() * this.viewW
      const y = Math.random() * this.viewH
      ctx.fillStyle = `rgba(174, 204, 210, ${0.012 + Math.random() * 0.022})`
      ctx.fillRect(x, y, 1, 1)
    }
    ctx.lineWidth = 0.7
    for (let i = 0; i < 18; i++) {
      const y = Math.random() * this.viewH
      const x = Math.random() * this.viewW
      const len = 30 + Math.random() * 150
      ctx.beginPath()
      ctx.strokeStyle = `rgba(142, 178, 188, ${0.012 + Math.random() * 0.018})`
      ctx.moveTo(x, y)
      ctx.bezierCurveTo(x + len * 0.3, y - 5, x + len * 0.7, y + 5, x + len, y)
      ctx.stroke()
    }
  }

  renderEmpty() {
    if (!this.ctx) return
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.clearRect(0, 0, this.viewW, this.viewH)
    if (this.oceanCanvas) this.ctx.drawImage(this.oceanCanvas, 0, 0, this.viewW, this.viewH)
  }

  // ---------------------------------------------------------------------------
  // Render
  //
  // A full vector redraw is relatively expensive at 1:10m detail, so the map
  // uses a two-speed renderer:
  //   - quality: vector draw into an offscreen canvas, cached as a snapshot
  //   - fast:   transform the snapshot while dragging / wheeling
  // The sharp vector pass is re-run ~180 ms after the interaction stops.
  // ---------------------------------------------------------------------------

  invalidateFast() {
    if (this.destroyed) return
    if (this.qualityRaf) {
      cancelAnimationFrame(this.qualityRaf)
      this.qualityRaf = 0
    }
    if (this.fastRaf) return
    this.fastRaf = requestAnimationFrame(() => {
      this.fastRaf = 0
      this.renderFast()
    })
  }

  invalidateQuality() {
    if (this.destroyed) return
    if (this.fastRaf) {
      cancelAnimationFrame(this.fastRaf)
      this.fastRaf = 0
    }
    if (this.qualityRaf) return
    this.qualityRaf = requestAnimationFrame(() => {
      this.qualityRaf = 0
      this.renderQuality()
    })
  }

  invalidate() {
    this.invalidateFast()
  }

  scheduleQuality(delay = 180) {
    if (this.destroyed) return
    if (this.settleTimer) clearTimeout(this.settleTimer)
    this.settleTimer = window.setTimeout(() => {
      this.settleTimer = 0
      if (this.pointers.size || this.dragging) {
        this.scheduleQuality(120)
        return
      }
      this.invalidateQuality()
    }, delay)
  }

  drawOcean(ctx) {
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, this.viewW, this.viewH)
    if (this.oceanCanvas) ctx.drawImage(this.oceanCanvas, 0, 0, this.viewW, this.viewH)
  }

  render() {
    this.renderQuality()
  }

  renderQuality() {
    if (this.destroyed || !this.ctx) return
    this.drawOcean(this.ctx)
    this.drawGraticule(this.ctx)
    if (!this.ready || !this.data || !this.mapCtx) return

    const mapCtx = this.mapCtx
    const margin = this.snapMargin
    mapCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    mapCtx.clearRect(0, 0, this.viewW + margin * 2, this.viewH + margin * 2)
    this.drawMap(mapCtx, this.tx + margin, this.ty + margin)

    this.snapshot = {
      scale: this.scale,
      tx: this.tx + margin,
      ty: this.ty + margin,
      w: this.viewW + margin * 2,
      h: this.viewH + margin * 2
    }

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.drawImage(
      this.mapCanvas,
      margin * this.dpr,
      margin * this.dpr,
      this.viewW * this.dpr,
      this.viewH * this.dpr,
      0,
      0,
      this.viewW,
      this.viewH
    )
    this.drawLabels(this.ctx)
    this.drawOverlays(this.ctx)
    this.revealMap()
  }

  revealMap() {
    if (!this.pendingReveal || this.destroyed) return
    this.pendingReveal = false
    this.loading.classList.add('is-done')
    window.setTimeout(() => {
      if (!this.destroyed) this.loading.hidden = true
    }, 520)
  }

  renderFast() {
    if (this.destroyed || !this.ctx) return
    this.drawOcean(this.ctx)
    this.drawGraticule(this.ctx)
    if (!this.ready || !this.data || !this.mapCanvas || !this.snapshot) {
      this.renderQuality()
      return
    }
    const ratio = this.scale / this.snapshot.scale
    const dx = this.tx - this.snapshot.tx * ratio
    const dy = this.ty - this.snapshot.ty * ratio
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.imageSmoothingEnabled = true
    this.ctx.drawImage(
      this.mapCanvas,
      dx,
      dy,
      this.snapshot.w * ratio,
      this.snapshot.h * ratio
    )
    this.drawLabels(this.ctx)
    this.drawOverlays(this.ctx)
  }

  drawGraticule(ctx) {
    if (!this.options.showGraticule || !this.graticulePath || !this.ready) return
    ctx.save()
    ctx.setTransform(
      this.dpr * this.scale, 0, 0, this.dpr * this.scale,
      this.dpr * this.tx, this.dpr * this.ty
    )
    ctx.lineWidth = 0.75 / this.scale
    ctx.strokeStyle = 'rgba(126, 164, 176, 0.12)'
    ctx.stroke(this.graticulePath)
    ctx.restore()
  }

  drawMap(ctx, cameraX = this.tx, cameraY = this.ty) {
    const scale = this.scale
    ctx.save()
    ctx.setTransform(this.dpr * scale, 0, 0, this.dpr * scale, this.dpr * cameraX, this.dpr * cameraY)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    // Coastal halo: translucent strokes whose inner half is covered by the
    // land fills, which gives a drawn-map depth without canvas shadows.
    const zoom = this.scale / this.fitScale
    if (this.coastPath && zoom > 1.18) {
      // At world scale a wide halo turns small islands into dark blobs; let it
      // appear only as the user zooms in.
      const haloFactor = clamp(0.45 + zoom * 0.1, 0.45, 1)
      const halos = [
        [4.5, 'rgba(201, 168, 106, 0.018)'],
        [2.5, 'rgba(0, 4, 6, 0.08)'],
        [1.3, 'rgba(0, 3, 5, 0.12)'],
        [0.65, 'rgba(0, 2, 4, 0.18)']
      ]
      for (const [width, color] of halos) {
        ctx.lineWidth = (width * haloFactor) / scale
        ctx.strokeStyle = color
        ctx.stroke(this.coastPath)
      }
    }

    // Division fills. Colours are shared across countries, so this collapses to
    // a few dozen Path2D fills instead of thousands of individual paths.
    for (const [color, path] of this.fillGroups) {
      ctx.fillStyle = color
      ctx.fill(path)
    }

    if (this.divisionBorderPath) {
      ctx.lineWidth = 0.7 / scale
      ctx.strokeStyle = 'rgba(18, 15, 11, 0.52)'
      ctx.stroke(this.divisionBorderPath)
    }

    // National outline + coastline. There are deliberately no internal
    // first-level boundaries in the base render.
    if (this.coastPath) {
      ctx.lineWidth = 1.25 / scale
      ctx.strokeStyle = 'rgba(7, 7, 5, 0.95)'
      ctx.stroke(this.coastPath)
    }
    if (this.borderPath) {
      ctx.lineWidth = 1.55 / scale
      ctx.strokeStyle = 'rgba(22, 16, 10, 0.93)'
      ctx.stroke(this.borderPath)
      ctx.lineWidth = 0.55 / scale
      ctx.strokeStyle = 'rgba(238, 215, 168, 0.10)'
      ctx.stroke(this.borderPath)
    }
    ctx.restore()
  }

  drawOverlays(ctx) {
    if (!this.ready) return
    const scale = this.scale
    ctx.save()
    ctx.setTransform(this.dpr * scale, 0, 0, this.dpr * scale, this.dpr * this.tx, this.dpr * this.ty)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    if (this.hoverCountry) {
      const countryPath = this.countryPaths.get(this.hoverCountry)
      if (countryPath) {
        ctx.lineWidth = 2.1 / scale
        ctx.strokeStyle = 'rgba(239, 211, 154, 0.3)'
        ctx.stroke(countryPath)
      }
    }

    if (this.hoverDivision && !this.dragging) {
      const division = this.hoverDivision
      if (division._path) {
        ctx.fillStyle = 'rgba(255, 240, 204, 0.18)'
        ctx.fill(division._path)
        ctx.lineWidth = 1.15 / scale
        ctx.strokeStyle = 'rgba(255, 238, 196, 0.68)'
        ctx.stroke(division._path)
      }
    }

    if (this.selectedCountry) {
      const countryPath = this.countryPaths.get(this.selectedCountry)
      if (countryPath) {
        ctx.lineWidth = 8 / scale
        ctx.strokeStyle = 'rgba(234, 203, 140, 0.15)'
        ctx.stroke(countryPath)
        ctx.lineWidth = 1.8 / scale
        ctx.strokeStyle = 'rgba(247, 226, 175, 0.92)'
        ctx.stroke(countryPath)
      }
    }
    ctx.restore()
  }

  drawLabels(ctx) {
    if (!this.ready || !this.data) return
    const zoom = this.scale / this.fitScale
    if (zoom < 1.32) return
    const alpha = smoothstep(1.32, 2.05, zoom)
    const viewportLimit = Math.max(6, Math.round((this.viewW * this.viewH) / 16000))
    const maxLabels = Math.min(
      viewportLimit,
      zoom < 1.9 ? 16 : zoom < 2.8 ? 34 : zoom < 4.5 ? 55 : 80
    )
    const placed = []
    let drawn = 0

    const frameRect = this.frame.getBoundingClientRect()
    const avoid = []
    for (const el of [this.plate, this.toolbar, this.legend]) {
      if (!el || el.hidden) continue
      const r = el.getBoundingClientRect()
      if (r.width < 1 || r.height < 1) continue
      avoid.push({
        x: r.left - frameRect.left - 8,
        y: r.top - frameRect.top - 8,
        w: r.width + 16,
        h: r.height + 16
      })
    }

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.lineJoin = 'round'

    for (const country of this.labelCountries) {
      if (drawn >= maxLabels) break
      const bbox = country.bbox
      const x0 = bbox[0] * this.scale + this.tx
      const y0 = bbox[1] * this.scale + this.ty
      const x1 = bbox[2] * this.scale + this.tx
      const y1 = bbox[3] * this.scale + this.ty
      if (x1 < -30 || x0 > this.viewW + 30 || y1 < -20 || y0 > this.viewH + 20) continue
      const width = x1 - x0
      const height = y1 - y0
      if (width < 26 || height < 11) continue

      const sx = country.label[0] * this.scale + this.tx
      const sy = country.label[1] * this.scale + this.ty
      if (sx < 16 || sx > this.viewW - 16 || sy < 16 || sy > this.viewH - 16) continue

      const fontSize = Math.min(15, 11 + zoom * 0.55)
      const font = `600 ${fontSize}px "Noto Serif SC", "Songti SC", "STSong", "SimSun", Georgia, serif`
      ctx.font = font
      const label = country.nameZh || country.name
      const textWidth = ctx.measureText(label).width
      if (textWidth > Math.max(width * 1.45, 48) && zoom < 4.5) continue
      if (zoom < 5 && label.length > 6 && width < 160) continue

      const rect = {
        x: sx - textWidth / 2 - 4,
        y: sy - fontSize * 0.75 - 3,
        w: textWidth + 8,
        h: fontSize * 1.5 + 6
      }
      if (rect.x < 2 || rect.x + rect.w > this.viewW - 2 || rect.y < 2 || rect.y + rect.h > this.viewH - 2) continue
      if (avoid.some((other) => (
        rect.x < other.x + other.w && rect.x + rect.w > other.x &&
        rect.y < other.y + other.h && rect.y + rect.h > other.y
      ))) continue
      if (placed.some((other) => (
        rect.x < other.x + other.w && rect.x + rect.w > other.x &&
        rect.y < other.y + other.h && rect.y + rect.h > other.y
      ))) continue
      placed.push(rect)

      ctx.save()
      ctx.globalAlpha = alpha * (zoom > 2.4 ? 0.92 : 0.74)
      if ('letterSpacing' in ctx) ctx.letterSpacing = '1.4px'
      ctx.strokeStyle = 'rgba(3, 7, 9, 0.82)'
      ctx.lineWidth = 3.4
      ctx.strokeText(label, sx, sy)
      ctx.fillStyle = '#f2e8d3'
      ctx.fillText(label, sx, sy)

      if (zoom > 2.9 && width > 84 && country.name) {
        ctx.globalAlpha = alpha * 0.45
        ctx.font = '8px Georgia, "Times New Roman", serif'
        if ('letterSpacing' in ctx) ctx.letterSpacing = '2.2px'
        ctx.fillStyle = '#e4d6b9'
        ctx.fillText(country.name.toUpperCase(), sx, sy + fontSize * 0.98)
      }
      ctx.restore()
      drawn++
    }
  }

  // ---------------------------------------------------------------------------
  // Picking / interaction
  // ---------------------------------------------------------------------------

  pick(worldX, worldY) {
    if (!this.grid || !this.data) return null
    const { cols, rows, cell, cells } = this.grid
    if (worldX < 0 || worldY < 0 || worldX > this.data.meta.width || worldY > this.data.meta.height) return null
    const col = clamp(Math.floor(worldX / cell), 0, cols - 1)
    const row = clamp(Math.floor(worldY / cell), 0, rows - 1)
    const candidates = cells[row * cols + col]
    for (let i = candidates.length - 1; i >= 0; i--) {
      const division = candidates[i]
      const bbox = division._bbox
      if (!bbox || worldX < bbox[0] || worldX > bbox[2] || worldY < bbox[1] || worldY > bbox[3]) continue
      if (this.pointInRings(division._rings, worldX, worldY)) return division
    }
    return null
  }

  pointInRings(rings, x, y) {
    // Even-odd across all rings handles holes correctly.
    let inside = false
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0]
        const yi = ring[i][1]
        const xj = ring[j][0]
        const yj = ring[j][1]
        const intersects = ((yi > y) !== (yj > y)) &&
          (x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-9) + xi)
        if (intersects) inside = !inside
      }
    }
    return inside
  }

  canvasPoint(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect()
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  worldPoint(screenX, screenY) {
    return {
      x: (screenX - this.tx) / this.scale,
      y: (screenY - this.ty) / this.scale
    }
  }

  onPointerDown(event) {
    if (!this.ready || !this.options.interactive) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const atFit = this.scale <= this.fitScale * 1.001
    if (!(atFit && event.pointerType !== 'mouse')) event.preventDefault()
    this.canvas.focus({ preventScroll: true })
    this.dismissHint()
    this.hideTooltip()
    try {
      this.canvas.setPointerCapture(event.pointerId)
    } catch {
      // Older browsers may have already released the pointer.
    }
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (this.pointers.size === 1) {
      this.drag = {
        x: event.clientX,
        y: event.clientY,
        tx: this.tx,
        ty: this.ty,
        moved: false,
        time: performance.now()
      }
      this.pinch = null
      this.setDragging(false)
    } else if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()]
      this.drag = null
      this.pinch = {
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        scale: this.scale,
        tx: this.tx,
        ty: this.ty,
        midX: (a.x + b.x) / 2,
        midY: (a.y + b.y) / 2
      }
      this.setDragging(true)
    }
  }

  onPointerMove(event) {
    if (!this.pointers.has(event.pointerId)) {
      if (this.ready && !this.dragging && event.pointerType !== 'touch') this.updateHover(event)
      return
    }
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (this.pointers.size === 2 && this.pinch) {
      const [a, b] = [...this.pointers.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1
      const midX = (a.x + b.x) / 2
      const midY = (a.y + b.y) / 2
      const target = clamp(
        this.pinch.scale * (distance / this.pinch.distance),
        this.fitScale * MIN_ZOOM,
        this.fitScale * MAX_ZOOM
      )
      const rect = this.canvas.getBoundingClientRect()
      const startX = this.pinch.midX - rect.left
      const startY = this.pinch.midY - rect.top
      const worldX = (startX - this.pinch.tx) / this.pinch.scale
      const worldY = (startY - this.pinch.ty) / this.pinch.scale
      this.scale = target
      this.tx = (midX - rect.left) - worldX * target
      this.ty = (midY - rect.top) - worldY * target
      this.clampTransform()
      this.updateToolbar()
      this.invalidateFast()
      this.scheduleQuality(220)
      return
    }

    if (this.drag && this.pointers.size === 1) {
      const dx = event.clientX - this.drag.x
      const dy = event.clientY - this.drag.y
      if (Math.abs(dx) + Math.abs(dy) > 3) this.drag.moved = true
      this.tx = this.drag.tx + dx
      this.ty = this.drag.ty + dy
      this.clampTransform()
      this.setDragging(true)
      this.invalidateFast()
      this.scheduleQuality(220)
    }
  }

  onPointerUp(event, cancelled = false) {
    if (!this.pointers.has(event.pointerId)) return
    this.pointers.delete(event.pointerId)
    try {
      if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId)
    } catch {
      // ignore
    }

    const wasPinch = Boolean(this.pinch)
    if (this.pointers.size === 0) {
      const drag = this.drag
      this.drag = null
      this.pinch = null
      this.setDragging(false)
      this.scheduleQuality(90)
      if (!cancelled && !wasPinch && drag && !drag.moved && performance.now() - drag.time < 650) {
        this.onClick(event)
      }
      return
    }

    if (this.pointers.size === 1) {
      const [remaining] = [...this.pointers.values()]
      this.pinch = null
      this.drag = {
        x: remaining.x,
        y: remaining.y,
        tx: this.tx,
        ty: this.ty,
        moved: true,
        time: performance.now()
      }
      this.setDragging(true)
    }
  }

  onPointerLeave() {
    if (!this.pointers.size) this.hideTooltip()
  }

  setDragging(value) {
    this.dragging = value
    this.frame.dataset.dragging = value ? 'true' : 'false'
    if (value) this.hideTooltip()
  }

  onClick(event) {
    const point = this.canvasPoint(event.clientX, event.clientY)
    const world = this.worldPoint(point.x, point.y)
    const division = this.pick(world.x, world.y)
    if (division) {
      if (typeof this.options.onDivisionClick === 'function') {
        this.options.onDivisionClick(division, this)
      } else {
        this.selectCountry(division.country)
      }
    } else {
      this.clearSelection()
    }
  }

  onWheel(event) {
    if (!this.ready || !this.options.interactive) return
    this.dismissHint()
    let delta = event.deltaY
    if (event.deltaMode === 1) delta *= 16
    else if (event.deltaMode === 2) delta *= this.viewH

    // Already at the whole-world view and scrolling down: give the wheel back
    // to the article so readers can keep moving.
    if (this.scale <= this.fitScale * 1.001 && delta > 0) return
    event.preventDefault()
    const point = this.canvasPoint(event.clientX, event.clientY)
    const factor = Math.exp(-delta * 0.0015)
    this.zoomAt(this.scale * factor, point.x, point.y)
    this.updateHover(event)
  }

  onDoubleClick(event) {
    if (!this.ready || !this.options.interactive) return
    event.preventDefault()
    const point = this.canvasPoint(event.clientX, event.clientY)
    if (this.scale <= this.fitScale * 1.05) {
      this.zoomAt(this.fitScale * 2.7, point.x, point.y)
    } else {
      this.resetView()
    }
  }

  onKeyDown(event) {
    if (!this.ready || !this.options.interactive) return
    const step = 64
    switch (event.key) {
      case '+':
      case '=':
        event.preventDefault()
        this.zoomAt(this.scale * 1.3, this.viewW / 2, this.viewH / 2)
        break
      case '-':
      case '_':
        event.preventDefault()
        this.zoomAt(this.scale / 1.3, this.viewW / 2, this.viewH / 2)
        break
      case '0':
      case 'Home':
        event.preventDefault()
        this.resetView()
        break
      case 'ArrowLeft':
        event.preventDefault()
        this.tx += step
        this.clampTransform()
        this.invalidateFast()
        this.scheduleQuality(140)
        break
      case 'ArrowRight':
        event.preventDefault()
        this.tx -= step
        this.clampTransform()
        this.invalidateFast()
        this.scheduleQuality(140)
        break
      case 'ArrowUp':
        event.preventDefault()
        this.ty += step
        this.clampTransform()
        this.invalidateFast()
        this.scheduleQuality(140)
        break
      case 'ArrowDown':
        event.preventDefault()
        this.ty -= step
        this.clampTransform()
        this.invalidateFast()
        this.scheduleQuality(140)
        break
      case 'Escape':
        this.clearSelection()
        this.hideTooltip()
        break
      default:
        break
    }
  }

  onToolbarClick(event) {
    const button = event.target.closest('[data-action]')
    if (!button || !this.ready) return
    event.preventDefault()
    const action = button.dataset.action
    if (action === 'zoom-in') this.zoomAt(this.scale * 1.35, this.viewW / 2, this.viewH / 2)
    else if (action === 'zoom-out') this.zoomAt(this.scale / 1.35, this.viewW / 2, this.viewH / 2)
    else if (action === 'reset') this.resetView()
    else if (action === 'fullscreen') this.toggleFullscreen()
  }

  toggleFullscreen() {
    if (!document.fullscreenEnabled) return
    if (document.fullscreenElement === this.frame) {
      document.exitFullscreen?.().catch(() => {})
    } else {
      this.frame.requestFullscreen?.().catch(() => {})
    }
  }

  onFullscreenChange() {
    window.setTimeout(() => this.resize(), 80)
  }

  updateHover(event) {
    if (!this.ready || this.dragging) return
    const point = this.canvasPoint(event.clientX, event.clientY)
    if (point.x < 0 || point.y < 0 || point.x > this.viewW || point.y > this.viewH) {
      this.hideTooltip()
      return
    }
    const world = this.worldPoint(point.x, point.y)
    const division = this.pick(world.x, world.y)
    if (!division) {
      this.hideTooltip()
      return
    }
    if (this.hoverDivision !== division) {
      this.hoverDivision = division
      this.hoverCountry = division.country
      this.invalidate()
    }
    this.showTooltip(division, point.x, point.y)
  }

  showTooltip(division, x, y) {
    const country = this.countryByCode.get(division.country)
    if (!country) return
    this.tooltip.hidden = false
    this.tooltipCountry.textContent = `${country.code} · ${country.nameZh}`
    this.tooltipName.textContent = division.nameZh || division.name
    this.tooltipSub.textContent = `一级行政区 · ${country.name}`
    this.tooltip.style.setProperty('--hm-tt-color', division.color)
    this.tooltip.classList.add('is-visible')

    const tw = this.tooltip.offsetWidth
    const th = this.tooltip.offsetHeight
    let left = x + 16
    let top = y + 16
    if (left + tw > this.viewW - 8) left = x - tw - 14
    if (top + th > this.viewH - 8) top = y - th - 14
    left = clamp(left, 8, Math.max(8, this.viewW - tw - 8))
    top = clamp(top, 8, Math.max(8, this.viewH - th - 8))
    this.tooltip.style.left = `${left}px`
    this.tooltip.style.top = `${top}px`
  }

  hideTooltip() {
    this.tooltip.classList.remove('is-visible')
    if (this.hoverDivision || this.hoverCountry) {
      this.hoverDivision = null
      this.hoverCountry = null
      this.invalidate()
    }
  }

  selectCountry(code) {
    const country = this.countryByCode.get(code)
    if (!country) return
    this.selectedCountry = code
    this.frame.dataset.selected = 'true'
    this.card.hidden = false
    this.cardSwatch.style.background = country.color
    this.cardName.textContent = country.nameZh
    this.cardEn.textContent = country.name
    this.cardCode.textContent = country.code
    this.cardCount.textContent = String(country.divisions.length)
    this.live.textContent = `已选择 ${country.nameZh}，${country.divisions.length} 个一级行政区`
    this.invalidate()
  }

  clearSelection() {
    if (!this.selectedCountry) {
      this.card.hidden = true
      this.frame.dataset.selected = 'false'
      return
    }
    this.selectedCountry = null
    this.card.hidden = true
    this.frame.dataset.selected = 'false'
    this.live.textContent = '已取消选择'
    this.invalidate()
  }

  dismissHint() {
    if (this.hintEl) this.hintEl.classList.add('is-hidden')
    if (this.hintTimer) {
      clearTimeout(this.hintTimer)
      this.hintTimer = 0
    }
  }

  // ---------------------------------------------------------------------------
  // Teardown
  // ---------------------------------------------------------------------------

  destroy() {
    if (this.destroyed) return
    this.destroyed = true
    if (this.fastRaf) cancelAnimationFrame(this.fastRaf)
    if (this.qualityRaf) cancelAnimationFrame(this.qualityRaf)
    this.fastRaf = 0
    this.qualityRaf = 0
    if (this.settleTimer) clearTimeout(this.settleTimer)
    if (this.hintTimer) clearTimeout(this.hintTimer)
    if (this.resizeObserver) this.resizeObserver.disconnect()
    if (this.windowResize) window.removeEventListener('resize', this.windowResize)
    document.removeEventListener('fullscreenchange', this.bound.fullscreenChange)
    const canvas = this.canvas
    if (canvas) {
      canvas.removeEventListener('pointerdown', this.bound.pointerDown)
      canvas.removeEventListener('pointermove', this.bound.pointerMove)
      canvas.removeEventListener('pointerup', this.bound.pointerUp)
      canvas.removeEventListener('pointercancel', this.bound.pointerCancel)
      canvas.removeEventListener('pointerleave', this.bound.pointerLeave)
      canvas.removeEventListener('wheel', this.bound.wheel)
      canvas.removeEventListener('dblclick', this.bound.doubleClick)
      canvas.removeEventListener('keydown', this.bound.keyDown)
    }
    this.toolbar?.removeEventListener('click', this.bound.toolbarClick)
    this.root?.querySelector('.hm-card-close')?.removeEventListener('click', this.bound.cardClose)
    this.root?.querySelector('.hm-retry')?.removeEventListener('click', this.bound.retry)
    this.pointers.clear()
    if (document.fullscreenElement === this.frame) document.exitFullscreen?.().catch(() => {})
    if (this.host.__hoi4Map === this) delete this.host.__hoi4Map
    if (this.data) this.data = null
  }
}
