<template>
  <div>
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Authentification</h1>
      <form @submit.prevent="authentificationForm" class="space-y-6">
        <div class="authentification-form">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Mot de Passe
          </label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authentification.ts'
import { useRouter } from 'vue-router'

const formData = ref({
  password: '',
})

const authStore = useAuthStore()
const router = useRouter()

const authentificationForm = async () => {
  if (!formData.value.password) {
    alert("Veuillez fournir le mot de passe")
    return;
  }

  if (formData.value.password !== "admin123") {
    alert("Le mot de passe n'est pas bon")
    return;
  }

  try {
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    });

    if (!response.ok) {
      alert("Erreur lors de l'authentification");
      throw new Error("Erreur lors de l'authentification");
    }

    const result = await response.json();

    authStore.setAuth(result.token, result.userId);

    formData.value = { password: '' };
    alert("Authentification réussie");
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la requête');
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/formMemeCoin')
  }
})
</script>
