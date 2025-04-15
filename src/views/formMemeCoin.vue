<template>
    <div v-if="authStore.isAuthenticated" class="flex justify-center items-center min-h-screen">
      <form
        @submit.prevent="submitForm"
        class="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 class="text-2xl font-bold text-gray-800 text-center">Créer un MemeCoin</h2>
  
        <div class="form-control">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            placeholder="Nom du MemeCoin"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
  
        <div class="form-control">
          <label for="symbol" class="block text-sm font-medium text-gray-700 mb-1">Symbole</label>
          <input
            v-model="formData.symbol"
            type="text"
            id="symbol"
            name="symbol"
            placeholder="Symbole du MemeCoin"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
  
        <div class="form-control">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            name="description"
            placeholder="Description du MemeCoin"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows="4"
          ></textarea>
        </div>
  
        <div class="form-control">
          <label for="logoUrl" class="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            v-model="formData.logoUrl"
            type="text"
            id="logoUrl"
            name="logoUrl"
            placeholder="URL du logo du MemeCoin"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          Créer le MemeCoin
        </button>
      </form>
    </div>
  
    <div v-else class="text-center mt-20">
      <p class="text-lg text-gray-700 mb-4">Vous devez être connecté pour créer un MemeCoin.</p>
      <RouterLink
        to="/authentification"
        class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Se connecter
      </RouterLink>
    </div>
  </template>
<script setup lang="ts">
    import { ref } from 'vue'
    import { useAuthStore } from '@/stores/authentification'
    import { RouterLink } from 'vue-router'
  
    const authStore = useAuthStore()
  
    const formData = ref({
        name: '',
        symbol: '',
        description: '',
        logoUrl: ''
    })
  
    const submitForm = async () => {
        if (!formData.value.name || !formData.value.symbol) {
            alert('Veuillez remplir tous les champs obligatoires.')
            return
        }
  
        if (
            formData.value.name.length < 4 ||
            formData.value.name.length > 16 ||
            formData.value.symbol.length < 2 ||
            formData.value.symbol.length > 4 ||
            formData.value.logoUrl.length > 200 ||
            formData.value.description.length > 1000
        ) {
            alert('Faites attention aux limites de caractères :\nNom : 4-16 caractères\nSymbole : 2-4 caractères\nLogo URL : 200 caractères max\nDescription : 1000 caractères max')
            return
        }
  
        console.log(JSON.stringify(formData.value))
  
        try {
            const response = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authStore.token}`
            },
            body: JSON.stringify(formData.value)
        })
  
        if (!response.ok) {
            alert('Erreur lors de la création du MemeCoin')
            return
        }
  
        formData.value = { name: '', symbol: '', description: '', logoUrl: '' }
        alert('MemeCoin créé avec succès !')
        } catch (error) {
            console.error(error)
            alert('Erreur lors de la requête')
        }
    }
</script>
  