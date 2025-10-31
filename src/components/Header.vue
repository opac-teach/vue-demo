<template>
  <header class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <NavMobile />
      </div>
      <img alt="Vue logo" class="w-8 mx-2" src="@/assets/logo.svg" width="125" height="125" />
      <h1 class="text-2xl">Vue Demo</h1>
    </div>
    <Nav />
    <div class="navbar-end">
      <button type="submit" class="btn btn-primary" v-if="isAuthenticated === true" @click="logout">logout</button>
      <button type="submit" class="btn btn-primary" v-else @click="goToLogin">login</button>
      <DarkModeSwitch />
    </div>
  </header>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import NavMobile from '@/components/NavMobile.vue';
import DarkModeSwitch from '@/components/DarkModeSwitch.vue';
import { useTokenStore } from '@/stores/token';
import { computed } from 'vue';
import router from '@/router';
import { use } from 'marked';

const tokenStore = useTokenStore();
const logout = tokenStore.logout;
const isAuthenticated = computed(() => tokenStore.isAuthenticated);


const goToLogin = () => {
  router.push({ name: 'Authentification' });
};
</script>
