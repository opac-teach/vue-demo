<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Connexion</h1>

      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Entrez le mot de passe"
          />
          <small v-if="error" class="error">{{ error }}</small>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const password = ref('')
const error = ref('')
const loading = ref(false)

onMounted(() => {
  if (userStore.isAuthenticated) {
    router.push('/memecoins')
  }
})

const submitLogin = async () => {
  if (!password.value) {
    error.value = 'Le mot de passe ne peut pas être vide.'
    return
  }

  loading.value = true
  error.value = ''
  try {
    await userStore.login(password.value)
    router.push('/memecoins')
  } catch {
    error.value = 'Mot de passe incorrect.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f2f4f8;
  font-family: 'Inter', sans-serif;
}

.login-card {
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  width: 350px;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
  color: #222;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  background: #007bff;
  color: white;
  border: none;
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}
button:hover {
  background: #0069d9;
}

.error {
  color: #e63946;
  font-size: 0.9rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
