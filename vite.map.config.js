import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Standalone, dependency-free bundle of the <hoi4-map> custom element.
// Output: dist/map-plugin/hoi4-map.js
export default defineConfig({
  publicDir: false,
  build: {
    target: 'es2020',
    emptyOutDir: false,
    outDir: 'dist/map-plugin',
    lib: {
      entry: resolve(process.cwd(), 'src/map/hoi4-map-element.js'),
      formats: ['es'],
      fileName: () => 'hoi4-map.js'
    },
    rollupOptions: {
      output: {
        banner: '/*! hoi4-map · HOI4-style interactive atlas · Natural Earth 1:10m */'
      }
    }
  }
})
