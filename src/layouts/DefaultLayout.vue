<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
  
<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex flex-1 container mx-auto w-screen-lg max-w-screen-lg w-full p-8">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
