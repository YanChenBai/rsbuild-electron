import type { FnMap } from '@byc/tipc/type'
import type { Config } from '@prisma/client'

export interface WindowHandler extends FnMap {
  max: () => void
  min: () => void
  close: () => void
  ipv4: () => string
}

export interface ConfigHandler extends FnMap {
  setItem: (name: string, value: string) => Promise<void>
  getItem: (name: string) => Promise<string | undefined>
  removeItem: (name: string) => Promise<void>
  getAll: () => Promise<Config[]>
}
