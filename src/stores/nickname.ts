import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNicknameStore = defineStore('nickname', () => {
  const nickname = ref('')

  function setNickname(newNickname: string) {
    nickname.value = newNickname
  }

  function clearNickname() {
    nickname.value = ''
  }

  return { nickname, setNickname, clearNickname }
})
