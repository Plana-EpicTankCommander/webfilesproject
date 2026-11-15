const PALETTE = [
  '#9a7b4f', '#4b6a82', '#6b7748', '#8a4741', '#6a526e',
  '#3d6b65', '#85583a', '#4a5d43', '#a78a60', '#475372',
  '#774351', '#536975', '#6b6050'
]

const $ = (selector) => document.querySelector(selector)

const state = {
  countries: []
}

const countryList = $('#country-list')
const emptyState = $('#empty-state')
const summary = $('#summary')
const preview = $('#json-preview code')
const jsonStats = $('#json-stats')
const outputStatus = $('#output-status')
const downloadButton = $('#download')
const copyButton = $('#copy')
const countryError = $('#country-error')

function setStatus(element, text, type = '') {
  element.textContent = text
  element.classList.toggle('is-error', type === 'error')
  element.classList.toggle('is-ok', type === 'ok')
}

function makeColor() {
  return PALETTE[state.countries.length % PALETTE.length]
}

function nextDivisionId(country) {
  let max = 0
  for (const division of country.divisions) {
    const match = division.id.match(/(\d{3})$/)
    if (match) max = Math.max(max, Number(match[1]))
  }
  return `${country.code}${String(max + 1).padStart(3, '0')}`
}

function findCountry(code) {
  return state.countries.find((country) => country.code === code)
}

function totalDivisions() {
  return state.countries.reduce((sum, country) => sum + country.divisions.length, 0)
}

