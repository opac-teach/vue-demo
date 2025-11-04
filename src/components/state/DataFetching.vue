<template>
  <div>
    <p>{{ lorem }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const lorem = ref<string>('loading...')

onMounted(async () => {
  try {
  const data = await fetch('https://api.sampleapis.com/rickandmorty/characters')
  const text = await data.text()
  lorem.value = text
  } catch(error) {
    lorem.value = error.message
  }
})
</script>
