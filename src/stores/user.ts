// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref , computed  } from 'vue'

export const useConnexionStore = defineStore('connexion', () => {
  const etatConnexion = ref(false)

  function setConnexion(value: boolean) {
    etatConnexion.value = value
  }
  function setConnexionTrue() {
    etatConnexion.value = true
  }
  function setConnexionFalse() {
    etatConnexion.value = false
  }
  const isConnected = computed(() => etatConnexion.value)


  return {
    etatConnexion,
    setConnexion,
    setConnexionTrue,
    setConnexionFalse,
    isConnected
    
  }
})
