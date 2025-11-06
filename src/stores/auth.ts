import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('jwtToken') || '')
  const userId = ref<number | null>(
    localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
  )
  const isLoggedIn = ref(!!token.value)

  const login = async (password: string) => {
    try {
      const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) throw new Error('Mot de passe incorrect')
      const data = await res.json()

      token.value = data.token
      userId.value = data.userId
      isLoggedIn.value = true
      localStorage.setItem('jwtToken', data.token)
      localStorage.setItem('userId', data.userId.toString())
      return data
    } catch (error) {
      throw error
    }
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
