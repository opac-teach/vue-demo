import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNickName = defineStore('nickName', () => {
  const nickName = ref('')
  return { nickName }
})
