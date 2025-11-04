<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
  <div>
    <button v-if="auth.isAuthenticated()" @click="handleLogout">Déconnexion</button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const routes = router.getRoutes().filter((route) => !route.meta?.hide)

const auth = useAuthStore()

function handleLogout() {
  auth.logout()              
  router.push('/connexion')  
}
</script>
