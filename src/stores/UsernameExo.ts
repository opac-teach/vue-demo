import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsernameStoreExo = defineStore('username', () => {
  const username = ref('')
  function setUsernameExo(name: string) {
    username.value = name
    localStorage.setItem('username', name)
    console.log('saved username')
  }
  function getUsernameExo() {
    console.log('get username')
    username.value = localStorage.getItem('username') || ''
  }

  getUsernameExo()

  return { username, setUsernameExo }
})