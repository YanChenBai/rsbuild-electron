import { invoke, listener } from '@byc/tipc'
import { useHover } from '@byc/window-tipc/renderer'
import { onMounted, onUnmounted, ref } from 'vue'

export function useWindHeader() {
  const off: Array<() => any> = []
  const isMaximize = ref(false)

  onMounted(() => {
    invoke.window.isMaximized().then(res => isMaximize.value = res)
    off.push(
      useHover(),
      listener.window.onMaximize(() => isMaximize.value = true),
      listener.window.onUnmaximize(() => isMaximize.value = false),
    )
  })

  onUnmounted(() => off.forEach(fn => fn()))

  return {
    isMaximize,
  }
}
