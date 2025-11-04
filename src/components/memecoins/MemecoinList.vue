<template>
  <div class="space-y-2">
    <div v-if="store.loading">Chargement…</div>
    <div v-else-if="store.error" class="text-red-500">Erreur : {{ store.error }}</div>
    <ul v-else class="space-y-2">
      <li v-for="m in store.items" :key="m.id" class="flex items-center gap-3">
        <img v-if="m.logoUrl" :src="m.logoUrl" class="h-6 w-6 rounded" alt="" />
        <div>
          <p class="font-semibold">{{ m.name }} ({{ m.symbol }})</p>
          <p v-if="m.description" class="opacity-80 text-sm">{{ m.description }}</p>
        </div>
      </li>
    </ul>
    <button class="border rounded px-3 py-1 hover:bg-neutral-800" @click="store.fetchList">Rafraîchir</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemecoinsStore } from '@/stores/memecoins'

const store = useMemecoinsStore()
onMounted(() => { if (!store.items.length) store.fetchList() })
</script>
