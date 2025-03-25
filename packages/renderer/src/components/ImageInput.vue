<script setup lang="ts">
import { invoke } from '@byc/tipc'
import { ref } from 'vue'

const imgPath = ref('')
const path = ref('')
function onShow() {
  invoke.image.readImage(path.value.replace(/\\/g, '\\\\'), 600)
    .then((buffer) => {
      const blob = new Blob([buffer], { type: 'image/webp' })
      imgPath.value = URL.createObjectURL(blob)
    })
}
</script>

<template>
  <div>
    <div>Image Path</div>
    <input v-model="path" type="text" class="w-100 h-10 bg-black/20 rounded-md px-2 outline-none">
    <button class="h-10 px-4" @click="onShow">
      Show
    </button>

    <img :src="imgPath">
  </div>
</template>

<style scoped>

</style>
