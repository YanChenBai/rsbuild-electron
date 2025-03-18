import type { WindowHandler } from '../types/tipc'

export {}

declare module '@byc/tipc' {
  interface TipcInvokeExpose {
    window: WindowHandler
  }

  interface TipcListenerExpose {
  }
}
