<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in visibleRoutes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>
    </ul>

    <!-- Boutons d'authentification -->
    <div class="auth-nav">
      <template v-if="authStore.isLoggedIn">
        <button @click="handleLogout" class="btn">Se déconnecter</button>
      </template>
      <template v-else>
        <router-link to="/login" class="btn">Se connecter</router-link>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

// Ne garder que les routes visibles
const visibleRoutes = computed(() =>
  router.getRoutes().filter(route => !route.meta?.hide)
)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

