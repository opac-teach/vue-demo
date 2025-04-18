import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/auth'
import { login as apiLogin } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  // Charger depuis le localStorage au démarrage
  if (localStorage.getItem('user')) {
    try {
      user.value = JSON.parse(localStorage.getItem('user') || '')
    } catch (e) {
      localStorage.removeItem('user')
    }
  }

  const isAuthenticated = computed(() => !!user.value)

  async function login(password: string) {
    try {
      const data = await apiLogin(password)
      user.value = {
        id: data.userId,
        token: data.token
      }
      // Stocker dans localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (error) {
      return false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isAuthenticated, login, logout }
})
