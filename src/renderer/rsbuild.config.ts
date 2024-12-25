import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [pluginVue()],
  html: {
    template: './index.html',
  },
  output: {
    assetPrefix: './',
    distPath: {
      root: '../../out/renderer',
    },
    cleanDistPath: true,
  },
})
