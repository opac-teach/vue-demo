<script setup lang="ts">
import { reactive, ref , watch } from 'vue'

interface createCoin {
    nom: string
    symbol: string
    description: string
    logoUrl: string
}

type Errors = Record<string, string | null >

const form = reactive<createCoin>({
    nom: '',
    symbol: '',
    description: '',
    logoUrl: ''
})

const errors = reactive<Errors>({
    nom: null,
    symbol: null,
    description: null,
    logoUrl: null
})

function publishCoin() {
    if (Object.values(errors).some(error => error !== null)) {
        console.log('Formulaire invalide')
        return
    }
    console.log('Formulaire valide', form)
}

watch(form, (newForm) => {
    form.symbol = newForm.symbol.toUpperCase();
    if (newForm.nom.length < 4 || newForm.nom.length > 12) {
        errors.nom = 'Le nom doit faire entre 4 et 12 caractères'
    }else {
        errors.nom = null
        form.nom = newForm.nom.charAt(0).toUpperCase() + newForm.nom.slice(1);
    }
    if (newForm.symbol.length > 4) {
        errors.symbol = 'Le symbole doit faire entre 2 et 4 caractères'
    }else {
        errors.symbol = null
    } 
    
    if (newForm.description.length > 1000) {
        errors.description = 'La description doit faire maximum 1000 caractères'
    }else {
        errors.description = null           
    }

})
</script>

<template>
    <div class="w-full">
        <h1 class="my-8">Viens créer ta crypto !!!</h1>
        <form @submit.prevent="publishCoin" class="flex flex-col gap-4">
                <label for="nom" class="block">Nom (4-12) :</label>
                <input 
                    v-model="form.nom" 
                    id="nom"
                    class="input w-full"   
                    placeholder="Entrez le nom de la crypto"
                    required
                />
            
                <label for="symbol" class="block">Symbol (2-4) :</label>
                <input 
                    v-model="form.symbol" 
                    id="symbol"
                    class="input w-full"
                    placeholder="Entrez le symbole"
                    required
                />
            
                <label for="description" class="block">Description (0-1000) :</label>
                <textarea 
                    v-model="form.description" 
                    id="description"
                    class="input w-full" 
                    placeholder="Décrivez votre crypto"
                    required
                ></textarea>

                <label for="logoUrl" class="block">LogoUrl (0-200) :</label>
                <input v-model="form.logoUrl" id="logoUrl"class="input w-full" placeholder="Entrez l'URL du logo" required/>
            
                <div v-for="[key, error] in Object.entries(errors)" :key="key">
                    <p v-if="error" class="text-red-500">{{ error }}</p>
                </div>
                <button  type="submit" class="btn btn-primary">
                Soumettre
            </button>
        </form>
    </div>
</template>