function sanitizeFilename(value) {
  let name = value.trim().replace(/[\\/:*?"<>|]/g, '-')
  if (!name) name = 'map-data.json'
  if (!name.toLowerCase().endsWith('.json')) name += '.json'
  return name
}

function buildData() {
  const divisions = state.countries.flatMap((country) =>
    country.divisions.map((division) => ({
      id: division.id,
      country: country.code,
      name: division.name,
      nameZh: division.nameZh,
      color: division.color
    }))
  )

  return {
    format: 'hoi4-map-data',
    version: 1,
    meta: {
      title: $('#map-title').value.trim() || '地图数据',
      titleEn: $('#map-title-en').value.trim() || 'MAP DATA',
      countries: state.countries.length,
      divisions: divisions.length,
      geometry: false,
      generated: new Date().toISOString().slice(0, 10)
    },
    countries: state.countries.map((country) => ({
      code: country.code,
      name: country.name,
      nameZh: country.nameZh,
      color: country.color,
      divisions: country.divisions.map((division) => division.id)
    })),
    divisions
  }
}

function refreshJson() {
  summary.textContent = `${state.countries.length} 国家 · ${totalDivisions()} 行政区`
  emptyState.hidden = state.countries.length > 0

  if (!state.countries.length) {
    preview.textContent = '// 添加国家后，这里会生成 JSON'
    jsonStats.textContent = '等待录入'
    outputStatus.textContent = ''
    downloadButton.disabled = true
    copyButton.disabled = true
    return
  }

  const data = buildData()
  const json = JSON.stringify(data, null, 2) + '\n'
  preview.textContent = json
  jsonStats.textContent = `${data.meta.countries} 国家 · ${data.meta.divisions} 行政区`

  const bytes = new Blob([json]).size
  const size = bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`
  setStatus(outputStatus, `预览已更新 · ${size}`, 'ok')
  downloadButton.disabled = false
  copyButton.disabled = false
}

function makeInput({ value, placeholder, field, code, id, className = 'division-input' }) {
  const input = document.createElement('input')
  input.type = 'text'
  input.value = value
  input.placeholder = placeholder || ''
  input.className = className
  input.dataset.field = field
  input.dataset.code = code
  if (id) input.dataset.id = id
  return input
}

function makeColorInput({ value, field, code, id, className = 'division-color' }) {
  const input = document.createElement('input')
  input.type = 'color'
  input.value = value
  input.className = className
  input.dataset.field = field
  input.dataset.code = code
  if (id) input.dataset.id = id
  return input
}

function renderCountry(country) {
  const card = document.createElement('article')
  card.className = 'country-card'
  card.dataset.code = country.code

  const head = document.createElement('div')
  head.className = 'country-head'

  const swatch = document.createElement('span')
  swatch.className = 'country-swatch'
  swatch.style.background = country.color

  const code = document.createElement('code')
  code.className = 'country-code'
  code.textContent = country.code

  const nameZh = makeInput({
    value: country.nameZh,
    placeholder: '中文名',
    field: 'country-nameZh',
    code: country.code,
    className: 'country-input'
  })
  const name = makeInput({
    value: country.name,
    placeholder: 'English name',
    field: 'country-name',
    code: country.code,
    className: 'country-input'
  })

  const deleteCountry = document.createElement('button')
  deleteCountry.type = 'button'
  deleteCountry.className = 'icon-button'
  deleteCountry.dataset.action = 'delete-country'
  deleteCountry.dataset.code = country.code
  deleteCountry.title = '删除国家'
  deleteCountry.setAttribute('aria-label', `删除 ${country.nameZh}`)
  deleteCountry.textContent = '×'

  head.append(swatch, code, nameZh, name, deleteCountry)

  const list = document.createElement('div')
  list.className = 'division-list'
  for (const division of country.divisions) {
    const row = document.createElement('div')
    row.className = 'division-row'

    const id = document.createElement('span')
    id.className = 'division-id'
    id.textContent = division.id

    const divisionZh = makeInput({
      value: division.nameZh,
      placeholder: '行政区中文名',
      field: 'division-nameZh',
      code: country.code,
      id: division.id
    })
    const divisionName = makeInput({
      value: division.name,
      placeholder: 'English name',
      field: 'division-name',
      code: country.code,
      id: division.id
    })
    const color = makeColorInput({
      value: division.color,
      field: 'division-color',
      code: country.code,
      id: division.id
    })
    const remove = document.createElement('button')
    remove.type = 'button'
    remove.className = 'icon-button division-delete'
    remove.dataset.action = 'delete-division'
    remove.dataset.code = country.code
    remove.dataset.id = division.id
    remove.title = '删除行政区'
    remove.setAttribute('aria-label', `删除 ${division.nameZh}`)
    remove.textContent = '×'

    row.append(id, divisionZh, divisionName, color, remove)
    list.append(row)
  }

  const addForm = document.createElement('form')
  addForm.className = 'add-division'
  addForm.dataset.code = country.code

  const addZh = document.createElement('input')
  addZh.type = 'text'
  addZh.placeholder = '行政区中文名'
  addZh.required = true
  addZh.dataset.role = 'division-name-zh'

  const addName = document.createElement('input')
  addName.type = 'text'
  addName.placeholder = 'English name'
  addName.dataset.role = 'division-name'

  const addColor = document.createElement('input')
  addColor.type = 'color'
  addColor.value = country.color
  addColor.dataset.role = 'division-color'

  const addButton = document.createElement('button')
  addButton.type = 'submit'
  addButton.className = 'btn btn-ghost'
  addButton.textContent = '添加行政区'

  addForm.append(addZh, addName, addColor, addButton)
  card.append(head, list, addForm)
  return card
}

function renderCountries() {
  countryList.innerHTML = ''
  const fragment = document.createDocumentFragment()
  for (const country of state.countries) fragment.append(renderCountry(country))
  countryList.append(fragment)
  refreshJson()
}

function addCountry(event) {
  event.preventDefault()

  const codeInput = $('#country-code')
  const code = codeInput.value.trim().toUpperCase()
  const nameZh = $('#country-name-zh').value.trim()
  const name = $('#country-name').value.trim() || nameZh
  const color = $('#country-color').value

  if (!/^[A-Z0-9]{3}$/.test(code)) {
    setStatus(countryError, '国家代码必须是 3 位字母或数字。', 'error')
    codeInput.focus()
    return
  }
  if (findCountry(code)) {
    setStatus(countryError, `国家代码 ${code} 已存在。`, 'error')
    codeInput.focus()
    return
  }
  if (!nameZh) {
    setStatus(countryError, '请填写国家中文名。', 'error')
    $('#country-name-zh').focus()
    return
  }

  state.countries.push({
    code,
    name,
    nameZh,
    color,
    divisions: []
  })

  setStatus(countryError, `已添加 ${code} ${nameZh}。`, 'ok')
  codeInput.value = ''
  $('#country-name-zh').value = ''
  $('#country-name').value = ''
  $('#country-color').value = makeColor()
  codeInput.focus()
  renderCountries()
}

function addDivision(form) {
  const country = findCountry(form.dataset.code)
  if (!country) return

  const nameZh = form.querySelector('[data-role="division-name-zh"]').value.trim()
  const name = form.querySelector('[data-role="division-name"]').value.trim() || nameZh
  const color = form.querySelector('[data-role="division-color"]').value

  if (!nameZh) {
    form.querySelector('[data-role="division-name-zh"]').focus()
    return
  }

  country.divisions.push({
    id: nextDivisionId(country),
    name,
    nameZh,
    color
  })

  form.querySelector('[data-role="division-name-zh"]').value = ''
  form.querySelector('[data-role="division-name"]').value = ''
  form.querySelector('[data-role="division-name-zh"]')?.focus()
  renderCountries()
}

function handleInlineInput(event) {
  const input = event.target
  const field = input.dataset.field
  if (!field) return

  const country = findCountry(input.dataset.code)
  if (!country) return

  if (field === 'country-nameZh') country.nameZh = input.value
  else if (field === 'country-name') country.name = input.value
  else if (field === 'country-color') {
    country.color = input.value
    const card = input.closest('.country-card')
    const swatch = card?.querySelector('.country-swatch')
    if (swatch) swatch.style.background = input.value
  } else if (field.startsWith('division-')) {
    const division = country.divisions.find((item) => item.id === input.dataset.id)
    if (!division) return
    if (field === 'division-nameZh') division.nameZh = input.value
    else if (field === 'division-name') division.name = input.value
    else if (field === 'division-color') division.color = input.value
  }

  refreshJson()
}

function handleCountryListClick(event) {
  const button = event.target.closest('[data-action]')
  if (!button) return

  const code = button.dataset.code
  const country = findCountry(code)
  if (!country) return

  if (button.dataset.action === 'delete-country') {
    state.countries = state.countries.filter((item) => item.code !== code)
    renderCountries()
  } else if (button.dataset.action === 'delete-division') {
    country.divisions = country.divisions.filter((item) => item.id !== button.dataset.id)
    renderCountries()
  }
}

function loadSample() {
  state.countries = [
    {
      code: 'CHN',
      name: 'China',
      nameZh: '中国',
      color: '#a77b45',
      divisions: [
        { id: 'CHN001', name: 'Beijing', nameZh: '北京', color: '#b08a52' },
        { id: 'CHN002', name: 'Shanghai', nameZh: '上海', color: '#9e7440' },
        { id: 'CHN003', name: 'Guangdong', nameZh: '广东', color: '#b3894f' }
      ]
    },
    {
      code: 'JPN',
      name: 'Japan',
      nameZh: '日本',
      color: '#8a4741',
      divisions: [
        { id: 'JPN001', name: 'Tokyo', nameZh: '东京', color: '#945049' },
        { id: 'JPN002', name: 'Osaka', nameZh: '大阪', color: '#7f403b' }
      ]
    },
    {
      code: 'MNG',
      name: 'Mongolia',
      nameZh: '蒙古',
      color: '#3d6b65',
      divisions: [
        { id: 'MNG001', name: 'Ulaanbaatar', nameZh: '乌兰巴托', color: '#467a73' }
      ]
    }
  ]
  $('#map-title').value = '东亚示例'
  $('#map-title-en').value = 'EAST ASIA SAMPLE'
  $('#filename').value = 'east-asia-sample.json'
  $('#country-code').value = ''
  $('#country-name-zh').value = ''
  $('#country-name').value = ''
  setStatus(countryError, '已载入示例。', 'ok')
  renderCountries()
}

function downloadJson() {
  if (!state.countries.length) return
  const json = preview.textContent
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = sanitizeFilename($('#filename').value)
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function copyJson() {
  if (!state.countries.length) return
  try {
    await navigator.clipboard.writeText(preview.textContent)
    setStatus(outputStatus, 'JSON 已复制到剪贴板。', 'ok')
  } catch {
    setStatus(outputStatus, '复制失败，请使用下载按钮。', 'error')
  }
}

function bindEvents() {
  $('#country-form').addEventListener('submit', addCountry)
  countryList.addEventListener('input', handleInlineInput)
  countryList.addEventListener('change', handleInlineInput)
  countryList.addEventListener('click', handleCountryListClick)
  countryList.addEventListener('submit', (event) => {
    const form = event.target.closest('.add-division')
    if (!form) return
    event.preventDefault()
    addDivision(form)
  })

  $('#load-sample').addEventListener('click', loadSample)
  $('#clear-all').addEventListener('click', () => {
    state.countries = []
    $('#filename').value = 'map-data.json'
    $('#country-code').value = ''
    $('#country-name-zh').value = ''
    $('#country-name').value = ''
    setStatus(countryError, '', '')
    renderCountries()
  })

  $('#map-title').addEventListener('input', refreshJson)
  $('#map-title-en').addEventListener('input', refreshJson)
  downloadButton.addEventListener('click', downloadJson)
  copyButton.addEventListener('click', copyJson)

  $('#country-code').addEventListener('input', (event) => {
    event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3)
  })
}

bindEvents()
renderCountries()
