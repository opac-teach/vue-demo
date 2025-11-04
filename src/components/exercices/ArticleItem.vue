<template>
  <div :style="{ color: price > 100 ? 'red' : price < 100 ? 'green' : 'inherit' }">
    <h3>{{ name }}</h3>
    <p>{{ price }} €</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  price: number
}>()
</script>