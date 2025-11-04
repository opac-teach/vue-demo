<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>
    </ul>
    <div class="ml-auto flex items-center gap-2">
      <button v-if="auth.jwt" @click="handleLogout" class="btn btn-sm btn-outline">Déconnexion</button>
      <button v-else @click="gotoLogin" class="btn btn-sm btn-primary">Se connecter</button>
    </div>
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
  router.push('/auth')
}
function gotoLogin() {
  router.push('/auth')
}
</script>
