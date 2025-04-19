<template>
<div class="login-page">
    <h1>Connexion</h1>

    <form @submit.prevent="login">
    <div>
        <label for="password">Mot de passe :</label>
        <input
            id="password"
            v-model="password"
            type="password"
            required
        />
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>

    <button type="submit">Se connecter</button>
  </form>
</div>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth.ts';
  
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  const authStore = useAuthStore();
  
  onMounted(() => {
    if (authStore.isAuthenticated) {
      router.push('/exercices'); // redirige si déjà connecté
    }
  });
  
  const login = async () => {
    if (!password.value) {
      errorMessage.value = 'Le mot de passe est requis.';
      return;
    }
  
    try {
      const res = await fetch('https://nuxt-demo-blush.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.value }),
      });
  
      if (!res.ok) throw new Error('Mot de passe incorrect');
  
      const data = await res.json();
      authStore.setAuth(data.token, data.userId);
      router.push('/exercices');
    } catch (err) {
      errorMessage.value = (err as Error).message;
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
    margin-top: 5px;
  }
  </style>
  