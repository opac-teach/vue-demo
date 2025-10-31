<template>
    <!-- From Uiverse.io by Javierrocadev --> 
<div
  class="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
>
  <h2 class="text-2xl font-bold text-white mb-6">Sign in</h2>

  <form @submit.prevent="FetchAuthentication()">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-300" for="name"
        >Full Name</label
      >
      <input
        class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
        type="text"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-300" for="email"
        >Email Address</label
      >
      <input
        class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
        name="email"
        id="email"
        type="email"
      />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-300" for="bio"
        >Password</label
      >
      <input
        class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
        name="password"
        id="password"
        type="password"
        v-model="formData.password"
        required
      />
    </div>

    <div class="flex justify-end">
      <button
        class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
        type="submit"
      >
        Connect
      </button>
    </div>
  </form>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const formData = ref({
    name: '',
    email: '',
    password: ''
});

const FetchAuthentication = async () => {
        try {
            const response = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // on envoie les données du formulaire
                    name: formData.value.name,
                    email: formData.value.email,
                    password: formData.value.password,
                }),
            });
            if (formData.value.password == "admin123") { // simple condition pour simuler une authentification réussie
                console.log('Authentication successful');
                const data = await response.json(); // on récupère la réponse de l'API

                if (data.token) { // on vérifie si le token est présent dans la réponse et on le stocke dans Pinia
                    const tokenStore = useTokenStore();
                    tokenStore.setToken(data.token);
                    console.log('Token stored in Pinia:', data);
                    tokenStore.setUserId(data.userId);
                    router.push({ name: 'MemeCoins' }); // puis redirection vers la page protégée
                } else {
                    console.error('Token not found in response');
                }
            } else {
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
</script>