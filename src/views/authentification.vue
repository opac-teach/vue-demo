<template>
    <div>
        <form @submit.prevent="authentificationForm">
            <div class="authentification-form">
                <label for="password">Mot de Passe</label>
                <input v-model="formData.password" type="text" id="password" name="password" placeholder="Mot de passe"  required/> 
            </div>
            <button type="submit">Se connecter</button>    
        </form>
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
