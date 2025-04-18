<template>
    <div>
        <h1>Liste des Memecoins</h1>
        <p v-if="error" class="error">{{ error }}</p>
  
        <ul v-if="!error">
            <li v-for="coin in memecoins" :key="coin.id">
                <img :src="coin.logoUrl" :alt="`Logo de ${coin.name}`" />
                <strong>{{ coin.name }} ({{ coin.symbol }})</strong><br>
                Description: {{ coin.description }}<br>
                Propriétaire: {{ coin.owner }}
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
  
interface MemeCoin {
    id: string
    name: string
    symbol: string
    owner: string
    description: string
    logoUrl: string
}
  
const memecoins = ref<MemeCoin[]>([])
const error = ref<string | null>(null)
  
const fetchMemecoins = async (): Promise<void> => {
    try {
        const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
        if (!response.ok) throw new Error('Erreur lors du chargement des données')
        const data: MemeCoin[] = await response.json()
        memecoins.value = data
    } catch (err: any) {
        error.value = err.message || 'Une erreur est survenue'
    }
}
onMounted(fetchMemecoins)

</script>

  