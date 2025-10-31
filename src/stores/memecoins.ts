import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/composables/useFetch'
import { useAuthStore } from './auth'

export interface Coin {
  id?: string
  name: string
  symbol: string
  logoUrl?: string
  owner?: string
  description?: string
}

const authStore = useAuthStore()

export const useMemeCoinsStore = defineStore('memecoins', () => {
  const {
    data: memeCoins,
    isLoading,
    error,
    refresh,
  } = useFetch<Array<Coin>>('https://nuxt-demo-blush.vercel.app/api/get-memecoins')

  const isSubmitting = ref<boolean>(false)

  const submitError = ref<null | Error>(null)

  watch(error, (err) => {
    if (err) {
      console.error('Erreur détectée:', err)
      setTimeout(() => {
        refresh()
      }, 1000)
    }
  })

  function addMemeCoin(coin: Coin) {
    isSubmitting.value = true
    error.value = null
    fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.jwtToken}`,
      },
      body: JSON.stringify(coin),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create coin')
        }
        return response.json()
      })
      .catch((err) => {
        submitError.value = err
        console.error(err)
      })
      .finally(() => {
        isSubmitting.value = false
      })
      .then(() => {
        refresh()
      })
  }

  return { memeCoins, addMemeCoin, isLoading, isSubmitting, error, submitError, refresh }
})
