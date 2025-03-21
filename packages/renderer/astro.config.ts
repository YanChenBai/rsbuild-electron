import vue from '@astrojs/vue'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import Components from 'unplugin-vue-components/vite'

// https://astro.build/config
export default defineConfig({
  base: './',
  outDir: '../../out/renderer',
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app.ts',
    }),
    unocss({
      injectReset: '@unocss/reset/tailwind-compat.css',
    }),
  ],
  build: {
    assetsPrefix: './',
  },
  vite: {
    plugins: [
      Components({
        resolvers: [
          PrimeVueResolver(),
        ],
      }),
    ],
  },
})
