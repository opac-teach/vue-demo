<template>
  <div>
    <h3 class="text-xl font-bold mb-4">Liste des Memecoins</h3>
    <div v-if="store.loading">Chargement...</div>
    <div v-else-if="store.error" class="text-error">{{ store.error }}</div>
    <div v-else-if="store.memecoins.length === 0" class="text-gray-500">
      Aucun memecoin trouvé
    </div>
    <div v-else class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nom</th>
            <th>Symbole</th>
            <th>Description</th>
            <th>Propriétaire</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in store.memecoins" :key="coin.id">
            <td>
              <img
                v-if="coin.logoUrl"
                :src="coin.logoUrl"
                alt="logo"
                class="w-8 h-8 rounded-full"
              />
              <div v-else class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                {{ coin.symbol.charAt(0) }}
              </div>
            </td>
            <td>{{ coin.name }}</td>
            <td>{{ coin.symbol }}</td>
            <td>{{ coin.description || '-' }}</td>
            <td>{{ coin.owner || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemecoinsStore } from '@/stores/memecoins'

const store = useMemecoinsStore()

onMounted(() => {
  store.fetchMemecoins()
})
</script>
