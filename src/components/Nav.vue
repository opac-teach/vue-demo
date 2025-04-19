<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>

      <li v-if="authStore.isAuthenticated">
        <button @click="authStore.logout" class="btn btn-sm">Se déconnecter</button>
      </li>
      <li v-else>
        <RouterLink to="/login" active-class="bg-neutral text-neutral-content">
          Se connecter
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const routes = router.getRoutes().filter((route) => !route.meta?.hide);

const authStore = useAuthStore();
</script>
