<template>
  <div class="">
    <span>username: {{ userStore.username }}</span>
    <input class="input" v-model="username" />
    <button class="btn" @click="userStore.setUsername(username)">Set username</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts'
import { ref } from 'vue'

const userStore = useUserStore()
const username = ref('')
</script>
