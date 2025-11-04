<template>
  <div>
    <h2>{{ article.name }}</h2>
    <p>Espece : {{ article.species }}</p>
    <p>type : {{ article.type }}</p>
    <p>Genre : {{ article.gender }}</p>
    <p>Origin : {{ article.origin }}</p>
    <img :src="article.image" alt="">
  </div>
</template>

<script setup lang="ts">
defineProps({
  article: {
    type: Object as () => { id: number; name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      origin: string;
      image: string;
    },
    required: true
  }
})
</script>

