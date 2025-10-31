import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string | null>(null)
  const jwtToken = ref<string | null>(null)

  if (localStorage.getItem('userId') && localStorage.getItem('jwtToken')) {
    userId.value = localStorage.getItem('userId')
    jwtToken.value = localStorage.getItem('jwtToken')
  }

  const error = ref<Error | null>(null)

  const message = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  async function login(password: string) {
    isLoading.value = true
    error.value = null
    message.value = null

    try {
      const response = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const res = await response.json()

      if (!response.ok) throw new Error(res?.message || 'Une erreur est survenue')

      userId.value = res.userId
      jwtToken.value = res.token
      message.value = res.message

      if (res.userId && res.token) {
        localStorage.setItem('userId', res.userId)
        localStorage.setItem('jwtToken', res.token)
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }
  function logout() {
    userId.value = null
    jwtToken.value = null
    localStorage.removeItem('userId')
    localStorage.removeItem('jwtToken')
  }

  return { userId, jwtToken, error, message, isLoading, login, logout }
})
