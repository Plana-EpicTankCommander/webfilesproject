import fs from 'node:fs'
import path from 'node:path'
import { formatMapJson } from './map-json-format.mjs'

const DEFAULT_FILES = [
  path.resolve(process.cwd(), '..', 'sth_ineed', 'maps', 'world-map.json'),
  path.resolve(process.cwd(), '..', 'sth_ineed', 'maps', 'east-asia-map.json')
]

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

function pointKey(point) {
  return `${point[0]},${point[1]}`
}

function buildRings(arcs, retainedRefs) {
  const edges = retainedRefs.map((index) => {
    const points = decodeArc(arcs[index])
    if (points.length < 2) throw new Error(`Arc ${index} is too short`)
    return {
      index,
      a: pointKey(points[0]),
      b: pointKey(points[points.length - 1])
    }
  })

  const byPoint = new Map()
  for (const edge of edges) {
    for (const key of [edge.a, edge.b]) {
      if (!byPoint.has(key)) byPoint.set(key, [])
      byPoint.get(key).push(edge)
    }
  }

  const used = new Set()
  const rings = []
  for (const first of edges) {
    if (used.has(first.index)) continue
    const startKey = first.a
    const ring = []
    let edge = first
    let currentKey = startKey
    let guard = 0

    while (guard++ <= edges.length) {
      used.add(edge.index)
      const forward = edge.a === currentKey
      const nextKey = forward ? edge.b : edge.a
      ring.push(forward ? edge.index : ~edge.index)
      currentKey = nextKey
      if (currentKey === startKey) break

      const candidates = byPoint.get(currentKey) || []
      const next = candidates.find((candidate) => !used.has(candidate.index))
      if (!next) throw new Error(`Open boundary at ${currentKey}`)
      edge = next
    }

    if (currentKey !== startKey) throw new Error('Boundary did not close')
    if (ring.length >= 1) rings.push(ring)
  }

  if (used.size !== edges.length) {
    throw new Error(`Only ${used.size}/${edges.length} boundary arcs were used`)
  }
  return rings
}

function mergeHongKong(data) {
  const hk = data.divisions.filter((division) => division.country === 'HKG')
  if (hk.length <= 1) return { changed: false, before: hk.length, after: hk.length, rings: 0 }

  const arcCounts = new Map()
  for (const division of hk) {
    for (const polygon of division.polygons || []) {
      for (const refs of polygon) {
        for (const ref of refs) {
          const index = ref < 0 ? ~ref : ref
          arcCounts.set(index, (arcCounts.get(index) || 0) + 1)
        }
      }
    }
  }

  // Arcs used by two or more HKG districts are internal and disappear when the
  // districts become one region. Boundary arcs remain once.
  const retained = [...arcCounts.keys()]
    .filter((index) => arcCounts.get(index) === 1)
    .sort((a, b) => a - b)
  const rings = buildRings(data.arcs, retained)

  const merged = {
    ...hk[0],
    id: 'HKG001',
    name: 'Hong Kong',
    nameZh: '香港',
    color: data.countries.find((country) => country.code === 'HKG')?.color || hk[0].color,
    polygons: rings.map((refs) => [refs])
  }

  data.divisions = data.divisions.filter((division) => division.country !== 'HKG')
  data.divisions.push(merged)
  data.divisions.sort((a, b) => a.id.localeCompare(b.id))

  const country = data.countries.find((entry) => entry.code === 'HKG')
  if (country) country.divisions = ['HKG001']
  data.meta.divisions = data.divisions.length

  return {
    changed: true,
    before: hk.length,
    after: 1,
    rings: rings.length,
    retainedArcs: retained.length,
    removedArcs: arcCounts.size - retained.length
  }
}

const dryRun = process.argv.includes('--dry-run')
const files = process.argv.slice(2).filter((arg) => arg !== '--dry-run')
const targets = files.length ? files : DEFAULT_FILES

for (const file of targets) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  const result = mergeHongKong(data)
  console.log(`${path.basename(file)}: ${result.before} -> ${result.after} divisions, ${result.rings} rings, ${result.retainedArcs} boundary arcs, ${result.removedArcs} internal arcs removed`)
  if (!dryRun && result.changed) {
    const output = path.basename(file) === 'world-map.json'
      ? formatMapJson(data)
      : `${JSON.stringify(data, null, 2)}\n`
    fs.writeFileSync(file, output, 'utf8')
    console.log(`  wrote ${file}`)
  }
}
