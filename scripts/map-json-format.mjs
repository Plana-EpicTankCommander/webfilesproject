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

// Compact human-readable layout used by world-map.json: country and division
// records stay on a few lines, while the large geometry arrays wrap.
export function formatMapJson(data) {
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
