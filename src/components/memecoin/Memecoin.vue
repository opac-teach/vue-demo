<template>
  <div>
    <div>
      <ul>
        <li v-for="memecoin in memecoins" :key="memecoin.id">
          <p>{{ memecoin.name }}</p>
          <p>Owner : {{ memecoin.owner }}</p>
          <p>Symbole : {{ memecoin.symbol }}</p>
          <p>Description : {{ memecoin.description }}</p>
          <img :src="memecoin.logoUrl" alt="" class="w-16 h-16">
        </li>
      </ul>
    </div>

    <hr class="my-4">

<div v-if="auth.isAuthenticated">
    <form id="memecoinForm" class="space-y-4 p-4 bg-base-100 rounded-md shadow-md" @submit.prevent="handleSubmit">
  <label for="name" class="block font-semibold">Nom du memecoin : </label>
  <input class="input validator input-bordered w-full" type="text" id="name" name="name" 
    required 
    pattern="^[a-zA-Z0-9]{4,16}$"
    placeholder="Nom du Memecoin">
  <p class="validator-hint text-red-500 text-sm mt-1">
    Le nom du Memecoin doit être entre 4 et 16 caractères.
  </p>

  <label for="symbol" class="block font-semibold">Symbole du Memecoin : </label>
  <input class="input validator input-bordered w-full" type="text" id="symbol" name="symbol"
    required
    pattern="^[A-Z]{2,4}$"
    placeholder="Symbole du Memecoin"
    style="text-transform: uppercase;">
  <p class="validator-hint text-red-500 text-sm mt-1">
    Le symbole doit contenir entre 2 et 4 lettres majuscules.
  </p>

  <label for="description" class="block font-semibold">Description du Memecoin : </label>
  <input class="input validator input-bordered w-full" type="text" id="description" name="description"
    pattern="^.{0,1000}$"
    placeholder="Description du Memecoin">
  <p class="validator-hint text-red-500 text-sm mt-1">
    La description doit faire moins de 1 000 caractères.
  </p>

  <label for="logoUrl" class="block font-semibold">LogoUrl : </label>
  <input class="input validator input-bordered w-full" type="url" id="logoUrl" name="logoUrl" pattern="^.{0,200}$"
    placeholder="https://image.lien.jpg">
  <p class="validator-hint text-red-500 text-sm mt-1">
    L'url du logo n'est pas valide.
  </p>

  <button type="submit" class="btn btn-success mt-4 w-full">Créer le Memecoin</button>
</form>
</div>



    <p v-if="message" :class="success ? 'text-green-600' : 'text-red-600'" class="mt-2">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/connection'

const memecoins = ref([]);
const message = ref('');
const success = ref(false);
const auth = useAuthStore();




async function refreshMemecoins() {
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
    if(!res.ok){
      throw new Error(res.status)
    }
    memecoins.value = await res.json()
  } catch (err) {
    message.value = 'Erreur lors du chargement des memecoins'
    success.value = false
  }
}


let interval
onMounted(() => {
    interval = setInterval(() => {
      refreshMemecoins()
    }, 1000)
  }
)

onUnmounted(()=>{
  interval = clearInterval
})

async function handleSubmit(e) {
  e.preventDefault()
  const form = e.target
  message.value = ''
  success.value = false




  const data = {
    name: form.name.value.trim(),
    symbol: form.symbol.value.trim().toUpperCase(),
    description: form.description.value.trim(),
    logoUrl: form.logoUrl.value.trim(),
  }

  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || 'Erreur API')
    message.value = 'Memecoin créé avec succès !'
    success.value = true

    form.reset()
    await refreshMemecoins()
  } catch (err) {
    message.value = err.message
    success.value = false
  }
}


onMounted(() => {
  const symbolInput = document.getElementById('symbol')
  if (symbolInput) {
    symbolInput.addEventListener('input', () => {
      symbolInput.value = symbolInput.value.toUpperCase()
    })
  }
})
</script>
