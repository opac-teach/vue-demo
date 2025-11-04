<template>
  <section class="space-y-10">
    <!-- Global state (username) -->
    <div class="space-y-3">
      <h2 class="text-xl font-bold">Global State</h2>
      <form class="flex items-end gap-3" @submit.prevent="saveNickname">
        <div>
          <label class="block text-sm">Nom d’utilisateur</label>
          <input v-model.trim="nicknameInput" class="border rounded px-2 py-1" placeholder="Ton pseudo…" />
        </div>
        <button class="border rounded px-3 py-1 hover:bg-neutral-800">Enregistrer</button>
      </form>
      <p v-if="nicknameStore.nickname">Bonjour, <strong>{{ nicknameStore.nickname }}</strong> 👋</p>
    </div>

    <!-- Articles (state + computed + ajout) -->
    <div class="space-y-3">
      <h2 class="text-xl font-bold">Articles</h2>
      <Articles />
    </div>

    <!-- Data fetching & filtres -->
    <div class="space-y-3">
      <h2 class="text-xl font-bold">Data fetching et filtres</h2>
      <div class="flex items-center gap-3">
        <label>Filtrer espèce :</label>
        <select v-model="speciesFilter" class="border rounded px-2 py-1">
          <option value="All">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
      </div>

      <div v-if="loading">Chargement…</div>
      <div v-else>
        <ul class="list-disc pl-6 space-y-1">
          <li v-for="c in filteredCharacters" :key="c.id">
            {{ c.name }} ({{ c.species }})
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Articles from './Articles.vue'
import { useNicknameStore } from '@/stores/nickname'

onBeforeRouteLeave((_to, _from, next) => {
  if (confirm("Quitter la page d’exercices ?")) next()
  else next(false)
})

const nicknameStore = useNicknameStore()
const nicknameInput = ref('')
function saveNickname() {
  nicknameStore.setNickname(nicknameInput.value || '')
}
type Character = { id: number; name: string; species: 'Human' | 'Alien' | string }

const loading = ref(true)
const characters = ref<Character[]>([])
const speciesFilter = ref<'All' | 'Human' | 'Alien'>('All')

const filteredCharacters = computed(() => {
  if (speciesFilter.value === 'All') return characters.value
  return characters.value.filter(c => c.species === speciesFilter.value)
})

onMounted(async () => {
  try {
    const res = await fetch('https://api.sampleapis.com/rickandmorty/characters')
    const data = (await res.json()) as Character[]
    characters.value = data.map((c, i) => ({ id: c.id ?? i, name: c.name, species: c.species }))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
