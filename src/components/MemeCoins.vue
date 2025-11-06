<template>
  <div class="coin-page">
    <h1>Memecoins</h1>

    <!-- Liste des memecoins -->
    <div class="coin">
      <div v-for="coin in memecoinsStore.coins" :key="coin.id" class="coin-card">
        <img :src="coin.logoUrl" :alt="coin.name" />
        <h3>{{ coin.name }}</h3>
        <p>{{ coin.symbol }}</p>
        <p>{{ coin.description }}</p>
      </div>
    </div>

    <template v-if="authStore.isLoggedIn">
      <h2>Ajouter un memecoin</h2>
      <form @submit.prevent="addMemeCoin" class="form">
        <input v-model="newMeme.name" type="text" placeholder="Nom du memecoin" class="input" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input v-model="newMeme.symbol" type="text" placeholder="Symbole" class="input" />
        <span v-if="errors.symbol" class="error">{{ errors.symbol }}</span>

        <input v-model="newMeme.description" type="text" placeholder="Description" class="input" />
        <span v-if="errors.description" class="error">{{ errors.description }}</span>

        <input v-model="newMeme.logoUrl" type="text" placeholder="URL du logo" class="input" />
        <span v-if="errors.logoUrl" class="error">{{ errors.logoUrl }}</span>

        <button type="submit" class="btn">Ajouter</button>
      </form>
    </template>
    <template v-else>
      <div class="login-prompt">
        <p>Connectez-vous pour créer un memecoin</p>
        <router-link to="/login" class="btn">Se connecter</router-link>
      </div>
    </template>

    <p v-if="apiMessage" :class="{ success: apiSuccess, error: !apiSuccess }">{{ apiMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMemecoinsStore, Memecoin } from '@/stores/memecoins'
import { useAuthStore } from '@/stores/auth'

const memecoinsStore = useMemecoinsStore()
const authStore = useAuthStore()

const newMeme = ref<Memecoin>({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const errors = ref<Record<string, string>>({})
const apiMessage = ref('')
const apiSuccess = ref(true)

// 🔹 Validation simple
const validate = () => {
  errors.value = {}
  if (!newMeme.value.name) errors.value.name = 'Le nom est requis.'
  if (!newMeme.value.symbol) errors.value.symbol = 'Le symbole est requis.'
  if (!newMeme.value.description) errors.value.description = 'La description est requise.'
  if (!newMeme.value.logoUrl) errors.value.logoUrl = 'L\'URL du logo est requise.'
  return Object.keys(errors.value).length === 0
}

// 🔹 Fetch memecoins
const fetchMemecoins = async () => {
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
    const data = await res.json()
    memecoinsStore.setCoins(data)
  } catch (error) {
    console.error('Erreur fetch memecoins :', error)
    apiMessage.value = 'Erreur de chargement des memecoins.'
    apiSuccess.value = false
  }
}

onMounted(fetchMemecoins)

// 🔹 Ajouter un memecoin
const addMemeCoin = async () => {
  if (!validate()) return

  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}` // Ajout du token d'authentification
      },
      body: JSON.stringify(newMeme.value)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Erreur API')
    }

    const created = await res.json()
    memecoinsStore.addCoin(created)

    apiMessage.value = `✅ Memecoin "${created.name}" ajouté avec succès !`
    apiSuccess.value = true

    // Reset formulaire
    newMeme.value = { name: '', symbol: '', description: '', logoUrl: '' }

  } catch (error) {
    console.error('Erreur création memecoin :', error)
    apiMessage.value = '❌ Une erreur est survenue lors de la création.'
    apiSuccess.value = false
  }
}
</script>

<style scoped>
.input {
  display: block;
  margin-bottom: 5px;
  padding: 5px 8px;
  width: 300px;
}
.btn {
  padding: 6px 12px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background: #2c9d6f;
}
.error {
  color: red;
  font-size: 0.9em;
}
.success {
  color: green;
}
.coin-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
