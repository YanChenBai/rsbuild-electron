import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  base: './',
  outDir: '../../out/renderer',
  integrations: [
    vue(),
  ],
  build: {
    assetsPrefix: './',
  },
})
