import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
    let token = ref<string>("")
    function setToken(newToken:string) {
        token.value = newToken;
    }

    return { token,setToken}
})