import { defineStore } from 'pinia'
import { ref, onMounted, watch } from 'vue'

export const useJwt = defineStore('jwt', () => {
  const jwt = ref<null | { token: string; userId: string }>(null)

  watch(jwt, (newJwt) => {
    if (newJwt) {
      localStorage.setItem('jwt', JSON.stringify(newJwt))
    } else {
      localStorage.removeItem('jwt')
    }
  })

  onMounted(() => {
    const storedJwt = localStorage.getItem('jwt')
    if (storedJwt) {
      jwt.value = JSON.parse(storedJwt)
    }
  })
  return { jwt }
})
