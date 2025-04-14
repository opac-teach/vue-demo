<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Connexion</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="password" type="password" placeholder="Mot de passe" class="border rounded w-full p-2" />
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const store = useAuthStore()
const password = ref('')
const error = ref('')
const router = useRouter()

const submit = async () => {
  error.value = ''
  if (!password.value) {
    error.value = 'Mot de passe requis'
    return
  }

  try {
    await store.login(password.value)
    router.push('/exercices')
  } catch (e) {
    error.value = 'Mot de passe incorrect'
  }
}

onMounted(() => {
  if (store.token) router.push('/exercices')
})
</script>
