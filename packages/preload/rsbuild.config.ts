import { resolve } from 'node:path'
import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  root: resolve(__dirname, '.'),
  plugins: [
  ],
  source: {
    entry: {
      index: './index.ts',
    },
  },
  output: {
    target: 'node',
    minify: false,
    distPath: {
      root: '../../out/preload',
    },
    cleanDistPath: true,
  },
  tools: {
    rspack: {
      externalsPresets: {
        electronPreload: true,
      },
      target: 'electron-preload',
    },
  },
})
