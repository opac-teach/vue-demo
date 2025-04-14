import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  userId: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId')
  }),
  actions: {
    async login(password: string) {
      const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (!res.ok) throw new Error('Mot de passe incorrect')
      const data = await res.json()

      this.token = data.token
      this.userId = data.userId

      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
    },
    logout() {
      this.token = null
      this.userId = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
})
