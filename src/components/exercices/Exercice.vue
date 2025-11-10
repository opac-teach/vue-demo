<template>
  <div>
    <h2>Liste des amis a kiki</h2>
    <ul>
      <li v-for="article in articlesFiltres" :key="article.id">
       <a :href="'/article/' + article.id">{{ article.name }}</a> — {{ article.price }} €
      </li>
    </ul>
    <form @submit.prevent="ajouterArticle" class="mt-4">
      <input v-model="nouvelArticle.name" placeholder="Nom de l'article" required />
      <input v-model.number="nouvelArticle.price" placeholder="Prix" type="number" required />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const articles = ref([
  { id: 1, name: 'Beutanite', price: 30 },
  { id: 2, name: 'Gaelpenchibre', price: 60 },
  { id: 3, name: 'Alphontaine', price: 120 },
  { id: 4, name: 'Lucaca', price: 15 },
  { id: 5, name: 'Ordinaturo', price: 800 }

])

const nouvelArticle = ref({ name: '', price: 0 })

const ajouterArticle = () => {
  if (nouvelArticle.value.name && nouvelArticle.value.price > 0) {
    const id = articles.value.length + 1
    articles.value.push({ id, ...nouvelArticle.value })
    nouvelArticle.value = { name: '', price: 0 }
  }
}

const articlesFiltres = computed(() =>
  articles.value.filter(article => article.price > 50)
)
</script>
