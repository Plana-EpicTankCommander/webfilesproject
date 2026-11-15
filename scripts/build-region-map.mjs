#!/usr/bin/env node
/**
 * Build a regional subset from the generated world map.
 *
 * Example:
 *   node scripts/build-region-map.mjs east-asia
 *   -> .map-cache/east-asia-map.json
 *
 * The regional file keeps only the selected countries / divisions, shifts the
 * projected coordinates so the region starts at (0, 0), and updates the world
 * dimensions. The renderer can consume it exactly like world-map.json.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CACHE = path.join(ROOT, '.map-cache')
const WORLD = path.join(CACHE, 'world-map.json')

const REGIONS = {
  'east-asia': {
    title: '东亚',
    titleEn: 'EAST ASIA',
    // China, Hong Kong, Macau, Japan, South Korea, North Korea, Mongolia, Taiwan.
    countries: ['CHN', 'HKG', 'JPN', 'KOR', 'MAC', 'MNG', 'PRK', 'TWN'],
    padding: 900,
    nameZh: { TWN: '台湾' }
  }
}

function log(...args) {
  console.log('[region-map]', ...args)
}

function buildRegion(id) {
  const region = REGIONS[id]
  if (!region) throw new Error(`未知区域：${id}；可用：${Object.keys(REGIONS).join(', ')}`)
  if (!fs.existsSync(WORLD)) throw new Error(`缺少 ${path.relative(ROOT, WORLD)}，请先 npm run build:map-data`)

  const world = JSON.parse(fs.readFileSync(WORLD, 'utf8'))
  const selectedCodes = new Set(region.countries)
  const countries = world.countries.filter((country) => selectedCodes.has(country.code))
  const divisions = world.divisions.filter((division) => selectedCodes.has(division.country))

  if (countries.length !== region.countries.length) {
    const found = new Set(countries.map((country) => country.code))
    const missing = region.countries.filter((code) => !found.has(code))
    throw new Error(`世界数据缺少国家：${missing.join(', ')}`)
  }

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

  const padding = region.padding
  const offsetX = minX - padding
  const offsetY = minY - padding
  const width = maxX - minX + padding * 2
  const height = maxY - minY + padding * 2

  // Only keep arcs referenced by the selected divisions.
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
    // Arcs are delta encoded: only the first point has to move.
    arc[0] -= offsetX
    arc[1] -= offsetY
    arcMap.set(i, arcs.length)
    arcs.push(arc)
  }

  const remapRef = (ref) => {
    const index = arcMap.get(ref < 0 ? ~ref : ref)
    if (index === undefined) throw new Error(`区域 ${id} 引用了未保留的弧段 ${ref}`)
    return ref < 0 ? ~index : index
  }

  const remapList = (list) => list
    .filter((index) => arcMap.has(index))
    .map((index) => arcMap.get(index))

  const outputDivisions = divisions.map((division) => ({
    ...division,
    polygons: division.polygons.map((polygon) => polygon.map((ring) => ring.map(remapRef)))
  }))

  const outputCountries = countries.map((country) => ({
    ...country,
    nameZh: region.nameZh?.[country.code] || country.nameZh,
    label: [country.label[0] - offsetX, country.label[1] - offsetY],
    bbox: [
      country.bbox[0] - offsetX,
      country.bbox[1] - offsetY,
      country.bbox[2] - offsetX,
      country.bbox[3] - offsetY
    ],
    arcs: remapList(country.arcs),
    divisions: [...country.divisions]
  }))

  const graticule = world.graticule.map((arc) => {
    const shifted = arc.slice()
    shifted[0] -= offsetX
    shifted[1] -= offsetY
    return shifted
  })

  const output = {
    format: world.format,
    version: world.version,
    meta: {
      ...world.meta,
      title: region.title,
      titleEn: region.titleEn,
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
    coast: remapList(world.coast),
    borders: remapList(world.borders),
    graticule
  }

  // Local sanity checks before writing.
  const ids = new Set(outputDivisions.map((division) => division.id))
  if (ids.size !== outputDivisions.length) throw new Error('行政区编号重复')
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

  const out = path.join(CACHE, `${id}-map.json`)
  const json = JSON.stringify(output, null, 2) + '\n'
  fs.writeFileSync(out, json)
  log(`写入 ${path.relative(ROOT, out)}（${(Buffer.byteLength(json) / 1024 / 1024).toFixed(2)} MB）`)
  log(`${outputCountries.length} 国家 / ${outputDivisions.length} 行政区 / ${arcs.length} 弧段`)
  log(`范围 ${width} x ${height}`)
}

buildRegion(process.argv[2] || 'east-asia')
