<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in routes" :key="route.path">
        <template v-if="jwt.jwt">
          <template v-if="route.name !== 'Login'">
            <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
              {{ route.name }}
            </RouterLink>
          </template>
        </template>
        <template v-else>
          <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
            {{ route.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useJwt } from '@/stores/jwt.ts'
const jwt = useJwt()
const router = useRouter()
const routes = router.getRoutes().filter((route) => !route.meta?.hide)
</script>
