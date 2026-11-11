import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    watch: {
      // 编辑器原子写入会短暂产生 .xxx.tmpdir 目录，Windows 下 watch 它会 EBUSY
      ignored: ['**/*.tmpdir/**', '**/.git/**']
    }
  }
})
