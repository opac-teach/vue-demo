<script setup lang="ts">
import { ref } from 'vue';

const datas = ref([]);

async function getCrypto() {
    try {
        const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');
        datas.value = await res.json();
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

getCrypto();
</script>

<template>
    <div>
        <h2 class="my-8">Bienvenue sur la page exercices !!</h2>

        <ul v-if="datas.length > 0">
            <li v-for="crypto in datas" :key="crypto.id">
                {{ crypto.name }} - {{ crypto.description }}
            </li>
        </ul>
        <p v-else>Chargement des données...</p>
    </div>
</template>
