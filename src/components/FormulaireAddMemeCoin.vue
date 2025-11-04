<template>
  <div>
    <form @submit.prevent="submitForm" class="flex flex-col gap-2 w-80 p-4 border rounded">
      <label for="">Nom du coin</label>
      <input v-model="name" placeholder="Nom" />
      <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>

      <label for="">Symbole du coin</label>
      <input v-model="symbol" placeholder="Symbole" />
      <span v-if="errors.symbol" class="text-red-500 text-sm">{{ errors.symbol }}</span>

      <label for="">Description</label>
      <textarea v-model="description" placeholder="Description (optionnelle)"></textarea>
      <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>

      <label for="">Url du logo</label>
      <input v-model="logoUrl" placeholder="Logo URL (optionnelle)" />
      <span v-if="errors.logoUrl" class="text-red-500 text-sm">{{ errors.logoUrl }}</span>

      <button type="submit" class="bg-blue-600 text-white rounded p-2">Créer</button>

      <div v-if="apiError" class="text-red-600 text-sm">{{ apiError }}</div>
      <div v-if="apiResult" class="text-green-600 text-sm">Créé : {{ apiResult.name }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['created'])

const name = ref('')
const symbol = ref('')
const description = ref('')
const logoUrl = ref('')
const errors = ref({})
const apiError = ref(null)
const apiResult = ref(null)

const validate = () => {
  errors.value = {}
  if (name.value.length < 4 || name.value.length > 16)
    errors.value.name = 'Nom : 4–16 caractères'
  if (!/^[A-Z]{2,4}$/.test(symbol.value))
    errors.value.symbol = 'Symbole : 2–4 majuscules'
  if (description.value.length > 1000)
    errors.value.description = 'Description : max 1000 caractères'
  if (logoUrl.value && !/^https?:\/\/.+/.test(logoUrl.value))
    errors.value.logoUrl = 'URL invalide'
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  apiError.value = null
  apiResult.value = null

  if (!validate()) return

  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        symbol: symbol.value,
        description: description.value,
        logoUrl: logoUrl.value,
        token:
      }),
    })

    if (!res.ok) throw new Error('Erreur API')
    const result = await res.json()
    apiResult.value = result
    emit('created', result) 

    name.value = ''
    symbol.value = ''
    description.value = ''
    logoUrl.value = ''
  } catch (e) {
    apiError.value = e.message
  }
}
</script>
