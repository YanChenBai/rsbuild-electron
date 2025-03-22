<script setup lang="ts">
import { useHover } from '@byc/window-tipc/renderer'
import { onMounted, onUnmounted } from 'vue'

let off = () => {}

onMounted(() => {
  off = useHover()
})

onUnmounted(() => off())
</script>

<template>
  <div class="drag bg-white/5">
    <Button icon="" variant="text" size="small" class="no-drag" />
  </div>
  <div class="drag electron-drag pos-absolute right-0" />
</template>

<style scoped>
[hover="true"] .drag {
  --uno:'bg-white/10'
}
</style>
