import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Memecoin {
  id?: number
  name: string
  symbol: string
  description: string
  logoUrl: string
}

export const useMemecoinsStore = defineStore('memecoins', () => {
  const coins = ref<Memecoin[]>([])

  const setCoins = (data: Memecoin[]) => {
    coins.value = data
  }

  const addCoin = (coin: Memecoin) => {
    coins.value.push(coin)
  }

  return { coins, setCoins, addCoin }
})
