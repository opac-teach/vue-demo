import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export type Memecoin = {
  id: number
  name: string
  symbol: string
  description?: string
  logoUrl?: string
  ownerId?: string | number
}

export const useMemecoinsStore = defineStore('memecoins', () => {
  const items = ref<Memecoin[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const API_LIST = 'https://nuxt-demo-blush.vercel.app/api/get-memecoins'
  const API_CREATE_PROTECTED = 'https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected'

  async function fetchList() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(API_LIST)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      items.value = await res.json()
    } catch (e: any) {
      error.value = e?.message ?? 'Erreur de chargement'
    } finally {
      loading.value = false
    }
  }

  async function createCoin(payload: {
    name: string
    symbol: string
    description?: string
    logoUrl?: string
  }) {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) throw new Error('Connecte-toi pour créer un memecoin.')

    const res = await fetch(API_CREATE_PROTECTED, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth.authHeader,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      throw new Error(txt || `HTTP ${res.status}`)
    }
    return await res.json().catch(() => ({}))
  }

  return { items, loading, error, fetchList, createCoin }
})
