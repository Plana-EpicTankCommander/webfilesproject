import { Hoi4Map } from '../src/map/hoi4-map.js'

const BASES = {
  'east-asia': {
    url: 'https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/east-asia-map.json',
    label: '东亚',
    file: 'east-asia-edited.json'
  },
  world: {
    url: 'https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json',
    label: '世界',
    file: 'world-edited.json'
  }
}

const EAST_ASIA = ['CHN', 'HKG', 'JPN', 'KOR', 'MAC', 'MNG', 'PRK', 'TWN']

const $ = (selector) => document.querySelector(selector)

const state = {
  baseId: 'world',
  data: null,
  geom: null,
  map: null,
  activeCode: '',
  toastTimer: 0
}

const sourceBadge = $('#source-badge')
const sourceStatus = $('#source-status')
const activeSwatch = $('#active-swatch')
const activeCodeEl = $('#active-code')
const activeNameEl = $('#active-name')
const activeCount = $('#active-count')
const activeNameZhInput = $('#active-name-zh')
const activeNameEnInput = $('#active-name-en')
const activeColorInput = $('#active-color')
const countryList = $('#country-list')
const countrySearch = $('#country-search')
const summary = $('#summary')
const outputStats = $('#output-stats')
const outputStatus = $('#output-status')
const mapHost = $('#map-host')
const mapOverlay = $('#map-overlay')
const mapActive = $('#map-active')
const toast = $('#toast')
const downloadButton = $('#download')
const copyButton = $('#copy')
const countryError = $('#country-error')

function setStatus(element, text, type = '') {
  element.textContent = text
  element.classList.toggle('is-error', type === 'error')
  element.classList.toggle('is-ok', type === 'ok')
}

function showToast(text) {
  toast.textContent = text
  toast.classList.add('is-visible')
  if (state.toastTimer) clearTimeout(state.toastTimer)
  state.toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200)
}

