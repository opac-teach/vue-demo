<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Exercices Vue.js</h1>

    <MemecoinsTable />

    <div v-if="authStore.isAuthenticated" class="mt-8">
      <MemecoinsForm />
    </div>
    <div v-else class="mt-8">
      <div class="alert">
        <p>Connectez-vous pour pouvoir créer de nouveaux memecoins</p>
        <router-link to="/login" class="btn btn-primary">Se connecter</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MemecoinsTable from '@/components/exercices/MemecoinsTable.vue'
import MemecoinsForm from '@/components/exercices/MemecoinsForm.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
