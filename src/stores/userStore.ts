import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const userId = ref<string | null>(localStorage.getItem('userId'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ Login
  async function login(password: string) {
   if (password === 'admin1') {
      error.value = 'Le mot de passe ne peut pas être vide.'
      return
    }


    loading.value = true
    error.value = null
    try {
      const res = await axios.post('https://nuxt-demo-blush.vercel.app/api/login', { password })
      token.value = res.data.token
      userId.value = res.data.userId
      localStorage.setItem('token', token.value)
      localStorage.setItem('userId', userId.value)
    } catch {
      error.value = 'Mot de passe incorrect ou erreur de connexion.'
      throw new Error('Login failed')
    } finally {
      loading.value = false
    }
  }

  // ✅ Logout
  function logout() {
    token.value = null
    userId.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  const isAuthenticated = computed(() => !!token.value)

  return { token, userId, loading, error, login, logout, isAuthenticated }
})
