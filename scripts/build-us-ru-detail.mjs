#!/usr/bin/env node
/**
 * Build the combined Admin-1/Admin-2 source used for the detailed world map.
 *
 * - Keep all existing divisions (including China's city-level units and HK).
 * - Replace USA and RUS Admin-1 with geoBoundaries Admin-2 features.
 * - US counties outside the 50 states + DC (e.g. Puerto Rico/territories) are
 *   dropped by testing their centroid against the existing US state polygons.
 *
 * The result is fed through mapshaper and build-map-data.mjs.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CACHE = path.join(ROOT, '.map-cache')
const BASE = path.join(CACHE, 'world-divisions-cities.geojson')
const USA = path.join(CACHE, 'gb-usa-adm2-simplified.geojson')
const RUS = path.join(CACHE, 'gb-rus-adm2-simplified.geojson')
const OUT = path.join(CACHE, 'world-divisions-usru.geojson')

const base = JSON.parse(fs.readFileSync(BASE, 'utf8'))
const usa = JSON.parse(fs.readFileSync(USA, 'utf8'))
const rus = JSON.parse(fs.readFileSync(RUS, 'utf8'))

const usStates = base.features.filter((feature) => feature.properties.adm0_a3 === 'USA')
const stateGeometries = usStates.map((feature) => feature.geometry)

function pointInRing(point, ring) {
  const [x, y] = point
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

function pointInPolygon(point, polygon) {
  if (!polygon.length || !pointInRing(point, polygon[0])) return false
  return !polygon.slice(1).some((hole) => pointInRing(point, hole))
}

function pointInGeometry(point, geometry) {
  if (geometry.type === 'Polygon') return pointInPolygon(point, geometry.coordinates)
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.some((polygon) => pointInPolygon(point, polygon))
  }
  return false
}

function geometryCenter(geometry) {
  let x = 0
  let y = 0
  let count = 0
  const collect = (value) => {
    if (typeof value[0] === 'number') {
      x += value[0]
      y += value[1]
      count++
    } else {
      for (const child of value) collect(child)
    }
  }
  if (geometry.type === 'Polygon') collect(geometry.coordinates)
  else if (geometry.type === 'MultiPolygon') collect(geometry.coordinates)
  return count ? [x / count, y / count] : [0, 0]
}

function geometryBBox(geometry) {
  const bbox = [Infinity, Infinity, -Infinity, -Infinity]
  const visit = (value) => {
    if (typeof value[0] === 'number') {
      bbox[0] = Math.min(bbox[0], value[0])
      bbox[1] = Math.min(bbox[1], value[1])
      bbox[2] = Math.max(bbox[2], value[0])
      bbox[3] = Math.max(bbox[3], value[1])
    } else {
      for (const child of value) visit(child)
    }
  }
  if (geometry.type === 'Polygon') visit(geometry.coordinates)
  else if (geometry.type === 'MultiPolygon') visit(geometry.coordinates)
  return bbox
}

const stateBBoxes = stateGeometries.map(geometryBBox)

function insideUsState(feature) {
  const center = geometryCenter(feature.geometry)
  if (stateGeometries.some((geometry) => pointInGeometry(center, geometry))) return true

  // Coastal counties can have a vertex-average center in the water. Keep them
  // when their bounding box overlaps a state, but still drop Puerto Rico and
  // the other territories (their boxes do not touch any of the 50 states).
  const bbox = geometryBBox(feature.geometry)
  return stateBBoxes.some((state) => (
    bbox[0] <= state[2] && bbox[2] >= state[0] &&
    bbox[1] <= state[3] && bbox[3] >= state[1]
  ))
}

const usCounties = usa.features.filter(insideUsState)
const ruRaions = rus.features.filter((feature) => feature.properties.shapeGroup === 'RUS')
const rest = base.features.filter((feature) => !['USA', 'RUS'].includes(feature.properties.adm0_a3))

function unwrapRing(ring) {
  const out = [[ring[0][0], ring[0][1]]]
  let previous = ring[0][0]
  for (let i = 1; i < ring.length; i++) {
    let lon = ring[i][0]
    while (lon - previous > 180) lon -= 360
    while (lon - previous < -180) lon += 360
    out.push([lon, ring[i][1]])
    previous = lon
  }
  if (out.length > 1) {
    const first = out[0]
    const last = out[out.length - 1]
    if (Math.abs(first[0] - last[0]) < 1e-9 && Math.abs(first[1] - last[1]) < 1e-9) {
      out.pop()
    }
  }
  return out
}

function clipPolygon(points, xmin, xmax) {
  let output = points
  for (const [inside, intersect] of [
    [(point) => point[0] >= xmin, (a, b) => {
      const t = (xmin - a[0]) / (b[0] - a[0])
      return [xmin, a[1] + t * (b[1] - a[1])]
    }],
    [(point) => point[0] <= xmax, (a, b) => {
      const t = (xmax - a[0]) / (b[0] - a[0])
      return [xmax, a[1] + t * (b[1] - a[1])]
    }]
  ]) {
    if (!output.length) break
    const next = []
    for (let i = 0; i < output.length; i++) {
      const current = output[i]
      const previous = output[(i + output.length - 1) % output.length]
      const currentInside = inside(current)
      const previousInside = inside(previous)
      if (currentInside) {
        if (!previousInside) next.push(intersect(previous, current))
        next.push(current)
      } else if (previousInside) {
        next.push(intersect(previous, current))
      }
    }
    output = next
  }
  return output
}

function clipDatelineFeature(feature) {
  let min = Infinity
  let max = -Infinity
  const visit = (value) => {
    if (typeof value[0] === 'number') {
      min = Math.min(min, value[0])
      max = Math.max(max, value[0])
    } else {
      for (const child of value) visit(child)
    }
  }
  visit(feature.geometry.coordinates)
  if (max - min <= 180) return feature

  const polygons = []
  for (const polygon of feature.geometry.coordinates) {
    const exterior = unwrapRing(polygon[0])
    const holes = polygon.slice(1).map(unwrapRing)
    for (const [xmin, xmax, shift] of [[-180, 180, 0], [180, 540, -360]]) {
      const clipped = clipPolygon(exterior, xmin, xmax)
      if (clipped.length < 3) continue
      const ring = clipped.map(([x, y]) => [x + shift, y])
      ring.push([ring[0][0], ring[0][1]])
      const clippedHoles = []
      for (const hole of holes) {
        const clippedHole = clipPolygon(hole, xmin, xmax)
        if (clippedHole.length >= 3) {
          const shifted = clippedHole.map(([x, y]) => [x + shift, y])
          shifted.push([shifted[0][0], shifted[0][1]])
          clippedHoles.push(shifted)
        }
      }
      polygons.push([ring, ...clippedHoles])
    }
  }

  return {
    ...feature,
    geometry: { type: 'MultiPolygon', coordinates: polygons }
  }
}

function polygonCenterX(polygon) {
  let x = 0
  let count = 0
  const visit = (value) => {
    if (typeof value[0] === 'number') {
      x += value[0]
      count++
    } else {
      for (const child of value) visit(child)
    }
  }
  visit(polygon[0])
  return count ? x / count : 0
}

function splitDatelineFeature(feature) {
  let min = Infinity
  let max = -Infinity
  const visit = (value) => {
    if (typeof value[0] === 'number') {
      min = Math.min(min, value[0])
      max = Math.max(max, value[0])
    } else {
      for (const child of value) visit(child)
    }
  }
  visit(feature.geometry.coordinates)
  if (max - min <= 180) return [feature]

  const polygons = feature.geometry.type === 'Polygon'
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates
  const west = []
  const east = []
  for (const polygon of polygons) {
    if (polygonCenterX(polygon) < 0) west.push(polygon)
    else east.push(polygon)
  }
  if (!west.length || !east.length) return [feature]

  const properties = feature.properties
  const baseCode = properties.adm1_code || properties.shapeID || properties.name || 'feature'
  return [
    {
      ...feature,
      properties: { ...properties, adm1_code: `${baseCode}-W` },
      geometry: { type: 'MultiPolygon', coordinates: west }
    },
    {
      ...feature,
      properties: { ...properties, adm1_code: `${baseCode}-E` },
      geometry: { type: 'MultiPolygon', coordinates: east }
    }
  ]
}

function asDivisions(feature, code, prefix) {
  feature = clipDatelineFeature(feature)
  return splitDatelineFeature(feature).map((part) => {
    const properties = part.properties
    const name = properties.shapeName || properties.name || 'Unnamed'
    return {
      type: 'Feature',
      properties: {
        adm0_a3: code,
        adm1_code: `${prefix}-${properties.shapeID || name}-${properties.adm1_code || ''}`,
        name,
        name_zh: name
      },
      geometry: part.geometry
    }
  })
}

const preparedRest = rest.flatMap((feature) => splitDatelineFeature(clipDatelineFeature(feature)))

const features = [
  ...preparedRest,
  ...usCounties.flatMap((feature) => asDivisions(feature, 'USA', 'USA')),
  ...ruRaions.flatMap((feature) => asDivisions(feature, 'RUS', 'RUS'))
]

fs.writeFileSync(OUT, `${JSON.stringify({ type: 'FeatureCollection', features })}\n`, 'utf8')
console.log({
  total: features.length,
  usCounties: usCounties.length,
  ruRaions: ruRaions.length,
  output: OUT
})
