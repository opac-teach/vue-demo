<template>
  <div :style="{ color: article.price < 100 ? 'green' : 'red' }">
    {{ article.name }}  {{ article.price }}€
  </div>
</template>

<script setup lang="ts">
defineProps<{
  article: { name: string; price: number }
}>()
</script>
