<template>
  <div class="min-h-screen bg-blue-900 text-white p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Memecoins</h1>

    <div class="flex flex-col lg:flex-row gap-8">
      <div class="flex-1">
        <h2 class="text-2xl font-semibold mb-2">Liste</h2>
  
        <p v-if="apiError" class="text-red-400">{{ apiError }}</p>
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="coin in memecoins"
            :key="coin.id"
            class="flex items-center gap-4 bg-blue-800 p-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <img
              v-if="coin.logoUrl"
              :src="coin.logoUrl"
              alt="logo"
              class="w-12 h-12 rounded-md object-cover"
            />
            <div class="flex flex-col">
              <strong class="text-lg">{{ coin.name }} ({{ coin.symbol }})</strong>
              <p class="text-gray-300">{{ coin.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1">
        <h2 class="text-2xl font-semibold mb-2">Créer un memecoin</h2>
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label class="font-medium">Nom *</label>
            <input v-model="form.name" class="input input-bordered w-full" />
            <div v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</div>
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Symbole *</label>
            <input v-model="form.symbol" class="input input-bordered w-full" />
            <div v-if="errors.symbol" class="text-red-400 text-sm mt-1">{{ errors.symbol }}</div>
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Description</label>
            <textarea v-model="form.description" class="textarea textarea-bordered w-full" rows="3"></textarea>
            <div v-if="errors.description" class="text-red-400 text-sm mt-1">{{ errors.description }}</div>
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Logo URL *</label>
            <input v-model="form.logoUrl" class="input input-bordered w-full" />
            <div v-if="errors.logoUrl" class="text-red-400 text-sm mt-1">{{ errors.logoUrl }}</div>
          </div>

          <button type="submit" class="btn btn-primary w-32">
            Créer
          </button>
        </form>

        <p v-if="apiSuccess" class="text-green-400 mt-4 font-medium">Memecoin créé</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref,onMounted } from 'vue'

const memecoins = ref([])
const pending = ref(false)
const apiError = ref('')
const apiSuccess = ref(false)

const form = ref({ name: '', symbol: '', description: '', logoUrl: '' })
const errors = ref({})

async function loadMemecoins() {
  pending.value = true
  apiError.value = ''
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
    if (!res.ok) throw new Error('Erreur API')
    memecoins.value = await res.json()
  } catch (e) {
    apiError.value = 'Erreur API'
  } finally {
    pending.value = false
  }
}

loadMemecoins()

function validate() {
  errors.value = {}

  if (!form.value.name || form.value.name.length < 4 || form.value.name.length > 16) {
    errors.value.name = 'Nom 4-16 caractères'
  }

  if (!/^[A-Z]{2,4}$/.test(form.value.symbol)) {
    errors.value.symbol = '2-4 caractères en majuscules'
  }

  if (form.value.description && form.value.description.length > 1000) {
    errors.value.description = 'Max 1000 caractères'
  }

  if (
    form.value.logoUrl &&
    (!/^https?:\/\//.test(form.value.logoUrl) || form.value.logoUrl.length > 200)
  ) {
    errors.value.logoUrl = 'URL invalide ou trop longue'
  }

  return Object.keys(errors.value).length === 0
}

async function submitForm() {
  apiError.value = ''
  apiSuccess.value = false
  if (!validate()) return

  pending.value = true
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) throw new Error('Erreur API')

    apiSuccess.value = true
    form.value = { name: '', symbol: '', description: '', logoUrl: '' }
    await loadMemecoins()
  } catch (e) {
    apiError.value = 'Erreur API'
  } finally {
    pending.value = false
  }
}
let interval
onMounted(() => {
  loadMemecoins() 
  interval = setInterval(loadMemecoins, 2000)
})
</script>
