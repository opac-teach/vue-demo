<template>
<div>
    <h1>Liste des Memecoins</h1>
    <ul>
        <li v-for="coin in memecoins" :key="coin.id">
            <img :src="coin.logoUrl" :alt="coin.name" width="50" height="50" />
            <strong>{{ coin.name }} ({{ coin.symbol }})</strong> - {{ coin.description }}
        </li>
    </ul>
</div>
<h2>Créer un Memecoin</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom :</label>
        <input id="name" v-model="name" type="text" required />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <div>
        <label for="symbol">Symbole :</label>
        <input id="symbol" v-model="symbol" type="text" required />
        <p v-if="errors.symbol" class="error">{{ errors.symbol }}</p>
      </div>

      <div>
        <label for="description">Description :</label>
        <textarea id="description" v-model="description"></textarea>
      </div>

      <div>
        <label for="logoUrl">URL du logo :</label>
        <input id="logoUrl" v-model="logoUrl" type="url" />
        <p v-if="errors.logoUrl" class="error">{{ errors.logoUrl }}</p>
      </div>

      <button type="submit" :disabled="isSubmitting">Créer</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
</template>

<script lang="ts" setup>


import { onMounted, ref } from 'vue';

interface Memecoin {
id: string;
name: string;
symbol: string;
owner: string;
description: string;
logoUrl: string;
}

const memecoins = ref<Memecoin[]>([]);

// États pour le formulaire
const name = ref('');
const symbol = ref('');
const description = ref('');
const logoUrl = ref('');
const isSubmitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const errors = ref<{ name?: string; symbol?: string; logoUrl?: string }>({});

//je recup les données ici
const fetchMemecoins = async () => {
try {
  const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');
  if (!response.ok) {
    throw new Error('Échec de la récupération des données');
  }
  memecoins.value = await response.json();
} catch (error) {
  console.error('Erreur de récupération des memecoins:', error);
}
};

// Validation du formulaire
const validateForm = () => {
  errors.value = {};

  if (name.value.length < 4 || name.value.length > 16) {
    errors.value.name = 'Le nom doit contenir entre 4 et 16 caractères.';
  }else {

  }
  if (!/^[A-Z]{2,4}$/.test(symbol.value)) {
    errors.value.symbol = 'Le symbole doit être en majuscules (2-4 caractères).';
  }
  if (logoUrl.value && !/^https?:\/\/.+\..+$/.test(logoUrl.value)) {
    errors.value.logoUrl = "L'URL du logo est invalide.";
  }

  return Object.keys(errors.value).length === 0;
};

// Fonction pour envoyer le formulaire
const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        symbol: symbol.value,
        description: description.value,
        logoUrl: logoUrl.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du memecoin.');
    }

    successMessage.value = 'Memecoin créé avec succès !';
    name.value = '';
    symbol.value = '';
    description.value = '';
    logoUrl.value = '';
    await fetchMemecoins();
  } catch (error) {
    errorMessage.value = (error as Error).message;
  } finally {
    isSubmitting.value = false;
  }
};


  onMounted(fetchMemecoins);
  </script>