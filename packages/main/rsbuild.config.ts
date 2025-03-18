import { resolve } from 'node:path'
import { defineConfig } from '@rsbuild/core'
import { electronRestart } from 'rsbuild-electron-restart'

export default defineConfig({
  root: resolve(__dirname, '.'),
  plugins: [
    electronRestart({
      script: 'dev:electron',
      root: resolve(__dirname, '../../'),
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
      root: '../../out/main',
    },
    cleanDistPath: true,
  },
  tools: {
    rspack: {
      externalsPresets: {
        electronMain: true,
      },
      target: 'electron-main',
    },
  },
})
