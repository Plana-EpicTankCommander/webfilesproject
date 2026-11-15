/**
 * <hoi4-map> custom element.
 *
 * Usage:
 *   <script type="module" src="./map-plugin/hoi4-map.js"></script>
 *   <hoi4-map src="./map/world-map.json" height="560" focus="CHN"></hoi4-map>
 */
import { Hoi4Map, DEFAULT_MAP_SRC } from './hoi4-map.js'

function boolAttr(value, fallback = true) {
  if (value == null) return fallback
  return value !== 'false' && value !== '0'
}

export class Hoi4MapElement extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'height', 'width', 'title', 'subtitle', 'focus', 'zoom', 'fit', 'show-title', 'show-compass', 'show-graticule']
  }

  constructor() {
    super()
    this._map = null
    this._upgrading = false
  }

  connectedCallback() {
    if (this._map) return
    this.style.display = this.style.display || 'block'
    const src = this.getAttribute('src') || DEFAULT_MAP_SRC
    const zoom = Number(this.getAttribute('zoom'))
    this._map = new Hoi4Map(this, {
      src,
      height: this.getAttribute('height') || '520px',
      width: this.getAttribute('width') || '100%',
      title: this.getAttribute('title') || '',
      subtitle: this.getAttribute('subtitle') || '',
      focus: (this.getAttribute('focus') || '').toUpperCase(),
      zoom: Number.isFinite(zoom) ? zoom : 0,
      fit: this.getAttribute('fit') === 'cover' ? 'cover' : 'contain',
      showTitle: boolAttr(this.getAttribute('show-title')),
      showCompass: boolAttr(this.getAttribute('show-compass')),
      showGraticule: boolAttr(this.getAttribute('show-graticule'), false)
    })
  }

  disconnectedCallback() {
    this._map?.destroy()
    this._map = null
  }

  attributeChangedCallback(name, oldValue, value) {
    if (!this._map || oldValue === value) return
    const map = this._map
    if (name === 'src') {
      map.destroy()
      this._map = null
      this.connectedCallback()
      return
    }
    if (name === 'height') {
      map.setHeight(value || '520px')
      return
    }
    if (name === 'width') {
      this.style.width = value && /^\d+(\.\d+)?$/.test(value) ? `${value}%` : (value || '100%')
      map.resize()
      return
    }
    if (name === 'title') {
      map.options.title = value || ''
      map.plate.hidden = !map.options.showTitle || value === 'none'
      map.updateChrome()
      return
    }
    if (name === 'subtitle') {
      map.options.subtitle = value || ''
      map.updateChrome()
      return
    }
    if (name === 'focus' || name === 'zoom') {
      const zoom = Number(this.getAttribute('zoom'))
      map.setView({
        focus: (this.getAttribute('focus') || '').toUpperCase(),
        zoom: Number.isFinite(zoom) ? zoom : 0
      })
      return
    }
    if (name === 'fit') {
      map.options.fit = value === 'cover' ? 'cover' : 'contain'
      map.resize()
      return
    }
    if (name === 'show-title') {
      map.options.showTitle = boolAttr(value)
      map.plate.hidden = !map.options.showTitle || map.options.title === 'none'
      return
    }
    if (name === 'show-compass') {
      map.options.showCompass = boolAttr(value)
      const compass = map.root.querySelector('.hm-compass')
      if (compass) compass.hidden = !map.options.showCompass
      return
    }
    if (name === 'show-graticule') {
      map.options.showGraticule = boolAttr(value, false)
      map.invalidateQuality()
    }
  }
}

export function defineHoi4Map(tagName = 'hoi4-map') {
  if (typeof customElements === 'undefined') return false
  if (customElements.get(tagName)) return true
  customElements.define(tagName, Hoi4MapElement)
  return true
}

defineHoi4Map()

export { Hoi4Map }
