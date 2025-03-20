import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  base: './',
  outDir: '../../out/renderer',
  integrations: [
    vue(),
    unocss({
      injectReset: '@unocss/reset/tailwind-compat.css',
    }),
  ],
  build: {
    assetsPrefix: './',
  },
})