function hashString(value) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function shadeColor(hex, hash) {
  const value = hex.replace('#', '')
  const num = parseInt(value, 16)
  if (!Number.isFinite(num)) return hex
  const delta = ((hash % 13) - 6) / 100
  const adjust = (channel) => Math.max(0, Math.min(255, Math.round(channel * (1 + delta))))
  const r = adjust((num >> 16) & 255)
  const g = adjust((num >> 8) & 255)
  const b = adjust(num & 255)
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

function sanitizeFilename(value) {
  let name = value.trim().replace(/[\\/:*?"<>|]/g, '-')
  if (!name) name = 'edited-map.json'
  if (!name.toLowerCase().endsWith('.json')) name += '.json'
  return name
}

function decodeArcs(encoded) {
  return encoded.map((arc) => {
    let x = 0
    let y = 0
    const points = []
    for (let i = 0; i + 1 < arc.length; i += 2) {
      x += arc[i]
      y += arc[i + 1]
      points.push([x, y])
    }
    return points
  })
}

function ringsForDivision(division, arcs) {
  const rings = []
  for (const polygon of division.polygons || []) {
    for (const refs of polygon) {
      const points = []
      for (const ref of refs) {
        const index = ref < 0 ? ~ref : ref
        const arc = arcs[index]
        if (!arc) continue
        const pointsToAdd = ref < 0 ? [...arc].reverse() : arc
        for (const point of pointsToAdd) {
          const last = points[points.length - 1]
          if (!last || last[0] !== point[0] || last[1] !== point[1]) points.push(point)
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

function ringArea(points) {
  let area = 0
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    area += points[j][0] * points[i][1] - points[i][0] * points[j][1]
  }
  return area / 2
}

function ringCentroid(points) {
  let area = 0
  let cx = 0
  let cy = 0
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const cross = points[j][0] * points[i][1] - points[i][0] * points[j][1]
    area += cross
    cx += (points[j][0] + points[i][0]) * cross
    cy += (points[j][1] + points[i][1]) * cross
  }
  area /= 2
  if (!area) {
    const x = points.reduce((sum, point) => sum + point[0], 0) / points.length
    const y = points.reduce((sum, point) => sum + point[1], 0) / points.length
    return [x, y]
  }
  return [cx / (6 * area), cy / (6 * area)]
}

function boundsOfRings(rings) {
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

function buildGeometry(data) {
  const arcs = decodeArcs(data.arcs)
  const byDivision = new Map()

  for (const division of data.divisions) {
    const rings = ringsForDivision(division, arcs)
    if (!rings.length) continue
    const bbox = boundsOfRings(rings)
    let area = 0
    let labelRing = null
    let labelArea = 0
    for (const ring of rings) {
      const ringSize = Math.abs(ringArea(ring))
      area += ringSize
      if (ringSize > labelArea) {
        labelArea = ringSize
        labelRing = ring
      }
    }
    const [lx, ly] = labelRing ? ringCentroid(labelRing) : [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2]
    byDivision.set(division, {
      bbox,
      area,
      label: [Math.round(lx), Math.round(ly)]
    })
  }

  return { arcs, byDivision }
}

function recomputeAll() {
  const data = state.data
  const { byDivision } = state.geom
  const countryByCode = new Map(data.countries.map((country) => [country.code, country]))

  for (const country of data.countries) country.divisions = []
  for (const division of data.divisions) {
    if (!countryByCode.has(division.country)) division.country = data.countries[0]?.code || ''
    countryByCode.get(division.country)?.divisions.push(division.id)
  }

  const arcCountries = Array.from({ length: data.arcs.length }, () => null)
  const arcDivisions = Array.from({ length: data.arcs.length }, () => null)

  for (const division of data.divisions) {
    for (const polygon of division.polygons || []) {
      for (const refs of polygon) {
        for (const ref of refs) {
          const index = ref < 0 ? ~ref : ref
          if (!arcCountries[index]) arcCountries[index] = new Set()
          if (!arcDivisions[index]) arcDivisions[index] = new Set()
          arcCountries[index].add(division.country)
          arcDivisions[index].add(division.id)
        }
      }
    }
  }

  const countryArcs = new Map(data.countries.map((country) => [country.code, new Set()]))
  const coast = []
  const borders = []

  for (let i = 0; i < data.arcs.length; i++) {
    const countries = arcCountries[i]
    const divisions = arcDivisions[i]
    if (!countries) continue

    if (countries.size >= 2) {
      borders.push(i)
      for (const code of countries) countryArcs.get(code)?.add(i)
    } else if (divisions && divisions.size === 1) {
      coast.push(i)
      const [code] = countries
      countryArcs.get(code)?.add(i)
    }
  }

  for (const country of data.countries) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    let area = 0
    let label = null
    let labelArea = 0

    for (const id of country.divisions) {
      const division = findDivision(id)
      const geom = division ? byDivision.get(division) : null
      if (!geom) continue
      minX = Math.min(minX, geom.bbox[0])
      minY = Math.min(minY, geom.bbox[1])
      maxX = Math.max(maxX, geom.bbox[2])
      maxY = Math.max(maxY, geom.bbox[3])
      area += geom.area
      if (geom.area > labelArea) {
        labelArea = geom.area
        label = geom.label
      }
    }

    country.bbox = Number.isFinite(minX) ? [minX, minY, maxX, maxY] : [0, 0, 0, 0]
    country.area = area
    country.label = label || [0, 0]
    country.arcs = [...(countryArcs.get(country.code) || [])].sort((a, b) => a - b)
  }

  data.coast = coast
  data.borders = borders
  data.meta.countries = data.countries.length
  data.meta.divisions = data.divisions.length
  data.meta.arcs = data.arcs.length
  data.meta.generated = new Date().toISOString().slice(0, 10)
}

function findCountry(code) {
  return state.data?.countries.find((country) => country.code === code)
}

function findDivision(id) {
  return state.data?.divisions.find((division) => division.id === id)
}

function nextDivisionId(code) {
  let max = 0
  for (const division of state.data.divisions) {
    if (!division.id.startsWith(code)) continue
    const suffix = division.id.slice(code.length)
    if (/^\d{3}$/.test(suffix)) max = Math.max(max, Number(suffix))
  }
  return `${code}${String(max + 1).padStart(3, '0')}`
}

function activeCountry() {
  return findCountry(state.activeCode)
}

function renderActive() {
  const country = activeCountry()
  if (!country) {
    activeCodeEl.textContent = '—'
    activeNameEl.textContent = '未选择'
    activeCount.textContent = '0 区'
    activeSwatch.style.background = '#5a5042'
    activeNameZhInput.value = ''
    activeNameEnInput.value = ''
    return
  }

  activeSwatch.style.background = country.color
  activeCodeEl.textContent = country.code
  activeNameEl.textContent = country.nameZh || country.name
  activeCount.textContent = `${country.divisions.length} 区`
  activeNameZhInput.value = country.nameZh
  activeNameEnInput.value = country.name
  activeColorInput.value = country.color
  mapActive.textContent = `当前：${country.nameZh || country.name}`
}

function renderCountryList() {
  countryList.innerHTML = ''
  if (!state.data) return

  const query = countrySearch.value.trim().toLowerCase()
  const countries = [...state.data.countries].sort((a, b) => {
    if (a.code === state.activeCode) return -1
    if (b.code === state.activeCode) return 1
    return (a.nameZh || a.name).localeCompare(b.nameZh || b.name, 'zh-CN')
  })

  const fragment = document.createDocumentFragment()
  let visible = 0
  for (const country of countries) {
    const searchText = `${country.code} ${country.name} ${country.nameZh}`.toLowerCase()
    if (query && !searchText.includes(query)) continue
    visible++

    const row = document.createElement('button')
    row.type = 'button'
    row.className = 'country-row'
    row.dataset.code = country.code
    row.classList.toggle('is-active', country.code === state.activeCode)

    const swatch = document.createElement('span')
    swatch.className = 'row-swatch'
    swatch.style.background = country.color

    const code = document.createElement('span')
    code.className = 'row-code'
    code.textContent = country.code

    const name = document.createElement('span')
    name.className = 'row-name'
    name.textContent = country.nameZh || country.name

    const count = document.createElement('span')
    count.className = 'row-count'
    count.textContent = `${country.divisions.length} 区`

    row.append(swatch, code, name, count)
    fragment.append(row)
  }

  if (!visible) {
    const empty = document.createElement('p')
    empty.className = 'status'
    empty.textContent = '没有匹配的国家。'
    countryList.append(empty)
  } else {
    countryList.append(fragment)
  }
  summary.textContent = `${state.data.countries.length} 国家`
}

function updateStats() {
  if (!state.data) return
  const { countries, divisions, arcs } = state.data.meta
  outputStats.textContent = `${countries} 国家 · ${divisions} 行政区`
  outputStats.title = `${arcs} 条边界弧段`
  setStatus(outputStatus, `完整地图数据 · ${countries} 国家 / ${divisions} 行政区 / ${arcs} 弧段。`, 'ok')
}

function renderAll() {
  renderActive()
  renderCountryList()
  updateStats()
  syncMapTitle()
}

function syncMapTitle() {
  if (!state.map || !state.data) return
  state.map.options.title = state.data.meta.title || ''
  state.map.options.subtitle = state.data.meta.titleEn || ''
  state.map.updateChrome()
}

function createMap() {
  if (state.map) {
    state.map.destroy()
    state.map = null
  }
  mapHost.innerHTML = ''

  state.map = new Hoi4Map(mapHost, {
    data: state.data,
    height: '680px',
    title: state.data.meta.title || '',
    subtitle: state.data.meta.titleEn || '',
    showDivisionBorders: true,
    showGraticule: false,
    showLegend: false,
    onDivisionClick: (division) => assignDivision(division.id)
  })

  mapOverlay.classList.add('is-hidden')
}

function assignDivision(id) {
  const country = activeCountry()
  if (!country) {
    showToast('先在左侧选择一个国家。')
    return
  }
  const division = findDivision(id)
  if (!division) return

  if (division.country === country.code) {
    showToast(`${division.nameZh} 已经在 ${country.nameZh}。`)
    return
  }

  const oldCountry = findCountry(division.country)
  const oldId = division.id
  if (oldCountry) {
    oldCountry.divisions = oldCountry.divisions.filter((item) => item !== oldId)
  }
  const newId = nextDivisionId(country.code)
  division.id = newId
  country.divisions.push(newId)
  division.country = country.code
  division.color = shadeColor(country.color, hashString(newId))

  recomputeAll()
  state.map?.setData(state.data)
  renderActive()
  renderCountryList()
  updateStats()
  syncMapTitle()
  showToast(`已将 ${division.nameZh} 划入 ${country.nameZh}。`)
}

function updateActiveName() {
  const country = activeCountry()
  if (!country) return
  country.nameZh = activeNameZhInput.value.trim() || country.name
  country.name = activeNameEnInput.value.trim() || country.nameZh
  activeNameEl.textContent = country.nameZh
  renderCountryList()
  state.map?.setData(state.data)
  syncMapTitle()
}

function updateActiveColor() {
  const country = activeCountry()
  if (!country) return
  country.color = activeColorInput.value
  activeSwatch.style.background = country.color
  for (const id of country.divisions) {
    const division = findDivision(id)
    if (division) division.color = shadeColor(country.color, hashString(id))
  }
  renderCountryList()
  state.map?.setData(state.data)
}

function addCountry(event) {
  event.preventDefault()
  const code = $('#new-code').value.trim().toUpperCase()
  const nameZh = $('#new-name-zh').value.trim()
  const name = $('#new-name-en').value.trim() || nameZh
  const color = $('#new-color').value

  if (!/^[A-Z0-9]{3}$/.test(code)) {
    setStatus(countryError, '国家代码必须是 3 位字母或数字。', 'error')
    return
  }
  if (findCountry(code)) {
    setStatus(countryError, `国家代码 ${code} 已存在。`, 'error')
    return
  }
  if (!nameZh) {
    setStatus(countryError, '请填写国家中文名。', 'error')
    return
  }

  state.data.countries.push({
    code,
    name,
    nameZh,
    color,
    label: [0, 0],
    bbox: [0, 0, 0, 0],
    area: 0,
    arcs: [],
    divisions: []
  })
  state.activeCode = code
  setStatus(countryError, `已添加 ${code} ${nameZh}，点击地图省份开始划入。`, 'ok')
  $('#new-code').value = ''
  $('#new-name-zh').value = ''
  $('#new-name-en').value = ''
  $('#new-color').value = '#9a7b4f'
  recomputeAll()
  renderAll()
  state.map?.setData(state.data)
}

function loadBase(id) {
  const base = BASES[id]
  if (!base) return
  state.baseId = id
  sourceBadge.textContent = '加载中'
  mapOverlay.classList.remove('is-hidden')
  mapOverlay.querySelector('p').textContent = `正在加载${base.label}底图…`
  setStatus(sourceStatus, `正在读取 ${base.label} 地图…`)

  fetch(base.url, { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    })
    .then((data) => applyData(data, base))
    .catch((error) => {
      sourceBadge.textContent = '失败'
      mapOverlay.querySelector('p').textContent = '底图加载失败'
      setStatus(sourceStatus, `加载失败：${error.message}。也可以选择本地 JSON。`, 'error')
    })
}

function applyData(data, base) {
  if (!data || !Array.isArray(data.countries) || !Array.isArray(data.divisions) || !Array.isArray(data.arcs)) {
    throw new Error('JSON 缺少 countries / divisions / arcs 字段')
  }

  state.data = data
  state.geom = buildGeometry(data)
  recomputeAll()

  const available = new Set(data.countries.map((country) => country.code))
  state.activeCode = available.has('CHN')
    ? 'CHN'
    : (EAST_ASIA.find((code) => available.has(code)) || data.countries[0]?.code || '')

  const file = base?.file || `${state.baseId}-edited.json`
  $('#filename').value = file
  $('#map-title').value = data.meta.title || '地图'
  $('#map-title-en').value = data.meta.titleEn || 'MAP'

  sourceBadge.textContent = '已加载'
  setStatus(sourceStatus, `${base?.label || '本地文件'} · ${data.meta.countries} 国家 / ${data.meta.divisions} 行政区 / ${data.meta.arcs} 弧段`, 'ok')
  createMap()
  renderAll()
}

function cleanJson(data) {
  return JSON.stringify(data, (key, value) => (key.startsWith('_') ? undefined : value), 2) + '\n'
}

function prepareExport() {
  state.data.meta.title = $('#map-title').value.trim() || '地图'
  state.data.meta.titleEn = $('#map-title-en').value.trim() || 'MAP'
  state.data.meta.countries = state.data.countries.length
  state.data.meta.divisions = state.data.divisions.length
  state.data.meta.arcs = state.data.arcs.length
  state.data.meta.generated = new Date().toISOString().slice(0, 10)
  return cleanJson(state.data)
}

function downloadJson() {
  if (!state.data) return
  const json = prepareExport()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = sanitizeFilename($('#filename').value)
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  showToast('地图 JSON 已开始下载。')
}

async function copyJson() {
  if (!state.data) return
  try {
    await navigator.clipboard.writeText(prepareExport())
    showToast('完整地图 JSON 已复制。')
  } catch {
    setStatus(outputStatus, '复制失败，请使用下载按钮。', 'error')
  }
}

function bindEvents() {
  $('#base-select').addEventListener('change', (event) => loadBase(event.target.value))
  $('#reload').addEventListener('click', () => loadBase(state.baseId))

  $('#file-input').addEventListener('change', async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    sourceBadge.textContent = '读取中'
    mapOverlay.classList.remove('is-hidden')
    mapOverlay.querySelector('p').textContent = '正在读取本地地图…'
    try {
      applyData(JSON.parse(await file.text()), { label: file.name, file: file.name })
    } catch (error) {
      sourceBadge.textContent = '失败'
      setStatus(sourceStatus, `本地文件读取失败：${error.message}`, 'error')
      mapOverlay.querySelector('p').textContent = '本地文件读取失败'
    }
  })

  countryList.addEventListener('click', (event) => {
    const row = event.target.closest('.country-row')
    if (!row) return
    state.activeCode = row.dataset.code
    renderActive()
    renderCountryList()
  })

  countrySearch.addEventListener('input', renderCountryList)
  $('#country-form').addEventListener('submit', addCountry)
  $('#new-code').addEventListener('input', (event) => {
    event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3)
  })

  activeNameZhInput.addEventListener('change', updateActiveName)
  activeNameEnInput.addEventListener('change', updateActiveName)
  activeColorInput.addEventListener('change', updateActiveColor)

  $('#map-title').addEventListener('input', () => {
    if (!state.data) return
    state.data.meta.title = $('#map-title').value
    syncMapTitle()
  })
  $('#map-title-en').addEventListener('input', () => {
    if (!state.data) return
    state.data.meta.titleEn = $('#map-title-en').value
    syncMapTitle()
  })

  downloadButton.addEventListener('click', downloadJson)
  copyButton.addEventListener('click', copyJson)
}

bindEvents()
loadBase('world')
