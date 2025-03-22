<template>
  <ul
    tabindex="0"
    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  >
    <li
      class=""
      @click="(e: Event) => (e.target as HTMLElement)?.blur()"
      v-for="route in routes"
      :key="route.path"
    >
      <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
        {{ route.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes().filter((route) => !route.meta?.hide)
</script>
