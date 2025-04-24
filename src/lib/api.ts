import { useAuthStore } from '@/stores/authStore.ts'

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const auth = useAuthStore()

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${auth.token}`
  }

  return fetch(url, { ...options, headers })
}
