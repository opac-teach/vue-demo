<template>
  <div>
    <header class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/memecoins">Memecoins</router-link>

      <div class="nav-right">
        <button v-if="!userStore.isAuthenticated" @click="router.push('/login')">
          Se connecter
        </button>
        <button v-else @click="logout">Se déconnecter</button>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #007bff;
  color: white;
  padding: 1rem 2rem;
}
.navbar a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}
.nav-right button {
  background: white;
  color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.nav-right button:hover {
  background: #f0f0f0;
}
</style>
