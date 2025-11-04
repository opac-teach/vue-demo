<template>
  <form @submit.prevent="onUsernameSubmit" class="py-4 flex items-center gap-2">
    <input type="text" placeholder="Enter username" class="border p-1 rounded" name="username" />
    <button class="rounded border p-1 cursor-pointer">Envoyer</button>
  </form>
  <select v-model="filter" class="border">
    <option value="All">All</option>
    <option value="Human">Human</option>
    <option value="Alien">Alien</option>
  </select>
  <div class="flex flex-col gap-2 mt-4">
    <div v-if="error" class="text-red-600">Error: {{ error }}</div>
    <template v-if="!characters">
      <div>Loading...</div>
    </template>
    <template v-else v-for="character in characters || []" :key="character.id">
      <div v-if="character.type === filter || filter === 'All'" class="flex items-center gap-2">
        <img
          :src="character.image"
          :alt="character.name"
          class="size-24 object-cover rounded shadow"
        />
        <p>{{ character.name }} - {{ character.type }}</p>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useNickname } from '@/stores/nickname'
import { onMounted, ref } from 'vue'

const characters = ref<{ id: number; name: string; type: string; image: string }[] | null>(null)
const filter = ref<'All' | 'Human' | 'Alien'>('All')
const error = ref<string | null>(null)
const nickname = useNickname()

const onUsernameSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get('username')

  if (typeof name !== 'string') {
    return alert('Please enter a valid username')
  }

  nickname.data = name
}

onMounted(async () => {
  fetch('https://api.sampleapis.com/rickandmorty/characters')
    .then((res) => res.json())
    .then((data) => {
      characters.value = data
    })
    .catch((err) => {
      error.value = err
    })
})
</script>
