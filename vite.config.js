import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        mapDemo: resolve(process.cwd(), 'map-demo.html'),
        mapGenerator: resolve(process.cwd(), 'map-generator/index.html')
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      // 编辑器原子写入会短暂产生 .xxx.tmpdir 目录，Windows 下 watch 它会 EBUSY
      ignored: ['**/*.tmpdir/**', '**/.git/**']
    }
  }
})
