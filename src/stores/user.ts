import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref<string | null>(null)
  const userId = ref<string | null>(null)

  function setCredentials(newToken: string, newUserId: string) {
    token.value = newToken
    userId.value = newUserId
  }

  function clearCredentials() {
    token.value = null
    userId.value = null
  }

  return {
    token,
    userId,
    setCredentials,
    clearCredentials
  }
})
