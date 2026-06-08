import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/portfolio-designer/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kudaUgodno: resolve(__dirname, 'projects/kuda-ugodno.html'),
      },
    },
  },
})
