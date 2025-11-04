import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNickname = defineStore('nickname', () => {
  const data = ref('')

  return { data }
})
