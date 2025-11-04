<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="submitLogin">
      <input type="password" v-model="password" placeholder="Mot de passe" /><br/>
      <p v-if="error" style="color:red">{{ error }}</p>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function submitLogin() {
  if (!password.value) {
    error.value = 'Le mot de passe est requis'
    return
  }

  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })

    if (!res.ok) throw new Error('Mot de passe incorrect')

    const data = await res.json()
    auth.login(data.token, data.userId)
    router.push('/mapage')
  } catch {
    error.value = 'Mot de passe incorrect'
  }
}
</script>
