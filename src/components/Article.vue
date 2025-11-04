<template>
  <div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.content }}</p>
    <p :class="(article.price > 100 ? 'text-red-500' : 'text-green-500') + ' font-bold'">
      Prix : {{ article.price }} €
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  article: {
    id: number
    title: string
    content: string
    price: number
  }
}>()
</script>
