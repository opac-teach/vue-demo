<script setup lang="ts">
type ArticleT = { id: number; title: string; price: number }
defineProps<{ article: ArticleT }>()
</script>

<template>
  <li>
    <strong>{{ article.title }}</strong>
    —
    <span
      :class="{
        red: article.price > 100,
        green: article.price < 100
      }"
    >
      {{ article.price }} €
    </span>
  </li>
</template>

<style scoped>
.red { color: #dc2626; }
.green { color: #16a34a; }
</style>
