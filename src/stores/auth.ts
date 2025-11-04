import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '',
    userId: '',
  }),
  actions: {
    login(userId: string, jwt: string) {
      this.jwt = jwt
      this.userId = userId
      localStorage.setItem('jwt', jwt)
      localStorage.setItem('userId', userId)
    },
    logout() {
      this.jwt = ''
      this.userId = ''
      localStorage.removeItem('jwt')
      localStorage.removeItem('userId')
    },
    loadFromStorage() {
      this.jwt = localStorage.getItem('jwt') || ''
      this.userId = localStorage.getItem('userId') || ''
    },
  },
})
