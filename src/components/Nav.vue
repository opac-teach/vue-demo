<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>
      <li v-if="authStore.isAuthenticated">
        <button @click="logout">Se déconnecter</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authentification'

const router = useRouter()
const authStore = useAuthStore()
const routes = router.getRoutes().filter((route) => !route.meta?.hide)

const logout = () => {
  authStore.logout()
  router.push('/authentification')
}
</script>
