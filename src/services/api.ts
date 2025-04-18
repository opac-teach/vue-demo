import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = 'https://nuxt-demo-blush.vercel.app/api'

const api = axios.create({
  baseURL: API_BASE_URL
})

// Interceptor pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    config.headers.Authorization = `Bearer ${authStore.user?.token}`
  }
  return config
})

export const getMemecoins = async () => {
  const response = await api.get('/get-memecoins')
  return response.data
}

export const createMemecoin = async (memecoin: any) => {
  const authStore = useAuthStore()
  const url = authStore.isAuthenticated ? '/create-memecoin-protected' : '/create-memecoin'
  const response = await api.post(url, memecoin)
  return response.data
}

export const login = async (password: string) => {
  const response = await api.post('/login', { password })
  return response.data
}

export default api
