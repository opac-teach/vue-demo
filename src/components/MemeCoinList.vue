<template>
  <div class="w-full m-full">
    <h1>MemeCoins :</h1>
    <br>
    <ul v-if="memeCoinStore.memecoins.length > 0" class="flex flex-wrap gap-4 justify-center">
      <li v-for="(memecoin, key) in memeCoinStore.memecoins" :key="key"
        class="bg-white rounded-2xl shadow-md p-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-start gap-2">
        <h2 class="text-xl font-semibold text-indigo-600">{{ memecoin.name }}</h2>
        <p class="text-sm text-gray-700">Symbole : <span class="font-medium">{{ memecoin.symbol }}</span></p>
        <p class="text-sm text-gray-700">{{ memecoin.description }}</p>

        <div v-if="memecoin.logoUrl" class="mt-2">
          <p class="text-sm text-gray-500 mb-1">Logo :</p>
          <img :src="memecoin.logoUrl" alt="Logo du MemeCoin"
            class="w-16 h-16 object-contain rounded-md border border-gray-200" />
        </div>
      </li>
    </ul>
    <p v-else>No results</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemecoinStore } from '@/stores/memecoin.ts';

const memeCoinStore = useMemecoinStore();


onMounted(async () => {
  await memeCoinStore.fetchMemecoins();
});
</script>
