<template>
  <div ref="host" class="hoi4-map-host" :style="hostStyle" />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Hoi4Map } from '../../map/hoi4-map.js'
import { getMapUrl } from '../../services/contentSource'

const props = defineProps({
  src: { type: String, default: '' },
  height: { type: [String, Number], default: '540px' },
  width: { type: [String, Number], default: 100 },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  focus: { type: String, default: '' },
  zoom: { type: Number, default: 0 },
  fit: { type: String, default: 'contain' },
  showTitle: { type: Boolean, default: true },
  showCompass: { type: Boolean, default: true }
})

const host = ref(null)
let map = null

const defaultSrc = getMapUrl('world')

const hostStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}%` : props.width
}))

function createMap() {
  if (!host.value) return
  map = new Hoi4Map(host.value, {
    src: props.src || defaultSrc,
    height: props.height,
    width: props.width,
    title: props.title,
    subtitle: props.subtitle,
    focus: props.focus,
    zoom: props.zoom,
    fit: props.fit,
    showTitle: props.showTitle,
    showCompass: props.showCompass
  })
}

function destroyMap() {
  map?.destroy()
  map = null
}

onMounted(createMap)
onBeforeUnmount(destroyMap)

watch(() => props.height, (value) => {
  map?.setHeight(value)
})

watch(() => [props.focus, props.zoom], () => {
  map?.setView({ focus: props.focus, zoom: props.zoom })
})

watch(() => [props.title, props.subtitle], () => {
  if (!map) return
  map.options.title = props.title
  map.options.subtitle = props.subtitle
  map.plate.hidden = !props.showTitle || props.title === 'none'
  map.updateChrome()
})

watch(() => props.showTitle, (value) => {
  if (!map) return
  map.options.showTitle = value
  map.plate.hidden = !value || map.options.title === 'none'
})

defineExpose({ getMap: () => map })
</script>

<style scoped>
.hoi4-map-host {
  position: relative;
  margin: 0 auto;
  min-width: 0;
}
</style>
