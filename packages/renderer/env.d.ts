import type { ConfigHandler, ImageHandler, WindowHandler } from '../types/tipc'

export {}

declare module '@byc/tipc' {
  interface TipcInvokeExpose {
    window: WindowHandler
    config: ConfigHandler
    image: ImageHandler
  }

  interface TipcListenerExpose {
  }
}
