<template>
  <main>
    <h1>Memecoins</h1>

    <section>
      <h2>Liste</h2>
      <p v-if="fetchError" style="color:red; font-weight: bold;">{{ fetchError }}</p>
      <ul>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <li v-for="coin in memecoins" :key="coin.id">
            <img 
              :src="coin.logoUrl" 
              alt="" 
              style="width:160px;height:160px;object-fit:cover" 
              @error="handleImageError($event, coin.id)"
            />
            <p v-if="imageErrors[coin.id]" style="color:red; font-size: 0.875rem;">
              Erreur: image non disponible
            </p>
            <strong>{{ coin.name }} ({{ coin.symbol }})</strong>
            <div>{{ coin.description }}</div>
            <small>Owner: {{ coin.ownerId || 'anonyme' }}</small>
          </li>
        </div>
      </ul>
    </section>
    <section id="form-container">
      <h2>Créer un memecoin</h2>
      
      <div v-if="!auth.isAuthenticated">
        <p>Vous devez être connecté pour créer un memecoin.</p>
        <button @click="goToLogin">Se connecter</button>
      </div>

      <template v-else>
        <form @submit.prevent="handleSubmit" id="form-id">
          <div>
            <label class="form-label">Nom</label>
            <input class="form-input" v-model="form.name" />
            <p class="form-p" v-if="errors.name" style="color:red">{{ errors.name }}</p>
          </div>

          <div>
            <label class="form-label">Symbole</label>
            <input 
              class="form-input" 
              v-model="form.symbol" 
              @input="form.symbol = form.symbol.toUpperCase()"
              placeholder="BTC"
            />
            <p class="form-p" v-if="errors.symbol" style="color:red">{{ errors.symbol }}</p>
          </div>

          <div>
            <label class="form-label">Description</label>
            <textarea class="form-textarea" v-model="form.description" />
            <p class="form-p" v-if="errors.description" style="color:red">{{ errors.description }}</p>
          </div>

          <div>
            <label class="form-label">Logo URL</label>
            <input class="form-input" v-model="form.logoUrl" />
            <p class="form-p" v-if="errors.logoUrl" style="color:red">{{ errors.logoUrl }}</p>
          </div>

          <button id="submit-btn" type="submit">Créer</button>
        </form>

        <p v-if="apiError" style="color:red">{{ apiError }}</p>
        <p v-if="apiSuccess" style="color:green">Memecoin créé !</p>
      </template>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/auth.ts'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const memecoins = ref([])

const form = ref({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const errors = ref({})
const apiError = ref('')
const apiSuccess = ref(false)
const fetchError = ref('')
const imageErrors = ref({})

async function fetchMemecoins() {
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
    if (!res.ok) {
      if (res.status === 500) {
        fetchError.value = 'Erreur 500: Le serveur rencontre un problème. Impossible de charger les memecoins.'
      } else {
        fetchError.value = `Erreur ${res.status}: Impossible de charger les memecoins.`
      }
      console.error('Erreur lors de la récupération des memecoins', res.status)
      return
    }
    const data = await res.json()
    memecoins.value = data
    fetchError.value = ''
    imageErrors.value = {}
  } catch (e) {
    fetchError.value = 'Erreur réseau: Impossible de se connecter au serveur.'
    console.error('Erreur réseau lors de la récupération des memecoins', e)
  }
}

function handleImageError(event, coinId) {
  imageErrors.value[coinId] = true
  event.target.style.display = 'none'
}

function goToLogin() {
  router.push('/login')
}

async function handleSubmit() {
  apiError.value = ''
  apiSuccess.value = false
  errors.value = {}

  if (!validateForm()) {
    return
  }

  try {
    const formData = {
      ...form.value,
      symbol: form.value.symbol.toUpperCase()
    }

    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(formData)
    })

    if (!res.ok) {
      const errorData = await res.json()
      apiError.value = errorData.message || 'Erreur lors de la création du memecoin.'
      return
    }

    await res.json()

    form.value = {
      name: '',
      symbol: '',
      description: '',
      logoUrl: ''
    }
    errors.value = {}
    apiSuccess.value = true
    await fetchMemecoins()
    imageErrors.value = {}
    
    setTimeout(() => {
      apiSuccess.value = false
    }, 3000)
  } catch (e) {
    apiError.value = 'Erreur réseau.'
  }
}

fetchMemecoins();

onMounted(() => {
  setInterval(() => {
    fetchMemecoins()
  }, 2000)
})

function isValidUrl(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

function validateForm() {
  const e = {}

  if (!form.value.name) {
    e.name = 'Le nom est obligatoire.'
  } else if (form.value.name.length < 4 || form.value.name.length > 16) {
    e.name = 'Le nom doit faire entre 4 et 16 caractères.'
  }

  if (!form.value.symbol) {
    e.symbol = 'Le symbole est obligatoire.'
  } else if (form.value.symbol.length < 2 || form.value.symbol.length > 4) {
    e.symbol = 'Le symbole doit faire entre 2 et 4 caractères.'
  } else if (!/^[A-Z]+$/.test(form.value.symbol)) {
    e.symbol = 'Le symbole doit être uniquement en MAJUSCULES.'
  }

  if (form.value.description && form.value.description.length > 1000) {
    e.description = 'Description trop longue (max 1000 caractère).'
  }

  if (form.value.logoUrl) {
    if (form.value.logoUrl.length > 500) {
      e.logoUrl = 'URL trop longue (max 500 caractères).'
    } else if (!isValidUrl(form.value.logoUrl)) {
      e.logoUrl = "Ce n'est pas une URL valide."
    }
  }

  errors.value = e
  return Object.keys(e).length === 0
}
</script>
