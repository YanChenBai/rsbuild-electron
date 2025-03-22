import type { FnMap } from '@byc/tipc/type'
import type { Config } from '@prisma/client'

export interface ConfigHandler extends FnMap {
  setItem: (name: string, value: string) => Promise<void>
  getItem: (name: string) => Promise<string | undefined>
  removeItem: (name: string) => Promise<void>
  getAll: () => Promise<Config[]>
}

export interface ImageHandler extends FnMap {
  readImage: (path: string, size?: number) => Promise<ArrayBuffer>
}
