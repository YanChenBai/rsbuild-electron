import type { FnMap } from '@byc/tipc/type'

export interface CommonHandler extends FnMap {
  max: () => void
  min: () => void
  close: () => void
  getWInId: () => number
}

export interface CommonListener extends FnMap {
  onMax: () => void
  onMin: () => void
  onClose: () => void
  onWinId: (id: number) => void
}
