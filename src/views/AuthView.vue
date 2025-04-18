<template>
  <div class="flex flex-col items-center max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6">Authentification</h2>

    <form @submit.prevent="handleLogin" class="w-full">
      <div class="form-control w-full">
        <label class="label" for="password">
          <span class="label-text">Mot de passe</span>
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Entrez votre mot de passe"
          class="input input-bordered w-full"
          :class="{ 'input-error': error }"
        />
        <label v-if="error" class="label">
          <span class="label-text-alt text-error">{{ error }}</span>
        </label>
      </div>

      <button type="submit" class="btn btn-primary w-full mt-4" :disabled="loading">
        <span v-if="loading">Connexion en cours...</span>
        <span v-else>Se connecter</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const password = ref('')
const error = ref('')
const loading = ref(false)
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  // Si déjà connecté, rediriger vers la page des exercices
  if (authStore.isAuthenticated) {
    router.push('/exercices')
  }
})

async function handleLogin() {
  if (!password.value) {
    error.value = 'Le mot de passe est requis'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(password.value)
    if (success) {
      router.push('/exercices')
    } else {
      error.value = 'Mot de passe incorrect'
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de la connexion'
  } finally {
    loading.value = false
  }
}
</script>
