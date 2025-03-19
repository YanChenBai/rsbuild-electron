import type { ConfigHandler, WindowHandler } from '../types/tipc'

export {}

declare module '@byc/tipc' {
  interface TipcInvokeExpose {
    window: WindowHandler
    config: ConfigHandler
  }

  interface TipcListenerExpose {
  }
}
