<template>
  <section class="space-y-8">
    <h1 class="text-2xl font-bold">Memecoins</h1>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Liste</h2>
      <MemecoinList />
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Créer un memecoin</h2>
      <MemecoinForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import MemecoinList from '@/components/memecoins/MemecoinList.vue'
import MemecoinForm from '@/components/memecoins/MemecoinForm.vue'
</script>
