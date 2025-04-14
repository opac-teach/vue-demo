<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Liste des Memecoins</h1>

    <div v-if="store.loading && store.list.length === 0">Chargement...</div>
    <div v-else-if="store.error" class="text-red-500">{{ store.error }}</div>
    <ul v-else class="space-y-4">
      <li v-for="coin in store.list.slice(-5).reverse()" :key="coin.symbol" class="border p-2 rounded">
        <div class="flex items-center gap-4">
          <img v-if="coin.logoUrl" :src="coin.logoUrl" alt="logo" class="w-12 h-12 rounded" />
          <div>
            <p class="font-semibold">{{ coin.name }} ({{ coin.symbol }})</p>
            <p class="text-sm text-gray-600">{{ coin.description }}</p>
          </div>
        </div>
      </li>
    </ul>

    <hr class="my-8" />

    <h2 class="text-xl font-bold mb-2">Créer un Memecoin</h2>

    <div v-if="authStore.token">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block">Nom *</label>
          <input v-model="form.name" type="text" class="border rounded w-full p-2" />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block">Symbole *</label>
          <input v-model="form.symbol" type="text" class="border rounded w-full p-2" />
          <p v-if="errors.symbol" class="text-red-500 text-sm">{{ errors.symbol }}</p>
        </div>

        <div>
          <label class="block">Description</label>
          <textarea v-model="form.description" class="border rounded w-full p-2 overflow-hidden"></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
        </div>

        <div>
          <label class="block">Logo URL</label>
          <input v-model="form.logoUrl" type="text" class="border rounded w-full p-2" />
          <p v-if="errors.logoUrl" class="text-red-500 text-sm">{{ errors.logoUrl }}</p>
        </div>

        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Créer</button>

        <p v-if="apiSuccess" class="text-green-600 mt-2">{{ apiSuccess }}</p>
        <p v-if="apiError" class="text-red-500 mt-2">{{ apiError }}</p>
      </form>
    </div>

    <div v-else>
      <router-link to="/login" class="text-blue-600 underline">
        Connecte-toi pour créer un memecoin
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useMemecoinStore } from '@/stores/memecoinsStore.ts'
import { useAuthStore } from '@/stores/authStore'
import {kMaxLength} from "node:buffer";

const store = useMemecoinStore()
const authStore = useAuthStore()

const form = ref({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const errors = ref<Record<string, string>>({})
const apiError = ref('')
const apiSuccess = ref('')

watch(() => form.value.symbol, (newVal) => {
  if (newVal !== newVal.toUpperCase()) {
    form.value.symbol = newVal.toUpperCase()
  }
})

const validateForm = () => {
  errors.value = {}
  const { name, symbol, description, logoUrl } = form.value

  if (!name || name.length < 4 || name.length > 16)
    errors.value.name = 'Nom requis (4-16 caractères)'
  if (!symbol || symbol.length < 2 || symbol.length > 4 || !/^[A-Z]+$/.test(symbol))
    errors.value.symbol = 'Symbole requis (2-4 lettres majuscules)'
  if (description.length > 1000)
    errors.value.description = 'Max 1000 caractères'
  if (logoUrl && (!/^https?:\/\/.+/.test(logoUrl) || logoUrl.length > 200))
    errors.value.logoUrl = 'URL invalide'

  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  apiError.value = ''
  apiSuccess.value = ''

  if (!validateForm()) return

  try {
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Erreur API')

    await response.json()

    apiSuccess.value = 'Memecoin créé avec succès !'
    form.value = { name: '', symbol: '', description: '', logoUrl: '' }
    await store.fetchAll()
  } catch (err) {
    apiError.value = 'Erreur lors de la création'
    console.error(err)
  }
}

let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  store.fetchAll()
  intervalId = setInterval(() => {
    store.fetchAll()
  }, 60000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
