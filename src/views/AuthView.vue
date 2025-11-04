<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const password = ref('')
const message = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()
onMounted(() => {
  auth.loadFromStorage()
})
watchEffect(() => {
  if (auth.jwt) {
    router.push('/')
  }
})
async function submit() {
  message.value = ''
  if (!password.value) {
    message.value = 'Le mot de passe est requis.'
    return
  }
  loading.value = true
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      message.value = 'Connexion réussie !'
      auth.login(data.userId, data.token)
    } else {
      message.value = data?.message || 'Mot de passe incorrect.'
    }
  } catch (e) {
    message.value = 'Erreur inconnue.'
  } finally {
    loading.value = false
  }
}
</script>
<template>
<h2>Authentification</h2>
<form v-if="!auth.jwt" @submit.prevent="submit">
  <input :disabled="loading" v-model="password" type="password" placeholder="Mot de passe" style="margin-bottom:8px; padding: 7px 10px; border-radius:3px; border:1px solid #d1d5db;" />
  <br />
  <button :disabled="loading" type="submit" style="background:#1d4ed8;color:white;padding:7px 22px;border:0;border-radius:4px;font-weight:bold;">Se connecter</button>
  <div v-if="message" style="margin-top:8px;color:red" v-text="message"></div>
</form>
</template>


