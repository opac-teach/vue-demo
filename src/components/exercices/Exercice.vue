<template>
  <div>
    <!-- Formulaire d'ajout d'article -->
    <div>
      <h3>Ajouter un nouvel article</h3>
      <form @submit.prevent="addArticle">
        <div>
          <label>Nom de l'article:</label>
          <input 
            type="text" 
            v-model="newArticle.name" 
            required 
            placeholder="Entrez le nom"
          >
        </div>
        
        <div>
          <label>Prix (€):</label>
          <input 
            type="number" 
            v-model.number="newArticle.price" 
            required 
            min="0" 
            step="0.01"
            placeholder="0.00"
          >
        </div>
        
        <button type="submit">Ajouter l'article</button>
      </form>
    </div>

    <!-- Liste des articles filtrés -->
    <ul>
      <li v-for="article in filteredArticles" :key="article.id">
        <ArticleItem :name="article.name" :price="article.price" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ArticleItem from './ArticleItem.vue'

type Article = { id: number; name: string; price: number }

const articles = ref<Article[]>([
  { id: 1,  name: "Câble USB-C 1m",            price: 9.99  },
  { id: 2,  name: "Tasse isotherme",           price: 14.9  }, 
  { id: 3,  name: "Souris sans fil",           price: 24.5  },
  { id: 4,  name: "Lampe de bureau LED",       price: 39.99 },
  { id: 5,  name: "Clé USB 256Go",             price: 50.0  },
  { id: 6,  name: "Casque audio filaire",      price: 59.9  },
  { id: 7,  name: "Sac à dos urbain",          price: 75.0  },
  { id: 8,  name: "Mini enceinte bluetooth",   price: 89.99 },
  { id: 9,  name: "Clavier mécanique",         price: 99.99 },
  { id: 10, name: "Disque SSD 1To",            price: 100.0 },
  { id: 11, name: "Moniteur 27\"",             price: 129.0 },
  { id: 12, name: "Casque gaming 7.1",         price: 199.0 },
])

const newArticle = ref({
  name: '',
  price: 0
})

const addArticle = () => {
  if (newArticle.value.name.trim() && newArticle.value.price >= 0) {
    const newId = Math.max(...articles.value.map(a => a.id)) + 1
    
    articles.value.push({
      id: newId,
      name: newArticle.value.name.trim(),
      price: newArticle.value.price
    })
    
    newArticle.value.name = ''
    newArticle.value.price = 0
  }
}

const filteredArticles = computed(() => articles.value.filter(a => a.price > 50))

import { onMounted } from 'vue'

const url = ref('https://api.sampleapis.com/rickandmorty/characters')

 
</script  > 