<template>
  <h2 class="font-bold text-2xl">Ajouter un article</h2>
  <form @submit="onSubmit" class="flex flex-col gap-2 *:border *:rounded *:p-2">
    <input type="text" name="title" placeholder="Titre" />
    <input type="number" step="0.01" name="price" placeholder="Prix" />
    <input type="text" name="content" placeholder="Contenu" />
    <button type="submit" class="cursor-pointer">Ajouter</button>
  </form>
  <hr class="my-5" />
  <h2 class="font-bold text-2xl">Liste des articles</h2>
  <div class="flex flex-col gap-2">
    <Article v-for="article in computedArticles" :key="article.id" :article="article" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Article from '../Article.vue'

function onSubmit(e: Event) {
  e.preventDefault()

  if (e.target instanceof HTMLFormElement) {
    const formData = new FormData(e.target)
    const title = formData.get('title')
    const content = formData.get('content')
    const price = formData.get('price')

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      typeof price !== 'string' ||
      isNaN(Number(price))
    ) {
      alert('Veuillez remplir correctement tous les champs.')
      return
    }

    articles.value = [
      ...articles.value,
      {
        id: articles.value.length + 1,
        title,
        content,
        price: Number(price),
      },
    ]

    e.target.reset()
  }
}

const articles = ref([
  {
    id: 1,
    title: 'Article 1',
    content: 'Contenu 1 wouwhouuu',
    price: 12.99,
  },
  {
    id: 2,
    title: 'Article 2',
    content: 'Contenu 2 wouwhouuueiyrh erugyer',
    price: 90.0,
  },
  {
    id: 3,
    title: 'Article 3',
    content: 'Contenu 3 wouwhouuu',
    price: 555,
  },
])

const computedArticles = computed(() => articles.value.filter((article) => article.price > 50))

// onBeforeUnmount(() => {
//   alert('Vous quittez la page des exercices !')
// })
</script>
