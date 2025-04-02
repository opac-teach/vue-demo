<template>
  <div class="">
    <span>username: {{ usernameStore.username }}</span>
    <input class="input" v-model="username" />
    <button class="btn" @click="usernameStore.setUsername(username)">Set username</button>
  </div>
</template>

<script setup lang="ts">
import { useUsernameStore } from '@/stores/username'
import { ref } from 'vue'

const usernameStore = useUsernameStore()
const username = ref('')
</script>
