<template>
  <div class="article">
    <h3>{{ article.name }}</h3>
    <p>Prix : {{ article.price }} €</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>
