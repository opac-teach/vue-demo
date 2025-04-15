import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Memecoin {
  name: string
  symbol: string
  description: string
  logoUrl: string
}

export const useMemecoinStore = defineStore('memecoin', () => {
  const memecoins = ref<Memecoin[]>([])

  const fetchMemecoins = async () => {
    try {
      const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');
      if (!response.ok) {
        memecoins.value = [];
        throw new Error('Erreur lors de la récupération des données');
      }

      memecoins.value = await response.json()

    } catch (error) {
      console.error('Error fetching memecoins:', error);
      throw new Error('error');
    }
  }

  const addCoin = (coin: Memecoin) => {
    memecoins.value.push(coin);
  }

  const setToNull = () => {
    memecoins.value = [];
  }

  return { memecoins, fetchMemecoins, addCoin, setToNull }
})


