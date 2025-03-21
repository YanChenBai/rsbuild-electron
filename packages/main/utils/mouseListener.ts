import type { MouseListener } from '../../types/tipc'
import { useTipc } from '@byc/tipc/main'
import { BrowserWindow, screen } from 'electron'

import hmc from 'hmc-win32'
import { throttle } from 'lodash-es'

let currentWindowId: number | null = null

const mouseTipc = useTipc<any, MouseListener>('mouse', {})

function getMouseInWinPos(win: BrowserWindow) {
  const { x, y } = screen.getCursorScreenPoint()
  const [winX, winY] = win.getPosition()
  const [width, height] = win.getSize()

  const xInRange = x >= winX && x <= winX + width
  const yInRange = y >= winY && y <= winY + height

  if (xInRange && yInRange) {
    return {
      x: x - winX,
      y: y - winY,
    }
  }
  else {
    return null
  }
}

export function checkMouse(win: BrowserWindow) {
  const sender = mouseTipc.createSender(win)
  const isVisible = win.isVisible()
  const pos = getMouseInWinPos(win)

  if (!isVisible || !pos) {
    sender.onLeave()
    currentWindowId = null
    return
  }

  if (currentWindowId !== win.id) // 防止重复发送事件
    sender.onEnter()

  currentWindowId = win.id

  sender.onMove(pos)
}

export function mouseListener() {
  const handler = throttle(() => {
    for (const win of BrowserWindow.getAllWindows()) {
      checkMouse(win)
    }
  }, 60)

  hmc.mouseHook.start()
  hmc.mouseHook.on('move', handler)

  handler()

  const off = () => {
    hmc.mouseHook.off('move', 'on', handler)
    mouseTipc.off()
    hmc.mouseHook.stop()
  }

  return (
    off
  )
}
