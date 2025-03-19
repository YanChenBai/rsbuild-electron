import type { ConfigHandler, WindowHandler } from '../types/tipc'
import path from 'node:path'
import { useTipc } from '@byc/tipc/main'
import { app, BrowserWindow } from 'electron'
import HMC from 'hmc-win32'
import { prisma } from './utils/prisma'

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
  ipv4() {
    return HMC.getUserKeyList().join('|')
  },
})

const configTipc = useTipc<ConfigHandler>('config', {
  async setItem(_, name, value) {
    await prisma.config.upsert({
      where: {
        name,
      },
      update: {
        value,
      },
      create: {
        name,
        value,
      },
    })
  },
  async getItem(_, name) {
    const res = await prisma.config.findUnique({
      select: {
        value: true,
      },
      where: {
        name,
      },
    })

    return res?.value
  },
  async  removeItem(_, name) {
    await prisma.config.delete({
      where: {
        name,
      },
    })
  },
  async getAll() {
    const res = await prisma.config.findMany()
    return res
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
