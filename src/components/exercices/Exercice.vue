<template>
  <ul>
    <li v-for="article in newarticles" :key="article.name">
      <Article :article="article"></Article>
    </li>
  </ul>

  <form @submit.prevent="addArticle">
    <input v-model="name" type="text" placeholder="Nom de l'article" required />
    <input v-model.number="price" type="number" step="0.01" placeholder="Prix de l'article" required />
    <button type="submit">Ajouter</button>
  </form>
</template>

<script setup lang="ts">
import Article from "./Article.vue";
import { ref, computed } from 'vue'

interface ArticleType {
  name: string
  price: number
}

const articles = ref<ArticleType[]>([
  { name: "pc", price: 170 },
  { name: "souris", price: 70 },
  { name: "clavier", price: 35 }
]);

const newarticles = computed(() =>
  articles.value.filter(article => article.price >= 50)
);

const name = ref('')
const price = ref()

const addArticle = () => {
    articles.value.push({ name: name.value, price: price.value })
  }

fetch('https://api.sampleapis.com/rickandmorty/characters') 
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
</script>
