<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" :fill="fill ? 'currentColor' : 'none'" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.7 },
  fill: { type: Boolean, default: false }
})

// 全部用 path 描述，避免 v-html 在 SVG 命名空间下的兼容问题
const ICONS = {
  home: ['M3 10.6 12 3l9 7.6', 'M5.5 9.4V20h13V9.4', 'M10.2 20v-5.4h3.6V20'],
  book: [
    'M12 6.5C10.4 5 7.9 4.4 4 4.4v13.2c3.9 0 6.4.6 8 2.1 1.6-1.5 4.1-2.1 8-2.1V4.4c-3.9 0-6.4.6-8 2.1Z',
    'M12 6.5v13.2'
  ],
  image: ['M4 5.5h16v13H4z', 'M4 15.2l4.6-4.6 3.4 3.4 4.4-4.4 3.6 4', 'M9 9.2h.01'],
  music: ['M9 18V6.6l9.5-2V16', 'M6.5 18a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0', 'M16 16a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0'],
  pulse: ['M3 12h3.4l2.4-6 4 12 2.5-6H21'],
  sliders: ['M4 7h9', 'M17.5 7H21', 'M14.5 7a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 1 0-4.4 0', 'M4 17h3.5', 'M11.5 17H21', 'M8 17a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 1 0-4.4 0'],
  search: ['M5 11a6 6 0 1 0 12 0 6 6 0 1 0-12 0', 'M15.6 15.6 20 20'],
  'chevron-down': ['M6 9.5 12 15.5 18 9.5'],
  'chevron-right': ['M9.5 6 15.5 12 9.5 18'],
  'chevron-left': ['M14.5 6 8.5 12 14.5 18'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  sun: [
    'M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
    'M12 2.6v2.2', 'M12 19.2v2.2', 'M2.6 12h2.2', 'M19.2 12h2.2',
    'M5.3 5.3l1.6 1.6', 'M17.1 17.1l1.6 1.6', 'M18.7 5.3l-1.6 1.6', 'M6.9 17.1l-1.6 1.6'
  ],
  moon: ['M20 14.2A8.6 8.6 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z'],
  eye: [
    'M2.6 12S6.2 5.8 12 5.8 21.4 12 21.4 12 17.8 18.2 12 18.2 2.6 12 2.6 12Z',
    'M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0'
  ],
  play: ['M8.5 5.4 19 12 8.5 18.6Z'],
  pause: ['M9 5.4v13.2', 'M15 5.4v13.2'],
  prev: ['M18.5 6v12L8 12Z', 'M6 6v12'],
  next: ['M5.5 6v12L16 12Z', 'M18 6v12'],
  volume: ['M4 9.4h3.6L12 6v12l-4.4-3.4H4Z', 'M15.4 9.2a4 4 0 0 1 0 5.6', 'M17.9 6.9a7.4 7.4 0 0 1 0 10.2'],
  'volume-off': ['M4 9.4h3.6L12 6v12l-4.4-3.4H4Z', 'M16 9.6l5 4.8', 'M21 9.6l-5 4.8'],
  repeat: ['M4 10.4V9a3 3 0 0 1 3-3h10', 'M20 13.6V15a3 3 0 0 1-3 3H7', 'M14.4 3 17.4 6l-3 3', 'M9.6 21l-3-3 3-3'],
  'repeat-one': ['M4 10.4V9a3 3 0 0 1 3-3h10', 'M20 13.6V15a3 3 0 0 1-3 3H7', 'M14.4 3 17.4 6l-3 3', 'M9.6 21l-3-3 3-3', 'M11.4 10.6l1-.7V14'],
  shuffle: ['M3.5 6.2h3.4l9 11.6h4.6', 'M3.5 17.8h3.4l3.2-4.1', 'M14.2 6.2h6.3', 'M18 3.6 20.4 6 18 8.4', 'M18 15.6 20.4 18 18 20.4'],
  grid: ['M4 4.5h6.5v6.5H4z', 'M13.5 4.5H20v6.5h-6.5z', 'M4 13.5h6.5V20H4z', 'M13.5 13.5H20V20h-6.5z'],
  external: ['M14 4h6v6', 'M20 4l-9 9', 'M19 14v5.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5H11'],
  alert: ['M12 4.4 21 20H3Z', 'M12 9.8v4.2', 'M12 17.2h.01'],
  check: ['M5 12.4 9.6 17 19 7'],
  refresh: ['M20 12a8 8 0 1 1-2.4-5.7', 'M20.4 3.6v5h-5'],
  'arrow-right': ['M4 12h15', 'M14 7l5 5-5 5'],
  'arrow-left': ['M20 12H5', 'M10 7l-5 5 5 5'],
  'arrow-up': ['M12 20V5', 'M7 10l5-5 5 5'],
  list: ['M9 6h11', 'M9 12h11', 'M9 18h11', 'M4.6 6h.01', 'M4.6 12h.01', 'M4.6 18h.01'],
  file: ['M6 3.6h7.4L19 9.2v11.2H6Z', 'M13.2 3.6v5.8H19'],
  folder: ['M3.6 6.4h6l2 2.6h8.8v9.6H3.6Z'],
  github: [
    'M9 19.4c-4 1.5-4-2.4-6-2.9',
    'M15 21v-3.3c0-1 .1-1.4-.5-2 2.8-.3 4.5-1.4 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.4 4.9 5.3 5.2 5.3 5.2a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 4.1 10.8c0 3.6 1.7 4.7 4.5 5-.6.6-.6 1 -.5 2V21'
  ],
  clock: ['M3.6 12a8.4 8.4 0 1 0 16.8 0 8.4 8.4 0 1 0-16.8 0', 'M12 7.2V12l3.4 2'],
  zoom: ['M5 11a6 6 0 1 0 12 0 6 6 0 1 0-12 0', 'M15.6 15.6 20 20', 'M8.4 11h5.2', 'M11 8.4v5.2']
}

const paths = computed(() => ICONS[props.name] || [])
</script>

<style scoped>
.icon {
  display: block;
  flex-shrink: 0;
}
</style>
