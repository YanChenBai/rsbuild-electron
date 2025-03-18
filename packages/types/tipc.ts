import type { FnMap } from '@byc/tipc/type'
import type { Config } from '@prisma/client'

export interface WindowHandler extends FnMap {
  max: () => void
  min: () => void
  close: () => void
}

export interface ConfigHandler extends FnMap {
  setItem: (key: string, value: string) => Config
  getItem: (key: string) => Config
  removeItem: (key: string) => void
  clear: () => void
  getAll: () => Config[]
}
