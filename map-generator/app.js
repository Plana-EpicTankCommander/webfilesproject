import '../src/map/hoi4-map-element.js'

const DATA_URL =
  'https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json'

const EAST_ASIA = ['CHN', 'HKG', 'JPN', 'KOR', 'MAC', 'MNG', 'PRK', 'TWN']
const NAME_ZH_OVERRIDES = { TWN: '台湾' }

const $ = (selector) => document.querySelector(selector)

const state = {
  world: null,
  selected: new Set(),
  json: '',
  filename: '',
  previewUrl: '',
  previewElement: null
}

const sourceBadge = $('#source-badge')
const sourceStatus = $('#source-status')
const generateStatus = $('#generate-status')
const countryList = $('#country-list')
const search = $('#search')
const selectedCount = $('#selected-count')
const previewStage = $('#preview-stage')
const previewMeta = $('#preview-meta')
const sizeLabel = $('#size-label')
const downloadButton = $('#download')
const copyButton = $('#copy')

function setStatus(element, text, type = '') {
  element.textContent = text
  element.classList.toggle('is-error', type === 'error')
  element.classList.toggle('is-ok', type === 'ok')
}

function countryNameZh(country) {
  return NAME_ZH_OVERRIDES[country.code] || country.nameZh || country.name
}

function updateSelectedCount() {
  const total = state.world?.countries.length || 0
  selectedCount.textContent = `${state.selected.size} / ${total}`
}

function renderCountryList() {
  countryList.innerHTML = ''
  if (!state.world) return

  const fragment = document.createDocumentFragment()
  const countries = [...state.world.countries].sort((a, b) => {
    const selectedDiff = Number(state.selected.has(b.code)) - Number(state.selected.has(a.code))
    if (selectedDiff) return selectedDiff
    return countryNameZh(a).localeCompare(countryNameZh(b), 'zh-CN')
  })

  for (const country of countries) {
    const label = document.createElement('label')
    label.className = 'country-row'
    label.dataset.code = country.code
    label.dataset.search = `${country.code} ${country.name} ${country.nameZh} ${countryNameZh(country)}`.toLowerCase()
    label.classList.toggle('is-selected', state.selected.has(country.code))

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.value = country.code
    checkbox.checked = state.selected.has(country.code)

    const code = document.createElement('span')
    code.className = 'country-code'
    code.textContent = country.code

    const name = document.createElement('span')
    name.className = 'country-name'
    name.textContent = countryNameZh(country)

    const count = document.createElement('span')
    count.className = 'country-count'
    count.textContent = String(country.divisions.length)

    label.append(checkbox, code, name, count)
    fragment.append(label)
  }

  countryList.append(fragment)
  updateSelectedCount()
  filterCountryList()
}

function filterCountryList() {
  const query = search.value.trim().toLowerCase()
  for (const row of countryList.querySelectorAll('.country-row')) {
    row.classList.toggle('is-hidden', Boolean(query) && !row.dataset.search.includes(query))
  }
}

function setSelected(codes) {
  state.selected = new Set(codes)
  renderCountryList()
}

function applyWorld(data) {
  if (!data || !Array.isArray(data.countries) || !Array.isArray(data.divisions) || !Array.isArray(data.arcs)) {
    throw new Error('JSON 缺少 countries / divisions / arcs 字段')
  }
  state.world = data
  state.json = ''
  if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)
  state.previewUrl = ''
  state.previewElement = null
  downloadButton.disabled = true
  copyButton.disabled = true
  sizeLabel.textContent = ''
  previewStage.innerHTML = `
    <div class="preview-placeholder">
      <span class="placeholder-mark">＋</span>
      <p>生成后会在这里预览地图</p>
    </div>
  `

  const available = new Set(data.countries.map((country) => country.code))
  const eastAsia = EAST_ASIA.filter((code) => available.has(code))
  state.selected = new Set(eastAsia.length ? eastAsia : data.countries.map((country) => country.code))

  renderCountryList()

  const meta = data.meta || {}
  const count = `${meta.countries ?? data.countries.length} 国家 / ${meta.divisions ?? data.divisions.length} 行政区`
  sourceBadge.textContent = '已加载'
  setStatus(sourceStatus, `${meta.title || '地图数据'} · ${count} · ${meta.width} × ${meta.height}`, 'ok')
  generate()
}

