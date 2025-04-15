<script setup lang="ts">

import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
type Errors = Record<string, string | null >

interface CreateCoin {
    name: string;
    symbol: string;
    description: string;
    logoUrl: string | undefined;
}

const form = reactive<CreateCoin>({
    name: "",
    symbol: "",
    description: "",
    logoUrl: ""
});

let errors = reactive<Errors>({
    name: null,
    symbol: null,
    description: null,
    logoUrl: null
});

watch(form, (newform) => {
    form.symbol = newform.symbol.toUpperCase();
    if ((newform.name.length < 4 || newform.name.length > 16) && newform.name !== "") {
        errors.name = "Le nom doit faire entre 4 et 16 caracteres";
    } else {
        errors.name = null;
    }
    if ((newform.symbol.length > 4 || newform.symbol.length < 2) && newform.symbol !== "") {
        errors.symbol = "Le symbole doit faire entre 2 et 4 caracteres";
    } else {
        errors.symbol = null;
    }
    if ((newform.description.length > 1000) && newform.description !== "") {
        errors.description = "La description doit faire moins de 1000 caracteres";
    } else {
        errors.description = null;
    }
});

function redirectToCoinList() {
    router.push('/ListeCoin');
}

async function publishCoin(){
    const url = "https://nuxt-demo-blush.vercel.app/api/create-memecoin"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });  
    const result = await response.json();
            alert("Votre coin a été publié avec succès !");
            redirectToCoinList();
        } catch (error) {
            alert("Erreur de connexion au serveur.");
        }
    }
      

</script>


<template>
    <div >

        <div >
            <h1 >Bienvenue sur Create Coin</h1>
        </div>

        <form @submit.prevent="publishCoin">

            <label for="name" class="text-xl font-medium text-gray-700">Nom du coin</label>
            <input ref="input" required placeholder="4-16 caractères" v-model="form.name"/>

            <label for="symbol" class="text-xl font-medium text-gray-700">Symbole</label>
            <input ref="input" required placeholder="2-4 caractères" v-model="form.symbol"/>

            <label for="description" >Description</label>
            <input ref="input" required placeholder="Max 1000 caractères" v-model="form.description"/>

            <label for="logoUrl" >URL du logo de votre coin</label>
            <input  ref="input" placeholder="Non obligatoire" v-model="form.logoUrl"/>

            <div v-for="[key, error] in Object.entries(errors)" :key="key">
                <p v-if="error">{{ error }}</p>
            </div>

            <button type="submit" >Publier</button>
        </form>
    </div>
</template>

