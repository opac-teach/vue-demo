<template>


<div v-if="auth.isAuthenticated" class="max-w-sm mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md">
  <button @click="auth.logout()" class="btn btn-outline mt-4">Se déconnecter</button>
</div>



  <div v-else class="max-w-sm mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md">
    <h2 class="text-xl font-bold mb-4 text-center">Connexion</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <label for="password" class="block font-semibold">Mot de passe :</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Entrez le mot de passe"
        required
        class="input input-bordered w-full"
      />

      <button type="submit" class="btn btn-primary w-full">Se connecter</button>
    </form>

    <p v-if="message" :class="success ? 'text-green-600' : 'text-red-600'" class="mt-2 text-center">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/connection'

const router = useRouter()
const auth = useAuthStore()
const password = ref('')
const message = ref('')
const success = ref(false)

async function handleLogin() {
  message.value = ''
  success.value = false

  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })

    if (!res.ok) throw new Error('Mot de passe incorrect')

    const json = await res.json()
    auth.setAuth(json.token, json.userId)

    message.value = 'Connexion réussie !'
    success.value = true

    router.push('/') // redirige vers la page principale
  } catch (err) {
    message.value = err.message
  }
}
</script>
