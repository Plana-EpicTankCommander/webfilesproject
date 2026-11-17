#!/usr/bin/env node
/**
 * Build the single-file map dataset used by the HOI4-style map plugin.
 *
 * Input : Natural Earth 1:10m Admin-1 States/Provinces (GeoJSON)
 * Output: .map-cache/world-map.json (copy to sth_ineed/maps/world-map.json)
 *
 * The output is a compact, projected, quantized topology:
 *   - `arcs` are shared boundaries, delta encoded
 *   - divisions reference arcs (signed, negative = reversed)
 *   - only coast / international-border arcs are marked for stroke
 *
 * Run: npm run build:map-data
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CACHE = path.join(ROOT, '.map-cache')
const SOURCE = process.env.MAP_ADMIN1
  ? path.resolve(process.env.MAP_ADMIN1)
  : path.join(CACHE, 'ne_10m_admin_1_states_provinces.geojson')
const COUNTRIES = path.join(CACHE, 'ne_10m_admin_0_countries.geojson')
const SIMPLIFIED = process.env.MAP_SIMPLIFIED
  ? path.resolve(process.env.MAP_SIMPLIFIED)
  : path.join(CACHE, 'admin1.simplified.topojson')
const OUT = path.resolve(process.env.MAP_OUT || path.join(CACHE, 'world-map.json'))

const SIMPLIFY = process.env.MAP_SIMPLIFY || '40%'
const WORLD_WIDTH = 100000
const SOURCE_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson'
const COUNTRY_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson'

// HOI4-ish political palette: 13 families x 4 tones.
// Natural Earth's MAPCOLOR13 is designed so neighbouring countries get different
// families; MAPCOLOR9 supplies the base tone. Divisions get a neighbouring tone.
const FAMILIES = [
  ['#3f5a70', '#4b6a82', '#577b95', '#648ca8'],
  ['#5c673c', '#6b7748', '#7a8754', '#899761'],
  ['#816741', '#947851', '#a78a60', '#b99c70'],
  ['#783d38', '#8a4741', '#9c554e', '#ae645b'],
  ['#5a455d', '#6a526e', '#7a5f7f', '#8a6d90'],
  ['#335b56', '#3d6b65', '#487b74', '#538b83'],
  ['#744a30', '#85583a', '#966546', '#a77353'],
  ['#3f4f39', '#4a5d43', '#566b4e', '#62795a'],
  ['#87744f', '#9a865e', '#ad986e', '#c0aa80'],
  ['#3c4662', '#475372', '#525f83', '#5e6c95'],
  ['#663945', '#774351', '#884e5e', '#995a6c'],
  ['#485b66', '#536975', '#5f7785', '#6b8595'],
  ['#5c5244', '#6b6050', '#7a6e5c', '#897c69']
]

const NAME_ZH_OVERRIDES = {
  CHN: '中国', USA: '美国', RUS: '俄罗斯', GBR: '英国', FRA: '法国', DEU: '德国',
  JPN: '日本', IND: '印度', BRA: '巴西', CAN: '加拿大', AUS: '澳大利亚',
  KOR: '韩国', PRK: '朝鲜', ITA: '意大利', ESP: '西班牙', PRT: '葡萄牙',
  NLD: '荷兰', BEL: '比利时', CHE: '瑞士', AUT: '奥地利', POL: '波兰',
  UKR: '乌克兰', TUR: '土耳其', SAU: '沙特阿拉伯', IRN: '伊朗', IRQ: '伊拉克',
  ISR: '以色列', EGY: '埃及', ZAF: '南非', MEX: '墨西哥', ARG: '阿根廷',
  CHL: '智利', IDN: '印度尼西亚', THA: '泰国', VNM: '越南', PHL: '菲律宾',
  MYS: '马来西亚', SGP: '新加坡', NZL: '新西兰', SWE: '瑞典', NOR: '挪威',
  FIN: '芬兰', DNK: '丹麦', GRC: '希腊', CZE: '捷克', HUN: '匈牙利',
  ROU: '罗马尼亚', BGR: '保加利亚', SRB: '塞尔维亚', HRV: '克罗地亚',
  IRL: '爱尔兰', ISL: '冰岛', COL: '哥伦比亚', PER: '秘鲁', VEN: '委内瑞拉',
  CUB: '古巴', KAZ: '哈萨克斯坦', PAK: '巴基斯坦', BGD: '孟加拉国',
  NPL: '尼泊尔', LKA: '斯里兰卡', MMR: '缅甸', KHM: '柬埔寨', LAO: '老挝',
  MNG: '蒙古', AFG: '阿富汗', SYR: '叙利亚', JOR: '约旦', ARE: '阿联酋',
  QAT: '卡塔尔', KWT: '科威特', OMN: '阿曼', YEM: '也门',
  ETH: '埃塞俄比亚', KEN: '肯尼亚', NGA: '尼日利亚', GHA: '加纳',
  MAR: '摩洛哥', DZA: '阿尔及利亚', TUN: '突尼斯', LBY: '利比亚',
  SDN: '苏丹', SSD: '南苏丹', COD: '刚果（金）', COG: '刚果（布）',
  AGO: '安哥拉', MOZ: '莫桑比克', TZA: '坦桑尼亚', MDG: '马达加斯加'
}

function log(...args) {
  console.log('[map-data]', ...args)
}

// ---------------------------------------------------------------------------
// Human-readable JSON writer
//
// A generic JSON.stringify(..., null, 2) would put every one of the ~700k
// quantized coordinates on its own line. This hybrid writer keeps the metadata,
// country and division records readable while wrapping the numeric geometry
// every few values per line.
// ---------------------------------------------------------------------------

function indent(level) {
  return '  '.repeat(level)
}

function formatNumberArray(values, level, perLine = 12) {
  if (!values.length) return '[]'
  if (values.length <= 4) return `[${values.join(', ')}]`
  const pad = indent(level)
  const inner = indent(level + 1)
  const lines = []
  for (let i = 0; i < values.length; i += perLine) {
    lines.push(inner + values.slice(i, i + perLine).join(', '))
  }
  return `[\n${lines.join(',\n')}\n${pad}]`
}

function formatStringArray(values, level, perLine = 8) {
  if (!values.length) return '[]'
  if (values.length <= 4) return `[${values.map((value) => JSON.stringify(value)).join(', ')}]`
  const pad = indent(level)
  const inner = indent(level + 1)
  const lines = []
  for (let i = 0; i < values.length; i += perLine) {
    lines.push(inner + values.slice(i, i + perLine).map((value) => JSON.stringify(value)).join(', '))
  }
  return `[\n${lines.join(',\n')}\n${pad}]`
}

function inlineArray(values) {
  if (!values.length) return '[]'
  return `[${values.join(', ')}]`
}

function inlineNested(value) {
  if (!Array.isArray(value)) return JSON.stringify(value)
  return `[${value.map((item) => inlineNested(item)).join(', ')}]`
}

function formatObject(fields, level = 0) {
  const pad = indent(level)
  const inner = indent(level + 1)
  const lines = fields.map(([key, value]) => `${inner}${JSON.stringify(key)}: ${value}`)
  return `{\n${lines.join(',\n')}\n${pad}}`
}

function formatMapJson(data) {
  const metaFields = Object.entries(data.meta).map(([key, value]) => [key, JSON.stringify(value)])
  const countryFields = (country) => [
    ['code', JSON.stringify(country.code)],
    ['name', JSON.stringify(country.name)],
    ['nameZh', JSON.stringify(country.nameZh)],
    ['color', JSON.stringify(country.color)],
    ['label', inlineArray(country.label)],
    ['bbox', inlineArray(country.bbox)],
    ['area', String(country.area)],
    ['arcs', formatNumberArray(country.arcs, 3, 14)],
    ['divisions', formatStringArray(country.divisions, 3, 8)]
  ]
  const divisionFields = (division) => [
    ['id', JSON.stringify(division.id)],
    ['country', JSON.stringify(division.country)],
    ['name', JSON.stringify(division.name)],
    ['nameZh', JSON.stringify(division.nameZh)],
    ['color', JSON.stringify(division.color)],
    ['polygons', inlineNested(division.polygons)]
  ]

  const countries = `[\n${data.countries
    .map((country) => indent(2) + formatObject(countryFields(country), 2))
    .join(',\n')}\n${indent(1)}]`
  const divisions = `[\n${data.divisions
    .map((division) => indent(2) + formatObject(divisionFields(division), 2))
    .join(',\n')}\n${indent(1)}]`
  const arcs = `[\n${data.arcs
    .map((arc) => indent(2) + formatNumberArray(arc, 2, 12))
    .join(',\n')}\n${indent(1)}]`
  const graticule = `[\n${data.graticule
    .map((arc) => indent(2) + formatNumberArray(arc, 2, 12))
    .join(',\n')}\n${indent(1)}]`
  const countryFills = data.countryFills && Object.keys(data.countryFills).length
    ? `,\n  "countryFills": ${JSON.stringify(data.countryFills)}`
    : ''

  return `{
  "format": ${JSON.stringify(data.format)},
  "version": ${data.version},
  "meta": ${formatObject(metaFields, 1)},
  "countries": ${countries},
  "divisions": ${divisions},
  "arcs": ${arcs},
  "coast": ${formatNumberArray(data.coast, 1, 20)},
  "borders": ${formatNumberArray(data.borders, 1, 20)},
  "graticule": ${graticule}${countryFills}
}
`
}

function ensureSource() {
  fs.mkdirSync(CACHE, { recursive: true })
  for (const [file, url] of [[SOURCE, SOURCE_URL], [COUNTRIES, COUNTRY_URL]]) {
    if (!fs.existsSync(file) || fs.statSync(file).size < 1_000_000) {
      throw new Error(`缺少数据源 ${file}\n请先下载：\n  curl -L --ssl-no-revoke -o "${file}" "${url}"`)
    }
  }
}

function simplify() {
  if (process.env.MAP_SKIP_SIMPLIFY === '1') {
    log('使用外部 TopoJSON，跳过 mapshaper 简化')
    return
  }
  if (fs.existsSync(SIMPLIFIED) && !process.env.MAP_FORCE) {
    log('复用已简化的 TopoJSON（设置 MAP_FORCE=1 可重新生成）')
    return
  }
  const bin = path.join(ROOT, 'node_modules', 'mapshaper', 'bin', 'mapshaper')
  if (!fs.existsSync(bin)) throw new Error('缺少 mapshaper，请先 npm install')
  log(`mapshaper 简化 ${SIMPLIFY} …`)
  execFileSync(process.execPath, [
    bin,
    SOURCE,
    '-simplify', SIMPLIFY,
    'keep-shapes',
    '-filter-fields', 'adm1_code,name,name_zh,adm0_a3',
    '-o', SIMPLIFIED,
    'format=topojson'
  ], { stdio: 'inherit' })
}

function decodeTopoArcs(topo) {
  const tr = topo.transform
  return topo.arcs.map((arc) => {
    let x = 0
    let y = 0
    const out = []
    for (const p of arc) {
      if (tr) {
        x += p[0]
        y += p[1]
        out.push([x * tr.scale[0] + tr.translate[0], y * tr.scale[1] + tr.translate[1]])
      } else {
        out.push([p[0], p[1]])
      }
    }
    return out
  })
}

function polygonsOf(geometry) {
  if (geometry.type === 'Polygon') return [geometry.arcs]
  if (geometry.type === 'MultiPolygon') return geometry.arcs
  return []
}

function hashString(value) {
  let h = 2166136261
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function validCode(code) {
  return typeof code === 'string' && /^[A-Z0-9]{3}$/.test(code)
}

function build() {
  ensureSource()
  simplify()

  log('读取 TopoJSON / 国家元数据 …')
  const topo = JSON.parse(fs.readFileSync(SIMPLIFIED, 'utf8'))
  const admin0 = JSON.parse(fs.readFileSync(COUNTRIES, 'utf8'))
  const layer = Object.values(topo.objects)[0]
  const geoms = layer.geometries

  const admin0ByCode = new Map()
  for (const feature of admin0.features) {
    const p = feature.properties
    if (!admin0ByCode.has(p.ADM0_A3)) admin0ByCode.set(p.ADM0_A3, p)
  }

  let allArcs = decodeTopoArcs(topo)
  log(`边界弧段 ${allArcs.length}，原始节点 ${allArcs.reduce((n, a) => n + a.length, 0)}`)

  // ---- 1. Collect divisions, drop Antarctica ---------------------------------
  const rawDivisions = []
  for (const geometry of geoms) {
    const p = geometry.properties || {}
    const code = p.adm0_a3
    if (!validCode(code) || code === 'ATA') continue
    const polygons = polygonsOf(geometry)
    if (!polygons.length) continue
    rawDivisions.push({
      code,
      name: p.name || p.adm1_code || 'Unnamed',
      nameZh: p.name_zh || p.name || p.adm1_code || '未命名',
      sourceId: p.adm1_code || '',
      polygons
    })
  }

  // Drop arcs that only belonged to filtered features (Antarctica). Keeping
  // them would bloat the file and make the projected bounds disagree with the
  // actually rendered geometry.
  const usedArcSet = new Set()
  for (const raw of rawDivisions) {
    for (const polygon of raw.polygons) {
      for (const ring of polygon) {
        for (const ref of ring) usedArcSet.add(ref < 0 ? ~ref : ref)
      }
    }
  }
  const arcMap = new Map()
  const compactArcs = []
  for (let i = 0; i < allArcs.length; i++) {
    if (!usedArcSet.has(i)) continue
    arcMap.set(i, compactArcs.length)
    compactArcs.push(allArcs[i])
  }
  for (const raw of rawDivisions) {
    raw.polygons = raw.polygons.map((polygon) => polygon.map((ring) => ring.map((ref) => {
      const oldIndex = ref < 0 ? ~ref : ref
      const newIndex = arcMap.get(oldIndex)
      return ref < 0 ? ~newIndex : newIndex
    })))
  }
  allArcs = compactArcs
  log(`清理未引用弧段后 ${allArcs.length} 条`)

  rawDivisions.sort((a, b) => (
    a.code.localeCompare(b.code) ||
    a.name.localeCompare(b.name, 'en') ||
    a.sourceId.localeCompare(b.sourceId)
  ))

  const divisions = []
  const countries = new Map()
  const divisionByCountry = new Map()

  for (const raw of rawDivisions) {
    if (!countries.has(raw.code)) {
      const meta = admin0ByCode.get(raw.code) || {}
      const name = meta.NAME_EN || meta.NAME || raw.code
      countries.set(raw.code, {
        code: raw.code,
        name,
        nameZh: NAME_ZH_OVERRIDES[raw.code] || meta.NAME_ZH || name,
        mapColor13: Number(meta.MAPCOLOR13) || 1,
        mapColor9: Number(meta.MAPCOLOR9) || 1,
        labelLonLat: Number.isFinite(Number(meta.LABEL_X)) && Number.isFinite(Number(meta.LABEL_Y))
          ? [Number(meta.LABEL_X), Number(meta.LABEL_Y)]
          : null,
        divisions: []
      })
      divisionByCountry.set(raw.code, [])
    }
    const list = divisionByCountry.get(raw.code)
    const id = `${raw.code}${String(list.length + 1).padStart(3, '0')}`
    const division = {
      id,
      country: raw.code,
      name: raw.name,
      nameZh: raw.nameZh,
      sourceId: raw.sourceId,
      polygons: raw.polygons
    }
    list.push(division)
    divisions.push(division)
  }

  for (const country of countries.values()) {
    country.divisions = (divisionByCountry.get(country.code) || []).map((d) => d.id)
  }

  log(`国家 ${countries.size}，一级行政区 ${divisions.length}`)

  // ---- 2. Arc usage: coast / international border / internal -----------------
  const arcCountries = Array.from({ length: allArcs.length }, () => null)
  const arcDivisions = Array.from({ length: allArcs.length }, () => null)

  for (const division of divisions) {
    for (const polygon of division.polygons) {
      for (const ring of polygon) {
        for (const ref of ring) {
          const ai = ref < 0 ? ~ref : ref
          if (!allArcs[ai]) continue
          if (!arcCountries[ai]) arcCountries[ai] = new Set()
          if (!arcDivisions[ai]) arcDivisions[ai] = new Set()
          arcCountries[ai].add(division.country)
          arcDivisions[ai].add(division.id)
        }
      }
    }
  }

  const coast = []
  const borders = []
  const internal = []
  for (let i = 0; i < allArcs.length; i++) {
    const cs = arcCountries[i]
    const ds = arcDivisions[i]
    if (!cs) continue
    if (cs.size >= 2) borders.push(i)
    else if (ds && ds.size === 1) coast.push(i)
    else internal.push(i)
  }

  // Country adjacency, used only to avoid two neighbours sharing the exact same fill.
  const neighbours = new Map()
  for (const country of countries.values()) neighbours.set(country.code, new Set())
  for (const ai of borders) {
    const list = [...arcCountries[ai]]
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        neighbours.get(list[i])?.add(list[j])
        neighbours.get(list[j])?.add(list[i])
      }
    }
  }

  // ---- 3. Projection ---------------------------------------------------------
  log('投影 Natural Earth …')
  const fitArcSet = new Set()
  for (const division of divisions) {
    for (const polygon of division.polygons) {
      for (const ring of polygon) {
        for (const ref of ring) {
          fitArcSet.add(ref < 0 ? ~ref : ref)
        }
      }
    }
  }
  const fitPoints = []
  for (const ai of fitArcSet) {
    for (const point of allArcs[ai]) fitPoints.push(point)
  }
  const fitObject = { type: 'MultiPoint', coordinates: fitPoints }
  const projection = geoNaturalEarth1().fitWidth(WORLD_WIDTH, fitObject)
  const [[px0, py0], [px1, py1]] = geoPath(projection).bounds(fitObject)
  const projectedWidth = px1 - px0
  const projectedHeight = py1 - py0
  const worldHeight = Math.round((projectedHeight / projectedWidth) * WORLD_WIDTH)
  log(`投影尺寸 ${WORLD_WIDTH} x ${worldHeight}`)

  function projectPoint(lonLat) {
    const projected = projection(lonLat)
    if (!projected) return null
    return [
      Math.round(((projected[0] - px0) / projectedWidth) * WORLD_WIDTH),
      Math.round(((projected[1] - py0) / projectedWidth) * WORLD_WIDTH)
    ]
  }

  // The political divisions come from different sources (DataV China cities,
  // geoBoundaries Russia). Their outer borders can leave a thin sea-coloured
  // gap. Country-level fills from one shared source (Natural Earth Admin-0)
  // sit underneath the divisions and close those gaps.
  const countryFills = {}
  for (const feature of admin0.features) {
    const code = feature.properties.ADM0_A3
    if (!['CHN', 'RUS'].includes(code)) continue
    const geometry = feature.geometry
    const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
    const projectedPolygons = []
    for (const polygon of polygons) {
      const rings = []
      for (const ring of polygon) {
        const projected = []
        let lastX = null
        let lastY = null
        for (const lonLat of ring) {
          const point = projectPoint(lonLat)
          if (!point) continue
          const [x, y] = point
          if (x === lastX && y === lastY) continue
          projected.push([x, y])
          lastX = x
          lastY = y
        }
        if (projected.length > 1) {
          const first = projected[0]
          const last = projected[projected.length - 1]
          if (first[0] === last[0] && first[1] === last[1]) projected.pop()
        }
        if (projected.length >= 3) rings.push(projected)
      }
      if (rings.length) projectedPolygons.push(rings)
    }
    if (projectedPolygons.length) countryFills[code] = projectedPolygons
  }

  // Project shared arcs once, then strip duplicate quantized points.
  const quantizedArcs = allArcs.map((arc) => {
    const out = []
    let lastX = null
    let lastY = null
    for (const lonLat of arc) {
      const point = projectPoint(lonLat)
      if (!point) continue
      const [x, y] = point
      if (x === lastX && y === lastY) continue
      out.push([x, y])
      lastX = x
      lastY = y
    }
    return out
  })

  function encodeDelta(points) {
    const out = []
    let prevX = 0
    let prevY = 0
    for (const [x, y] of points) {
      out.push(x - prevX, y - prevY)
      prevX = x
      prevY = y
    }
    return out
  }

  const arcs = quantizedArcs.map(encodeDelta)

  // ---- 4. Country geometry, bbox, area, label --------------------------------
  function ringPoints(refs) {
    const points = []
    for (const ref of refs) {
      const ai = ref < 0 ? ~ref : ref
      const arc = quantizedArcs[ai]
      if (!arc || !arc.length) continue
      if (ref < 0) {
        for (let i = arc.length - 1; i >= 0; i--) points.push(arc[i])
      } else {
        for (let i = 0; i < arc.length; i++) points.push(arc[i])
      }
    }
    // TopoJSON rings repeat the first point at the end of the last arc.
    if (points.length > 1) {
      const first = points[0]
      const last = points[points.length - 1]
      if (first[0] === last[0] && first[1] === last[1]) points.pop()
    }
    return points
  }

  function ringArea(points) {
    let area = 0
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      area += points[j][0] * points[i][1] - points[i][0] * points[j][1]
    }
    return area / 2
  }

  for (const country of countries.values()) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    let area = 0
    let largestRing = null
    let largestArea = 0

    for (const divisionId of country.divisions) {
      const division = divisions.find((d) => d.id === divisionId)
      if (!division) continue
      for (const polygon of division.polygons) {
        for (const ringRefs of polygon) {
          const points = ringPoints(ringRefs)
          if (points.length < 3) continue
          for (const [x, y] of points) {
            if (x < minX) minX = x
            if (y < minY) minY = y
            if (x > maxX) maxX = x
            if (y > maxY) maxY = y
          }
          const a = Math.abs(ringArea(points))
          area += a
          if (a > largestArea) {
            largestArea = a
            largestRing = points
          }
        }
      }
    }

    if (!Number.isFinite(minX)) {
      console.warn('[map-data] 无有效几何，稍后用标记点补位：', country.code, country.name)
      country.bbox = [0, 0, 0, 0]
      country.area = 0
      country.label = (country.labelLonLat && projectPoint(country.labelLonLat)) || [0, 0]
      continue
    }
    country.bbox = [minX, minY, maxX, maxY]
    country.area = area

    let label = null
    if (country.labelLonLat) {
      label = projectPoint(country.labelLonLat)
      if (label && (label[0] < minX || label[0] > maxX || label[1] < minY || label[1] > maxY)) {
        label = null
      }
    }
    if (!label && largestRing) {
      // Centroid of the largest ring is a decent fallback for label placement.
      let cx = 0
      let cy = 0
      for (const [x, y] of largestRing) {
        cx += x
        cy += y
      }
      label = [Math.round(cx / largestRing.length), Math.round(cy / largestRing.length)]
    }
    country.label = label || [(minX + maxX) / 2, (minY + maxY) / 2]
  }

  // ---- 5. Boundary arcs per country ------------------------------------------
  const countryBoundary = new Map()
  for (const country of countries.values()) countryBoundary.set(country.code, new Set())
  for (let i = 0; i < allArcs.length; i++) {
    const cs = arcCountries[i]
    if (!cs || cs.size === 0) continue
    // Internal arc (shared only by divisions of one country) is not a national border.
    if (cs.size === 1 && arcDivisions[i] && arcDivisions[i].size > 1) continue
    for (const code of cs) countryBoundary.get(code)?.add(i)
  }

  // ---- 6. Palette + greedy neighbour de-duplication --------------------------
  const ordered = [...countries.values()].sort((a, b) => (
    (neighbours.get(b.code)?.size || 0) - (neighbours.get(a.code)?.size || 0) ||
    b.area - a.area
  ))
  const assignedColors = new Map()
  for (const country of ordered) {
    const family = Math.min(13, Math.max(1, country.mapColor13)) - 1
    const preferredTone = (Math.max(1, country.mapColor9) - 1) % 4
    const neighbourColors = new Set()
    for (const code of neighbours.get(country.code) || []) {
      const color = assignedColors.get(code)
      if (color) neighbourColors.add(color)
    }

    const candidates = []
    for (let t = 0; t < 4; t++) candidates.push({ family, tone: (preferredTone + t) % 4 })
    for (let f = 0; f < FAMILIES.length; f++) {
      if (f === family) continue
      for (let t = 0; t < 4; t++) candidates.push({ family: f, tone: t })
    }
    const picked = candidates.find(({ family: f, tone }) => !neighbourColors.has(f * 4 + tone)) || candidates[0]

    country.family = picked.family
    country.baseTone = picked.tone
    country.color = FAMILIES[picked.family][picked.tone]
    assignedColors.set(country.code, picked.family * 4 + picked.tone)
  }

  for (const division of divisions) {
    const country = countries.get(division.country)
    const spread = (hashString(division.id) % 3) - 1
    const tone = Math.max(0, Math.min(3, country.baseTone + spread))
    division.color = FAMILIES[country.family][tone]
    division.tone = tone
  }

  // ---- 7. Graticule ----------------------------------------------------------
  log('生成经纬网 …')
  const graticule = []
  const graticuleGeo = geoGraticule10()
  for (const line of graticuleGeo.coordinates) {
    let current = []
    const flush = () => {
      if (current.length >= 2) {
        const encoded = encodeDelta(current)
        if (encoded.length >= 4) graticule.push(encoded)
      }
      current = []
    }
    for (const lonLat of line) {
      const point = projectPoint(lonLat)
      if (!point) {
        flush()
        continue
      }
      const last = current[current.length - 1]
      if (!last || last[0] !== point[0] || last[1] !== point[1]) current.push(point)
    }
    flush()
  }

  // ---- 8. Assemble -----------------------------------------------------------
  const outCountries = [...countries.values()]
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((country) => ({
      code: country.code,
      name: country.name,
      nameZh: country.nameZh,
      color: country.color,
      label: country.label.map(Math.round),
      bbox: country.bbox.map(Math.round),
      area: Math.round(country.area),
      arcs: [...countryBoundary.get(country.code)].sort((a, b) => a - b),
      divisions: country.divisions
    }))

  const outDivisions = divisions.map((division) => ({
    id: division.id,
    country: division.country,
    name: division.name,
    nameZh: division.nameZh,
    color: division.color,
    polygons: division.polygons
  }))

  // A handful of microstates collapse to less than one pixel after topology
  // simplification. Give them a tiny, deliberately exaggerated marker polygon so
  // they still exist on the map at high zoom (Vatican City is the only one here).
  for (const country of outCountries) {
    if (country.area > 0) continue
    const division = outDivisions.find((d) => d.id === country.divisions[0])
    if (!division) continue
    const [x, y] = country.label
    const radius = 14
    const ai = arcs.length
    arcs.push(encodeDelta([
      [x, y - radius],
      [x + radius, y],
      [x, y + radius],
      [x - radius, y]
    ]))
    division.polygons = [[[ai]]]
    division.color = country.color
    country.arcs = [ai]
    country.bbox = [x - radius, y - radius, x + radius, y + radius]
    country.area = radius * radius * 2
    coast.push(ai)
  }

  const result = {
    format: 'hoi4-map',
    version: 1,
    meta: {
      title: '世界政治地图',
      titleEn: 'WORLD POLITICAL MAP',
      source: 'Natural Earth 1:10m Admin-1 + DataV China city boundaries',
      sourceUrl: 'https://www.naturalearthdata.com/',
      license: 'Natural Earth public domain; China city boundaries from DataV',
      detailCountries: ['CHN'],
      projection: 'Natural Earth',
      graticuleStep: 10,
      width: WORLD_WIDTH,
      height: worldHeight,
      countries: outCountries.length,
      divisions: outDivisions.length,
      arcs: arcs.length,
      generated: new Date().toISOString().slice(0, 10)
    },
    countries: outCountries,
    divisions: outDivisions,
    arcs,
    coast: coast.sort((a, b) => a - b),
    borders: borders.sort((a, b) => a - b),
    graticule,
    countryFills
  }

  // ---- 9. Validation ---------------------------------------------------------
  const ids = new Set()
  for (const division of outDivisions) {
    if (ids.has(division.id)) throw new Error(`重复行政区编号 ${division.id}`)
    ids.add(division.id)
    if (!outCountries.some((c) => c.code === division.country)) {
      throw new Error(`行政区 ${division.id} 的国家不存在`)
    }
    for (const polygon of division.polygons) {
      for (const ring of polygon) {
        for (const ref of ring) {
          const ai = ref < 0 ? ~ref : ref
          if (ai < 0 || ai >= arcs.length) throw new Error(`行政区 ${division.id} 引用了不存在的弧段 ${ref}`)
        }
      }
    }
  }
  for (const country of outCountries) {
    if (!country.divisions.length) throw new Error(`国家 ${country.code} 没有行政区`)
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  const json = formatMapJson(result)
  fs.writeFileSync(OUT, json)
  const mb = (Buffer.byteLength(json) / 1024 / 1024).toFixed(2)
  log(`写入 ${path.relative(ROOT, OUT)}（${mb} MB）`)
  log('发布到内容仓库：复制到 sth_ineed/maps/world-map.json 后提交')
  log(`coast ${coast.length} / border ${borders.length} / internal ${internal.length} / graticule ${graticule.length}`)
  log('完成')
}

build()
