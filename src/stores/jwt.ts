import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useJwt = defineStore('jwt', () => {
  const data = ref<{ token: string; userId: string } | null>(null)

  watch(data, (newValue) => {
    if (newValue) {
      localStorage.setItem('jwt', JSON.stringify(newValue))
    } else {
      localStorage.removeItem('jwt')
    }
  })

  onMounted(() => {
    const storedJwt = localStorage.getItem('jwt')
    if (storedJwt) {
      data.value = JSON.parse(storedJwt)
    }
  })

  return { data }
})
