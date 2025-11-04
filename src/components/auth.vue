<template>
  <div class="auth-page">
    <h1>Connexion</h1>
    <form @submit.prevent="submitLogin">
      <input v-model="password" type="password" placeholder="Mot de passe" class="input" />
      <span v-if="error" class="error">{{ error }}</span>
      <button type="submit" class="btn">Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const password = ref('')
const error = ref('')

// Rediriger si déjà connecté
if (authStore.isLoggedIn) {
  router.push('/') // ou une autre page
}

// Soumettre le mot de passe
const submitLogin = async () => {
  error.value = ''
  if (!password.value) {
    error.value = 'Le mot de passe est requis.'
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

    authStore.login(data.token, data.userId)
    router.push('/') // redirige vers la page principale
  } catch (err: any) {
    error.value = err.message || 'Erreur de connexion'
  }
}
</script>

<style scoped>
.input {
  display: block;
  margin-bottom: 5px;
  padding: 6px 10px;
  width: 300px;
}
.btn {
  padding: 6px 12px;
  background: #42b883;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
