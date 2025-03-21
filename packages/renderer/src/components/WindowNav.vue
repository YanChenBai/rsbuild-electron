<script setup lang="ts">
import { listener } from '@byc/tipc'
import { onMounted, onUnmounted, ref } from 'vue'

const isHover = ref(false)
const pos = ref({ x: 0, y: 0 })

let off = () => {}

onMounted(() => {
  // listener.mouse.onEnter(() => {
  //   isHover.value = true
  // })

  // listener.mouse.onLeave(() => {
  //   isHover.value = false
  // })

  const elements = new Set<HTMLDivElement>()

  off = listener.mouse.onMove((event) => {
    pos.value = event
    const pointElement = document.elementFromPoint(event.x, event.y)

    if (!pointElement)
      return

    const target = pointElement.closest('.electron-drag') as HTMLDivElement
    if (!target)
      return

    const { x, y } = event

    if (!elements.has(target)) {
      target.setAttribute('draggable', 'true')
      elements.add(target)
    }

    elements.forEach((element) => {
      if (element === target)
        return

      const top = element.offsetTop
      const left = element.offsetLeft
      const width = element.offsetWidth
      const height = element.offsetHeight

      const xInRange = left >= x && left <= x + width
      const yInRange = top >= y && top <= y + height

      if (!xInRange || !yInRange) {
        element.removeAttribute('draggable')
        elements.delete(element)
      }
    })
  })
})

onUnmounted(() => off())
</script>

<template>
  <div
    class="drag electron-drag"
    :class="[isHover ? 'bg-white/10' : 'bg-white/5']"
  >
    <Button icon="" variant="text" size="small" class="no-drag" />
    {{ pos }}
  </div>
  <div class="drag electron-drag pos-absolute right-0">
    45465465465
  </div>
</template>
