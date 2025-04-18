<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in filteredRoutes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>

      <li v-if="!auth.token">
        <RouterLink to="/login" active-class="bg-neutral text-neutral-content">
          Se connecter
        </RouterLink>
      </li>

      <li v-else>
        <button @click="logout">Se déconnecter</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const routes = router.getRoutes()

const auth = useAuthStore()

const filteredRoutes = routes.filter(route => !route.meta?.hide)

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
