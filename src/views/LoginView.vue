<script setup lang="ts">

import { reactive, watch , ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const isConnected = ref(false);

interface Login {
    password: string;
}

const loginForm = reactive<Login>({
    password: "",
});

function redirectToCoinList() {
    router.push('/ListeCoin');
}

async function login(){
    const url = "https://nuxt-demo-blush.vercel.app/api/login"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginForm)
        });  
        const result = await response.json();
        if (response.ok) {
        alert("Connexion réussie !");
        isConnected.value = true;
        }
        else if (response.status == 401) {
            throw new Error("Mot de passe incorrect");
        }

    } catch (error) {
        alert(" Erreur lors de la connexion: " + error);
        }
    }

      

</script>


<template>
    <div >
        <div >
            <h1 >Veuillez Vous connecter</h1>
        </div>
        <form @submit.prevent="login">
            <label for="password" class="text-xl font-medium text--700">Mot de passe</label>
            <input class = "bg-white text-black" ref="input" required placeholder="" type="password" v-model="loginForm.password"/>
            <button type="submit" >Publier</button>
        </form>
    </div>
</template>

