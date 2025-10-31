<template>
  <section>
    <div v-if="authStore.error" role="alert" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Error! Task failed successfully. {{ authStore.error.message }}</span>
    </div>
    <div v-if="authStore.message" role="alert" class="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{{ authStore.message }}</span>
    </div>
  </section>
  <section class="flex content-center justify-center">
    <form @submit.prevent="authStore.login(password)">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Login</legend>

        <label class="label">Password</label>
        <input type="password" class="input" v-model="password" placeholder="Password" />

        <button v-if="!authStore.isLoading" type="submit" class="btn btn-neutral mt-4">
          Login
        </button>
        <button v-else class="btn btn-disabled">
          <span class="loading loading-spinner"></span>
          Submitting...
        </button>
      </fieldset>
    </form>
  </section>
</template>
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'

const authStore = useAuthStore()
const password = ref('')

watch(
  () => authStore.userId,
  () => {
    router.push('/')
  },
)
</script>
