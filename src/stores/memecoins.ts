import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Memecoin } from '@/types/memecoin'
import { getMemecoins, createMemecoin as apiCreateMemecoin } from '@/services/api'

export const useMemecoinsStore = defineStore('memecoins', () => {
  const memecoins = ref<Memecoin[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchMemecoins() {
    loading.value = true
    error.value = ''
    try {
      memecoins.value = await getMemecoins()
    } catch (e) {
      error.value = 'Failed to load memecoins'
    } finally {
      loading.value = false
    }
  }

  async function createMemecoin(memecoin: Partial<Memecoin>) {
    loading.value = true
    error.value = ''
    try {
      await apiCreateMemecoin(memecoin)
      await fetchMemecoins()
      return true
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create memecoin'
      return false
    } finally {
      loading.value = false
    }
  }

  return { memecoins, loading, error, fetchMemecoins, createMemecoin }
})
