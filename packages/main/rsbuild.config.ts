import { resolve } from 'node:path'
import process from 'node:process'
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
      externals: process.env.DEV ? ['sharp', 'hmc-win32'] : ['sharp'],

    },
  },
})
