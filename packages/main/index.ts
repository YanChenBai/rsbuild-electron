import type { ConfigHandler, ImageHandler, WindowHandler } from '../types/tipc'
import path from 'node:path'
import { useTipc } from '@byc/tipc/main'
import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'
import { getUserKeyList } from 'hmc-win32'
import sharp from 'sharp'
import { mouseListener } from './utils/mouseListener'
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
    return getUserKeyList().join('|')
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

const imageTipc = useTipc<ImageHandler>('image', {
  async readImage(_, path, size) {
    const buffer = await sharp(path)
      .resize(size)
      .webp()
      .toBuffer()
    return new Uint8Array(buffer).buffer
  },
})

function startApp() {
  app.whenReady()
    .then(async () => {
      windowTipc.init()
      configTipc.init()
      imageTipc.init()

      mouseListener()

      const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        type: 'toolbar',
        webPreferences: {
          sandbox: false,
          nodeIntegration: false,
          contextIsolation: true,
          preload: path.resolve(__dirname, '../preload/index.js'),
        },
      })

      win.setMenu(null)

      is.dev
        ? win.loadURL('http://localhost:4321')
        : win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
    })
}
startApp()
