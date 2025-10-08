<template>
  <div>
    <p>{{ lorem }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const lorem = ref<string>('loading...')

onMounted(async () => {
  const data = await fetch('https://lorem-api.com/api/lorem')
  const text = await data.text()
  lorem.value = text
})
</script>
