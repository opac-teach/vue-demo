<!-- src/components/ArticleItem.vue -->
<template>
  <div class="article-item">
    <span>{{ article.nom }}</span> —
    <span :style="{ color: article.prix > 100 ? 'red' : 'green' }">
      {{ article.prix }} €
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  article: { id: number; nom: string; prix: number }
}>()
</script>

<style scoped>
.article-item {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
</style>
