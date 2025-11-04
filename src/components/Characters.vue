<!-- src/views/CharactersView.vue -->
<template>
  <div class="characters-page">
    <h1>Rick & Morty - Personnages</h1>

    <!-- Menu de filtre -->
    <div class="filters">
      <button
        v-for="option in filterOptions"
        :key="option"
        :class="{ active: currentFilter === option }"
        @click="currentFilter = option"
      >
        {{ option }}
      </button>
    </div>

    <!-- Liste des personnages -->
    <div class="characters">
      <div
        v-for="character in filteredCharacters"
        :key="character.id"
        class="character-card"
      >
        <img :src="character.image" :alt="character.name" />
        <h3>{{ character.name }}</h3>
        <p>{{ character.species }}</p>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 🧾 State principal
const characters = ref<any[]>([])
const currentFilter = ref('All')

// 🧮 Options de filtre
const filterOptions = ['All', 'Human', 'Alien']

// 🌍 Récupération des données depuis l’API
onMounted(async () => {
  try {
    const response = await fetch('https://api.sampleapis.com/rickandmorty/characters')
    const data = await response.json()
    characters.value = data
  } catch (error) {
    console.error('Erreur de chargement des personnages :', error)
  }
})

// 🔍 Filtrage dynamique
const filteredCharacters = computed(() => {
  if (currentFilter.value === 'All') return characters.value
  return characters.value.filter(c => c.species === currentFilter.value)
})
</script>













<style scoped>
.characters-page {
  padding: 20px;
  text-align: center;
}

.filters {
  margin-bottom: 20px;
}

.filters button {
  margin: 0 5px;
  padding: 8px 15px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.filters button.active {
  background: #42b883;
  color: white;
}

.characters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.character-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background: #fafafa;
  transition: transform 0.2s;
}

.character-card:hover {
  transform: scale(1.03);
}

.character-card img {
  width: 100%;
  border-radius: 10px;
}
</style>


