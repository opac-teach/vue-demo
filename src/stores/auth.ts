import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('jwtToken') || '')
  const userId = ref<number | null>(localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null)
  const isLoggedIn = ref(!!token.value)

  const login = (jwt: string, id: number) => {
    token.value = jwt
    userId.value = id
    isLoggedIn.value = true
    localStorage.setItem('jwtToken', jwt)
    localStorage.setItem('userId', id.toString())
  }

  const logout = () => {
    token.value = ''
    userId.value = null
    isLoggedIn.value = false
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userId')
  }

  return { token, userId, isLoggedIn, login, logout }
})
