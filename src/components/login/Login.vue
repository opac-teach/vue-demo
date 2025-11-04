<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col justify-center items-center mb-4">
    <label for="password">Mot de passe</label>
    <input class="input m-5" type="password" name="password" id="password" />
    <button class="btn" type="submit">Se connecter</button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FetchLogin } from './FetchLogin.vue'
import { useJwt } from '@/stores/jwt.ts'
import { onMounted } from 'vue'
const router = useRouter()
const jwt = useJwt()

onMounted(() => {
  if (jwt.jwt) {
    router.push('/memecoins')
  }
})

const handleSubmit = async (event: Event) => {
  try {
    await FetchLogin(event)

    router.push('/memecoins')
  } catch (err: any) {
    alert(err.message || 'Une erreur est survenue lors de la connexion')
  }
}
</script>
    