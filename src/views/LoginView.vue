<template>
  <main>
    <h1>Connexion</h1>
    <section id="form-container">
      <h2>Se connecter</h2>
      <form @submit.prevent="handleSubmit" id="form-id">
        <div>
          <label class="form-label">Mot de passe</label>
          <input 
            class="form-input" 
            type="password" 
            v-model="password" 
            placeholder="Entrez votre mot de passe"
            :disabled="auth.isSubmitting"
          />
          <p class="form-p" v-if="auth.loginError" style="color:red">{{ auth.loginError }}</p>
        </div>

        <button id="submit-btn" type="submit" :disabled="auth.isSubmitting">
          {{ auth.isSubmitting ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/auth.ts'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const password = ref('')

async function handleSubmit() {
  if (!password.value.trim()) {
    return
  }

  const success = await auth.login(password.value)
  if (success) {
    router.push('/memecoins')
  }
}
</script>
