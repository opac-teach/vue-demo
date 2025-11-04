<template>
  <div>
    <div v-if="isLoading">Chargement...</div>
    <div v-else-if="error">
      <div class="w-70">
        <p>Liste introuvable</p>
      </div>
    </div>
    <div v-else class="flex flex-col gap-5">
      <div v-for="t in data" :key="t.id" class="flex items-center">
        <img :src="t.logoUrl" alt="" class="w-20 h-20 rounded-l" />
      <div class=" bg-blue-900 pl-3 w-50 h-20 rounded-r">
        <div class="font-bold">{{ t.name }} ({{ t.symbol }})</div>
        <div>Owner: {{ t.owner }}</div>
        <div v-if="t.description === ''">Pas de description</div>
        <div v-else>{{ t.description }}</div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script setup lang="ts">
import { useFetch } from '../composables/fetchAPI.ts'
const { data, isLoading, error } = useFetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', true)
</script>