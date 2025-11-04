<template>
  <div class="flex flex-col gap-5 items-center">
    <p>Se connecter</p>
    <form @submit.prevent="confirmMdp" class="flex flex-col p-2 border-2 rounded gap-5">
      <label>Mot de passe</label>
      <input type="text" v-model="mdp" placeholder="tapez votre mot de passe" class="w-50">
      <button class="btn" type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useItemStore } from '@/stores/login'
import { storeToRefs } from 'pinia'

const mdp = ref('')
const store = useItemStore()
const { item } = storeToRefs(store)

const confirmMdp = async () => {
  const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: mdp.value })
  })
  const data = await res.json()
  store.setItem({ id: 1, name: 'token', meta: data.token })
}
</script>
