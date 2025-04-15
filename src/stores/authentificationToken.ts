import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface AuthentificationInfo {
  token: string
  isLoggedIn: boolean
  userId: string
}


export const useAuthentificationStore = defineStore('authentificationInfo', () => {
  const authentificationInfo = reactive<AuthentificationInfo>({
    token: '',
    isLoggedIn: false,
    userId: ''
  })
  const storedInfo = localStorage.getItem('AuthentificationInfo')
  if (storedInfo) {
    const parsedInfo = JSON.parse(storedInfo)
    authentificationInfo.token = parsedInfo.token
    authentificationInfo.isLoggedIn = parsedInfo.isLoggedIn
    authentificationInfo.userId = parsedInfo.userId
  }

  const storeToken = (token : string, userId : string) => {
    authentificationInfo.token = token;
    authentificationInfo.isLoggedIn = true;
    authentificationInfo.userId = userId;

    localStorage.setItem('AuthentificationInfo', JSON.stringify(authentificationInfo) )
  }

  const deconnexion = () => {
    authentificationInfo.token = '';
    authentificationInfo.isLoggedIn = false;
    authentificationInfo.userId = '';
  }

  return { AuthentificationInfo: authentificationInfo, storeToken, deconnexion }
})


