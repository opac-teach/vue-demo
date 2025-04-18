import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref<string | null>(null)

  // 1️⃣ Initialisation automatique : on regarde dans localStorage
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    token.value = storedToken
  }

  // 2️⃣ Quand on set, on le met aussi dans localStorage
  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  return { token, setToken }
})
