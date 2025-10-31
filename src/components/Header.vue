<template>
  <header class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <NavMobile />
      </div>
      <img alt="Vue logo" class="w-8 mx-2" src="@/assets/logo.svg" width="125" height="125" />
      <h1 class="text-2xl">Vue Demo</h1>
    </div>
    <Nav />
    <div class="navbar-end">
      <router-link v-if="!authStore.userId" to="/auth" class="btn btn-primary">Login</router-link>
      <div v-else class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="avatar avatar-placeholder m-1">
          <div class="bg-neutral text-neutral-content w-12 rounded-full">
            <span>{{ authStore.userId.slice(0, 2) }}</span>
          </div>
        </div>
        <div
          tabindex="-1"
          class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <div class="mx-1 my-2">
            <h2>Profile</h2>
            <ul>
              <li>User ID: {{ authStore.userId }}</li>
            </ul>
          </div>
          <hr />
          <menu class="mx-1 my-2">
            <button v-if="authStore.userId" class="link link-warning" @click="authStore.logout">
              Logout
            </button>
          </menu>
        </div>
      </div>
      <DarkModeSwitch />
    </div>
  </header>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue'
import NavMobile from '@/components/NavMobile.vue'
import DarkModeSwitch from '@/components/DarkModeSwitch.vue'
import { useUsernameStore } from '@/stores/username'
import { useAuthStore } from '@/stores/auth'

const usernameStore = useUsernameStore()
const authStore = useAuthStore()
</script>
