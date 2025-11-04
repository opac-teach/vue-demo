<template>
  <div class="exercice-root">
    <ul>
      <li v-for="article in ValidArticles" :key="article.id">
        <Articles :nom="article.nom" :prix="article.prix" />
      </li>
    </ul>

    <form @submit.prevent="addItem">
      <p><b>Nom</b></p>
      <input class="input" name="nom" v-model="nom" />
      <p><b>Prix</b></p>
      <input class="input" name="prix" v-model="prix" />
      <button class="btn">Ajouter</button>
    </form>

    <form @submit.prevent="updateNickname" class="mb-4">
      <div class="flex items-center gap-2">
        <input
          class="input"
          v-model="tempNickname"
          placeholder="Entrez votre surnom..."
          aria-label="Surnom"
        />
        <button type="submit" class="btn">Changer</button>
      </div>
      <p class="text-sm mt-1">Surnom actuel : {{ nickNameStore.nickName || 'Non défini' }}</p>
    </form>

    <div class="filters">
      <label for="speciesFilter"><strong>Filter:</strong></label>
      <select id="speciesFilter" v-model="filter">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    
    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div v-for="content in filteredContents"
      :key="content.id">
        <h1>{{ content.name }}</h1>
        <img :src="content.image" alt="" />
        <p>{{ content.species }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Articles from './Articles.vue'
import { defineStore } from 'pinia'
import { useNickName } from '@/stores/nicknames.ts'

const nickNameStore = useNickName()
const tempNickname = ref('')

function updateNickname() {
  if (tempNickname.value.trim()) {
    nickNameStore.nickName = tempNickname.value
    tempNickname.value = ''
  }
}

const articles = ref([
  { id: 1, nom: 'Chaussures de sport', prix: 59.99 },
  { id: 2, nom: 'T-shirt en coton', prix: 19.99 },
  { id: 3, nom: 'Jean slim', prix: 49.99 },
  { id: 4, nom: 'Casquette', prix: 14.99 },
  { id: 5, nom: 'Montre connectée', prix: 129.99 },
  { id: 6, nom: 'Sac à dos', prix: 39.99 },
  { id: 7, nom: 'Lunettes de soleil', prix: 24.99 },
  { id: 8, nom: 'Veste en cuir', prix: 199.99 },
  { id: 9, nom: 'Ceinture en cuir', prix: 29.99 },
  { id: 10, nom: 'Baskets blanches', prix: 89.99 },
])

const ValidArticles = computed(() => articles.value.filter((article) => article.prix > 50))

const nom = ref('')
const prix = ref(0)

const options = ['All', 'Human', 'Alien']
const filter = ref('All')

const filteredContents = computed(() => {
  if (!contents.value) return []
  if (filter.value === 'All') return contents.value
  return contents.value.filter((c) => c.species === filter.value)
})

function addItem() {
  articles.value.push({
    id: Math.random(),
    nom: nom.value,
    prix: prix.value,
  })
}

const contents = ref<
  {
    id: string
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: string
    image: string
  }[]
>()

onMounted(async () => {
  const res = await fetch('https://api.sampleapis.com/rickandmorty/characters')
  const data = await res.json()
  contents.value = data
})
</script>
