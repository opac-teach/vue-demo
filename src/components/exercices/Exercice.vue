<template>
  <ul v-for="article in f_article" :key="article.id">
    <Row :title="article.title" :class="article.price > 100 ? 'bg-red-200' : 'bg-green-200'"></Row>
  </ul>
  <input type="text" placeholder="Article title" v-model="titleInput" />
  <input type="text" placeholder="Article content" v-model="contentInput" />
  <input type="number" placeholder="price" v-model="priceInput" />
  <button @click="addArticle">Add Article</button>

  <form @submit.prevent="addUser">
    <input type="text" placeholder="Username" v-model="usernameInput" />
    <button type="submit">Add User</button>
  </form>
</template>
<script setup lang="ts">
import { ref, onUnmounted, computed, type Ref } from 'vue'
import { useUsernameStore } from '@/stores/username'
import Row from './Row.vue'

interface Article {
  id: number
  title: string
  content: string
  price: number
}
onUnmounted(() => {
  alert('Exercice quitté')
})

let articles: Ref<Array<Article>> = ref([
  { id: 1, title: 'Article 1', content: "Contenu de l'article 1", price: 40 },
  { id: 1, title: 'Article 4', content: "Contenu de l'article 4", price: 40 },
  { id: 1, title: 'Article 8', content: "Contenu de l'article 8", price: 40 },
  { id: 1, title: 'Article 9', content: "Contenu de l'article 9", price: 90 },
  { id: 1, title: 'Article 17', content: "Contenu de l'article 17", price: 40 },
  { id: 1, title: 'Article 32', content: "Contenu de l'article 32", price: 40 },
  { id: 2, title: 'Article 2', content: "Contenu de l'article 2", price: 75 },
  { id: 3, title: 'Article 3', content: "Contenu de l'article 3", price: 120 },
])

const f_article = computed(() => {
  return articles.value.filter((article) => article.price > 50)
})

const titleInput = ref('title')
const contentInput = ref('content')
const priceInput = ref(0)
const usernameInput = ref('')

function addArticle() {
  const newArticle = {
    id: articles.value.length + 1,
    title: titleInput.value,
    content: contentInput.value,
    price: priceInput.value,
  }
  articles.value.push(newArticle)
}

function addUser() {
  const usernameStore = useUsernameStore()
  usernameStore.setUsername(usernameInput.value)
}
</script>
