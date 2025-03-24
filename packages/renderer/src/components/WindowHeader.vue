<script setup lang="ts">
import { invoke } from '@byc/tipc'
import { useWindHeader } from '../hooks/useWindHeader'

const { isMaximize } = useWindHeader()
const close = () => invoke.window.close()
const minimize = () => invoke.window.minimize()
function maximize() {
  if (isMaximize.value) {
    invoke.window.unmaximize()
  }
  else {
    invoke.window.maximize()
  }
}
</script>

<template>
  <div class="drag opacity-0 transition-all flex justify-between p1">
    <div class="flex items-center font-600 text-#ff5988 pl1">
      Rsbuild Electron
    </div>
    <div class="flex justify-end">
      <Button icon="pi pi-minus" variant="text" size="small" class="btn" @click="minimize" />
      <Button :icon="`pi pi-window-${isMaximize ? 'minimize' : 'maximize'}`" variant="text" size="small" class="btn" @click="maximize" />
      <Button icon="pi pi-times" variant="text" size="small" class="btn" @click="close" />
    </div>
  </div>
</template>

<style scoped>
[hover="true"] .drag {
  --uno: 'bg-white/10 opacity-100';
}

.btn {
  --uno: 'no-drag text-white size-6'
}
</style>
