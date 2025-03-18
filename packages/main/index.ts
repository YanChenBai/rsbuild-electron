import type { ConfigHandler, WindowHandler } from '../types/tipc'
import path from 'node:path'
import { useTipc } from '@byc/tipc/main'
import { app, BrowserWindow } from 'electron'

const windowTipc = useTipc<WindowHandler>('window', {
  max(meta) {
    meta.win?.maximize()
  },
  min(meta) {
    meta.win?.minimize()
  },
  close(meta) {
    meta.win?.close()
  },
})

const configTipc = useTipc<ConfigHandler>('config', {
  setItem(_, _key) {
    throw new Error('Function not implemented.')
  },
  getItem(_, _key) {
    throw new Error('Function not implemented.')
  },
  removeItem(_, _key) {
    throw new Error('Function not implemented.')
  },
  clear(_): void {
    throw new Error('Function not implemented.')
  },
  getAll(_) {
    throw new Error('Function not implemented.')
  },
})

function startApp() {
  app.whenReady()
    .then(() => {
      windowTipc.init()
      configTipc.init()

      const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          sandbox: false,
          nodeIntegration: false,
          contextIsolation: true,
          preload: path.resolve(__dirname, '../preload/index.js'),
        },
      })

      win.loadURL('http://localhost:4321')
    // win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
    })
}
startApp()
