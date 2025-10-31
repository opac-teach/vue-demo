<template>
  <h1>Une Route nouvelle</h1>

  <fieldset aria-label="Filter by species">
    <legend>Filter by species</legend>

    <label> <input type="radio" name="species" value="All" v-model="selectedSpecies" /> All </label>

    <label>
      <input type="radio" name="species" value="Human" v-model="selectedSpecies" /> Human
    </label>

    <label>
      <input type="radio" name="species" value="Alien" v-model="selectedSpecies" /> Alien
    </label>
  </fieldset>

  <ul>
    <li v-for="character in filteredCharacters" :key="character.id">
      {{ character.name }} - {{ character.status }} - {{ character.species }} -
      {{ character.gender }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Male' | 'Female' | 'unknown'
  origin: string
  image: string
}

const characters = ref<Character[]>([])
const selectedSpecies = ref<string>('All')
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

const filteredCharacters = computed(() => {
  if (selectedSpecies.value === 'All') return characters.value
  return characters.value.filter((c) => c.species === selectedSpecies.value)
})

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch('https://rickandmortyapi.com/api/character')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    characters.value = data.results.map((c: any) => ({
      id: c.id,
      name: c.name,
      status: c.status as 'Alive' | 'Dead' | 'unknown',
      species: c.species,
      type: c.type,
      gender: c.gender as 'Male' | 'Female' | 'unknown',
      origin: c.origin?.name ?? 'unknown',
      image: c.image,
    })) as Character[]
  } catch (err: any) {
    error.value = err?.message ?? String(err)
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
<style scoped > <style scoped > fieldset {
  margin-bottom: 1rem;
  border: none;
  padding: 0;
}
label {
  margin-right: 1rem;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
