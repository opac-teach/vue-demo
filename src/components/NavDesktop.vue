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
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes().filter((route) => !route.meta?.hide)
</script>
