import path from 'node:path'
import { app, BrowserWindow } from 'electron'

function startApp() {
  app.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    win.loadURL('http://localhost:3000')
    // win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
  })
}
startApp()
