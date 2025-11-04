import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userId = ref<string>(localStorage.getItem('userId') || '')

  const isAuthenticated = () => !!token.value

  function login(newToken: string, newUserId: string) {
    token.value = newToken
    userId.value = newUserId
    localStorage.setItem('token', newToken)
    localStorage.setItem('userId', newUserId)
  }

  function logout() {
    token.value = ''
    userId.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  return { token, userId, login, logout, isAuthenticated }
})
