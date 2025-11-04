import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

type LoginResponse = { token: string; userId: string | number }

const API_LOGIN = 'https://nuxt-demo-blush.vercel.app/api/login'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('jwt') || null)
  const userId = ref<string | null>(localStorage.getItem('userId') || null)
  const isAuthenticated = computed(() => !!token.value)

  async function login(password: string) {
    if (!password) throw new Error('Mot de passe requis')
    const res = await fetch(API_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      const msg = await res.text().catch(() => '')
      throw new Error(msg || `HTTP ${res.status}`)
    }
    const data = (await res.json()) as LoginResponse
    token.value = data.token
    userId.value = String(data.userId)
    localStorage.setItem('jwt', token.value)
    localStorage.setItem('userId', userId.value)
  }

  function logout() {
    token.value = null
    userId.value = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('userId')
  }

  /** Header d’auth pour les requêtes protégées */
  const authHeader = computed(() =>
    token.value ? { Authorization: `Bearer ${token.value}` } : {}
  )

  return { token, userId, isAuthenticated, login, logout, authHeader }
})
