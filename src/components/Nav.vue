<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in filteredRoutes" :key="route.path">
        <router-link :to="route.path" :class="{ 'bg-neutral': route.path === $route.path }">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </div>
  <div class="navbar-end">
    <div v-if="authStore.isAuthenticated">
      <button class="btn btn-ghost" @click="authStore.logout">Déconnexion</button>
    </div>
    <div v-else>
      <router-link to="/login" class="btn btn-ghost">Se connecter</router-link>
    </div>
    <DarkModeSwitch />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DarkModeSwitch from './DarkModeSwitch.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const filteredRoutes = computed(() => {
  return router.options.routes.filter((route) => !route.meta?.hide)
})
</script>
