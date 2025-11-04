<template>
  <div :style="{ color: price > 100 ? 'red' : price < 100 ? 'green' : 'inherit' }">
    <h3 class="font-semibold">{{ name }}</h3>
    <p>{{ price }} €</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  price: number
}>()
</script>