async function loadWorldFromUrl() {
  sourceBadge.textContent = '加载中'
  setStatus(sourceStatus, '正在从内容仓库读取 world-map.json…')
  try {
    const response = await fetch(DATA_URL, { cache: 'no-cache' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    applyWorld(data)
  } catch (error) {
    sourceBadge.textContent = '失败'
    setStatus(sourceStatus, `读取失败：${error.message}。可以点“选择本地 JSON”加载文件。`, 'error')
  }
}

function remapRef(ref, arcMap) {
  const index = arcMap.get(ref < 0 ? ~ref : ref)
  if (index === undefined) throw new Error(`引用了未保留的弧段 ${ref}`)
  return ref < 0 ? ~index : index
}

function remapList(list, arcMap) {
  return list.filter((index) => arcMap.has(index)).map((index) => arcMap.get(index))
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

function createRegion(world, codes, options) {
  const selectedCodes = new Set(codes)
  const countries = world.countries.filter((country) => selectedCodes.has(country.code))
  const divisions = world.divisions.filter((division) => selectedCodes.has(division.country))

  if (!countries.length) throw new Error('至少选择一个国家或地区')
  if (!divisions.length) throw new Error('所选国家没有一级行政区数据')

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const country of countries) {
    minX = Math.min(minX, country.bbox[0])
    minY = Math.min(minY, country.bbox[1])
    maxX = Math.max(maxX, country.bbox[2])
    maxY = Math.max(maxY, country.bbox[3])
  }

  const padding = Math.round(options.padding)
  const offsetX = minX - padding
  const offsetY = minY - padding
  const width = Math.round(maxX - minX + padding * 2)
  const height = Math.round(maxY - minY + padding * 2)

  const usedArcs = new Set()
  for (const division of divisions) {
    for (const polygon of division.polygons) {
      for (const ring of polygon) {
        for (const ref of ring) usedArcs.add(ref < 0 ? ~ref : ref)
      }
    }
  }

  const arcMap = new Map()
  const arcs = []
  for (let i = 0; i < world.arcs.length; i++) {
    if (!usedArcs.has(i)) continue
    const arc = world.arcs[i].slice()
    // Delta encoded: move only the absolute first point.
    arc[0] -= offsetX
    arc[1] -= offsetY
    arcMap.set(i, arcs.length)
    arcs.push(arc)
  }

  const outputDivisions = divisions.map((division) => ({
    ...division,
    polygons: division.polygons.map((polygon) =>
      polygon.map((ring) => ring.map((ref) => remapRef(ref, arcMap)))
    )
  }))

  const outputCountries = countries.map((country) => ({
    ...country,
    nameZh: NAME_ZH_OVERRIDES[country.code] || country.nameZh,
    label: [country.label[0] - offsetX, country.label[1] - offsetY],
    bbox: [
      country.bbox[0] - offsetX,
      country.bbox[1] - offsetY,
      country.bbox[2] - offsetX,
      country.bbox[3] - offsetY
    ],
    arcs: remapList(country.arcs || [], arcMap),
    divisions: [...country.divisions]
  }))

  const graticule = (world.graticule || []).map((arc) => {
    const shifted = arc.slice()
    shifted[0] -= offsetX
    shifted[1] -= offsetY
    return shifted
  })

  const output = {
    format: world.format || 'hoi4-map',
    version: world.version || 1,
    meta: {
      ...world.meta,
      title: options.title,
      titleEn: options.titleEn,
      width,
      height,
      countries: outputCountries.length,
      divisions: outputDivisions.length,
      arcs: arcs.length,
      generated: new Date().toISOString().slice(0, 10)
    },
    countries: outputCountries,
    divisions: outputDivisions,
    arcs,
    coast: remapList(world.coast || [], arcMap),
    borders: remapList(world.borders || [], arcMap),
    graticule
  }

  for (const division of outputDivisions) {
    for (const polygon of division.polygons) {
      for (const ring of polygon) {
        for (const ref of ring) {
          const index = ref < 0 ? ~ref : ref
          if (index < 0 || index >= arcs.length) throw new Error(`无效弧段引用 ${ref}`)
        }
      }
    }
  }

  return output
}

function sanitizeFilename(value) {
  let name = value.trim().replace(/[\\/:*?"<>|]/g, '-')
  if (!name) name = 'region-map.json'
  if (!name.toLowerCase().endsWith('.json')) name += '.json'
  return name
}

function renderPreview(json, meta) {
  if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)
  if (state.previewElement) state.previewElement.remove()

  previewStage.innerHTML = ''
  const blob = new Blob([json], { type: 'application/json' })
  state.previewUrl = URL.createObjectURL(blob)

  const element = document.createElement('hoi4-map')
  element.setAttribute('src', state.previewUrl)
  element.setAttribute('height', '500')
  element.setAttribute('show-graticule', 'false')
  previewStage.append(element)
  state.previewElement = element

  previewMeta.textContent = `${meta.countries} 国家 · ${meta.divisions} 行政区`
}

function generate() {
  if (!state.world) {
    setStatus(generateStatus, '地图数据还没有加载完成。', 'error')
    return
  }

  try {
    const codes = [...state.selected]
    if (!codes.length) throw new Error('至少选择一个国家或地区')

    const title = $('#title').value.trim() || '区域地图'
    const titleEn = $('#title-en').value.trim() || 'REGION MAP'
    const padding = clampNumber(Number($('#padding').value), 0, 5000)
    const filename = sanitizeFilename($('#filename').value)
    $('#filename').value = filename

    const region = createRegion(state.world, codes, { title, titleEn, padding })
    const json = JSON.stringify(region, null, 2) + '\n'
    state.json = json
    state.filename = filename

    downloadButton.disabled = false
    copyButton.disabled = false

    const bytes = new Blob([json]).size
    const size = bytes >= 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`
    sizeLabel.textContent = `${size} · ${region.meta.countries} 国家 / ${region.meta.divisions} 行政区 / ${region.meta.arcs} 弧段`
    setStatus(generateStatus, `已生成 ${filename}，${size}。`, 'ok')

    renderPreview(json, region.meta)
  } catch (error) {
    setStatus(generateStatus, `生成失败：${error.message}`, 'error')
  }
}

function downloadJson() {
  if (!state.json) return
  const blob = new Blob([state.json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = state.filename || 'region-map.json'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function copyJson() {
  if (!state.json) return
  try {
    await navigator.clipboard.writeText(state.json)
    setStatus(generateStatus, 'JSON 已复制到剪贴板。', 'ok')
  } catch {
    setStatus(generateStatus, '复制失败，请使用下载按钮。', 'error')
  }
}

function bindEvents() {
  $('#reload').addEventListener('click', loadWorldFromUrl)

  $('#file-input').addEventListener('change', async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    sourceBadge.textContent = '读取中'
    setStatus(sourceStatus, `正在读取 ${file.name}…`)
    try {
      const data = JSON.parse(await file.text())
      applyWorld(data)
      setStatus(sourceStatus, `已加载本地文件 ${file.name}`, 'ok')
    } catch (error) {
      sourceBadge.textContent = '失败'
      setStatus(sourceStatus, `本地文件读取失败：${error.message}`, 'error')
    }
  })

  countryList.addEventListener('change', (event) => {
    const checkbox = event.target.closest('input[type="checkbox"]')
    if (!checkbox) return
    if (checkbox.checked) state.selected.add(checkbox.value)
    else state.selected.delete(checkbox.value)
    checkbox.closest('.country-row')?.classList.toggle('is-selected', checkbox.checked)
    updateSelectedCount()
  })

  search.addEventListener('input', filterCountryList)

  $('#select-all').addEventListener('click', () => {
    if (!state.world) return
    setSelected(state.world.countries.map((country) => country.code))
  })

  $('#clear-all').addEventListener('click', () => setSelected([]))

  document.querySelectorAll('[data-preset="east-asia"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.world) return
      const available = new Set(state.world.countries.map((country) => country.code))
      setSelected(EAST_ASIA.filter((code) => available.has(code)))
    })
  })

  $('#generate').addEventListener('click', generate)
  downloadButton.addEventListener('click', downloadJson)
  copyButton.addEventListener('click', copyJson)

  for (const input of ['#title', '#title-en', '#padding', '#filename']) {
    $(input).addEventListener('keydown', (event) => {
      if (event.key === 'Enter') generate()
    })
  }
}

bindEvents()
loadWorldFromUrl()
