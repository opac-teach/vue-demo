<template>
  <div class="memecoins-page">
    <section class="memecoins-header">
      <h1>Liste des Memecoins</h1>
      <button class="refresh-btn" @click="fetchMemecoins" :disabled="loading">
         Rafraîchir
      </button>
    </section>

    <section v-if="loading" class="loading">
      <p>Chargement des memecoins...</p>
    </section>

    <section v-else class="memecoins-list">
      <article v-for="coin in memecoins" :key="coin.id" class="memecoin-card">
        <img
          v-if="coin.logoUrl"
          :src="coin.logoUrl"
          alt="logo"
          class="memecoin-logo"
        />
        <div class="memecoin-info">
          <h3>{{ coin.name }} <span>({{ coin.symbol }})</span></h3>
          <p v-if="coin.description">{{ coin.description }}</p>
          <p v-else class="no-desc">Pas de description</p>
        </div>
      </article>
    </section>

    <section class="memecoin-form-section">
      <h2> Créer un nouveau Memecoin</h2>

      <form @submit.prevent="createMemecoin" class="memecoin-form">
        <div class="form-group">
          <label>Nom *</label>
          <input v-model="form.name" type="text" placeholder="Ex : PepeCoin" />
          <small v-if="errors.name" class="error">{{ errors.name }}</small>
        </div>

        <div class="form-group">
          <label>Symbole *</label>
          <input v-model="form.symbol" type="text" placeholder="Ex : PEPE" />
          <small v-if="errors.symbol" class="error">{{ errors.symbol }}</small>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.description" placeholder="Décris ton memecoin..."></textarea>
          <small v-if="errors.description" class="error">{{ errors.description }}</small>
        </div>

        <div class="form-group">
          <label>Logo URL</label>
          <input v-model="form.logoUrl" type="text" placeholder="https://..." />
          <small v-if="errors.logoUrl" class="error">{{ errors.logoUrl }}</small>
        </div>

        <button type="submit" class="submit-btn">Créer</button>
        <p v-if="message" class="message">{{ message }}</p>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const memecoins = ref<any[]>([])
const loading = ref(true)
const message = ref('')
const errors = ref<Record<string, string>>({})

const form = ref({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const fetchMemecoins = async () => {
  loading.value = true
  try {
    const res = await axios.get('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
    memecoins.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  errors.value = {}
  if (!form.value.name || form.value.name.length < 4 || form.value.name.length > 16)
    errors.value.name = 'Le nom doit contenir entre 4 et 16 caractères.'
  if (!form.value.symbol || !/^[A-Z]{2,4}$/.test(form.value.symbol))
    errors.value.symbol = 'Le symbole doit contenir 2 à 4 lettres majuscules.'
  if (form.value.description && form.value.description.length > 1000)
    errors.value.description = 'Description trop longue.'
  if (form.value.logoUrl && !/^https?:\/\/.+\..+/.test(form.value.logoUrl))
    errors.value.logoUrl = 'URL invalide.'
  return Object.keys(errors.value).length === 0
}

const createMemecoin = async () => {
  if (!validateForm()) return
  try {
    await axios.post('https://nuxt-demo-blush.vercel.app/api/create-memecoin', form.value)
    message.value = ' Memecoin créé avec succès !'
    await fetchMemecoins()
  } catch (err: any) {
    message.value = 'Erreur lors de la création.'
  }
}

onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push('/login')
    return
  }
  fetchMemecoins()
})
</script>

<style scoped>
.memecoins-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  font-family: 'Inter', sans-serif;
}

.memecoins-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.memecoins-header h1 {
  font-size: 1.8rem;
  color: #222;
}

.refresh-btn {
  background: #008cff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}
.refresh-btn:hover {
  background: #006fd6;
}

.memecoins-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 3rem;
}

.memecoin-card {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #eee;
  transition: 0.2s;
}
.memecoin-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.memecoin-logo {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.memecoin-info h3 {
  font-size: 1.1rem;
  margin: 0;
}
.memecoin-info span {
  color: #777;
  font-weight: normal;
  font-size: 0.95rem;
}
.no-desc {
  color: #aaa;
  font-style: italic;
}

.memecoin-form-section {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #eee;
}

.memecoin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.4rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.submit-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}
.submit-btn:hover {
  background: #218838;
}

.error {
  color: #e63946;
  font-size: 0.9rem;
}

.message {
  margin-top: 0.8rem;
  font-weight: 500;
}
</style>
