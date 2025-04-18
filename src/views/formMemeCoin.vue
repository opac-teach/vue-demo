<template>
    <div v-if="authStore.isAuthenticated">
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="name">Nom</label>
                <input v-model="formData.name" type="text" id="name" name="name" placeholder="Nom du MemeCoin" required />
            </div>
  
            <div class="form-control">
                <label for="symbol">Symbole</label>
                <input v-model="formData.symbol" type="text" id="symbol" name="symbol" placeholder="Symbole du MemeCoin" required />
            </div>
  
            <div class="form-control">
                <label for="description">Description</label>
                <textarea v-model="formData.description" id="description" name="description" placeholder="Description du MemeCoin"></textarea>
            </div>
  
            <div class="form-control">
                <label for="logoUrl">Logo URL</label>
                <input v-model="formData.logoUrl" type="text" id="logoUrl" name="logoUrl" placeholder="URL du logo du MemeCoin" />
            </div>
  
            <button type="submit">Créer le MemeCoin</button>
        </form>
    </div>
  
    <div v-else>
        <p>Vous devez être connecté pour créer un MemeCoin.</p>
        <RouterLink to="/authentification">Se connecter</RouterLink>
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
  