import type { FnMap } from '@byc/tipc/type'
import type { CommonHandler, CommonListener } from './types'
import { useTipc } from '@byc/tipc/main'

import { app, BrowserWindow } from 'electron'

export interface TestHandler extends FnMap {
  max: () => void
}

function startApp() {
  app.whenReady()
    .then(() => {
      const tipc = useTipc<CommonHandler, CommonListener>('common', {
        max(_meta): void {
          throw new Error('Function not implemented.')
        },
        min(_meta): void {
          throw new Error('Function not implemented.')
        },
        close(_meta): void {
          throw new Error('Function not implemented.')
        },
        getWInId(_meta): number {
          throw new Error('Function not implemented.')
        },
      })

      tipc.init()

      useTipc<TestHandler>('test', {
        max(_meta): void {
          throw new Error('Function not implemented.')
        },
      })

      const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      })

      win.loadURL('http://localhost:4321')
    // win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
    })
}
startApp()
