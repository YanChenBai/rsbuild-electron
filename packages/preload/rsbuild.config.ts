import { resolve } from 'node:path'
import AutoRestart from '@byc/electron-auto-restart'
import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  root: resolve(__dirname, '.'),
  plugins: [
    AutoRestart({
      script: 'dev:electron',
    }),
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
