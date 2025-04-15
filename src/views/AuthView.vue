<template>
    <form @submit.prevent="sendPassword" class="flex flex-col gap-4">
        <label for="password" class="block">Mot de passe:</label>
        <input
        v-model="password"
        id="password"
        class="input w-full"
        placeholder="Entrez le mot de passe"
        required
        />

        <button type="submit" class="btn btn-primary bg-green-500 border-black text-black">Soumettre</button>
    </form>
</template>

<script setup lang="ts">
import { ImportsNotUsedAsValues } from 'typescript';
import { ref } from 'vue';
import { useTokenStore } from "../stores/token";

const tokenStore = useTokenStore()


let password = ref("");


async function sendPassword() {
  try {
    const response = await fetch("https://nuxt-demo-blush.vercel.app/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password.value
      })
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log("Réponse du serveur :", data);

    // Si token -> store
    if (data.token) {
      tokenStore.setToken(data.token);
      localStorage.setItem('token', data.token);
    }

  } catch (error) {
    console.log(`Erreur lors de l'envoi du formulaire : ${error}`);
  }

  password.value = "";
}

</script>