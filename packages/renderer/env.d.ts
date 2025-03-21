import type { WindowHandler, WindowListener } from '@byc/window-tipc/type'
import type { ConfigHandler, ImageHandler } from '../types/tipc'

export {}

declare module '@byc/tipc' {
  interface TipcInvokeExpose {
    window: WindowHandler
    config: ConfigHandler
    image: ImageHandler
  }

  interface TipcListenerExpose {
    window: WindowListener
  }
}
