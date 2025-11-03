import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const storedToken = localStorage.getItem('auth_token')
  const storedUserId = localStorage.getItem('auth_userId')
  
  const token = ref<null | string>(storedToken)
  const userId = ref<null | string>(storedUserId)
  const isAuthenticated = computed(() => !!token.value)
  const isSubmitting = ref(false)
  const loginError = ref('')

  async function login(password: string) {
    loginError.value = ''
    isSubmitting.value = true

    try {
      const response = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        loginError.value = errorData.message || 'Erreur lors de la connexion.'
        isSubmitting.value = false
        return false
      }

      const data = await response.json()
      
      token.value = data.token
      userId.value = data.userId
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_userId', data.userId)
      
      isSubmitting.value = false
      return true
    } catch (error) {
      console.error('Error during login:', error)
      loginError.value = 'Erreur réseau lors de la connexion.'
      isSubmitting.value = false
      return false
    }
  }

  function logout() {
    token.value = null
    userId.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_userId')
  }

  return {
    isAuthenticated,
    isSubmitting,
    login,
    logout,
    token,
    userId,
    loginError,
  }
})
