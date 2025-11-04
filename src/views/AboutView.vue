<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

watchEffect(() => {
  if (auth.isAuthenticated) router.replace('/memecoins')
})

async function submit() {
  errorMsg.value = ''
  try {
    loading.value = true
    await auth.login(password.value) 
    router.push('/memecoins')
  } catch (e: any) {
    errorMsg.value = e?.message ?? 'Échec de connexion'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="space-y-4 max-w-md">
    <h1 class="text-2xl font-bold">Authentification</h1>

    <form class="space-y-3" @submit.prevent="submit">
      <div>
        <label class="block text-sm">Mot de passe</label>
        <input
          v-model.trim="password"
          type="password"
          class="border rounded px-2 py-1 w-full"
          placeholder="********"
          required
        />
      </div>

      <button
        class="border rounded px-3 py-1 hover:bg-neutral-800 disabled:opacity-50"
        :disabled="loading || !password"
      >
        {{ loading ? 'Connexion…' : 'Se connecter' }}
      </button>

      <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
    </form>
  </section>
</template>
