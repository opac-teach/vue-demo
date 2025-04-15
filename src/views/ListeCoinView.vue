<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const coins = ref([]);

onMounted(() => {
  getCoins();
})


async function getCoins() {
    try {
        const res = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
        const data = await res.json();
        coins.value = data;
    } catch (error) {
        console.error("Erreur de récupération des coins", error);
    }
}

function redirectToCreateCoin() {
    router.push('/CreateCoin');
}

</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl text-center mb-8 text font-bold" >Liste des MemeCoins Disponible sur la plateforme</h1>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <li v-for="coin in coins" :key="coin.id">
                <div class="flex items-center justify-between bg-gray-800 p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img :src="coin.logoUrl" alt="Logo du coin" class="h-16 w-16 rounded-full object-cover mr-4" />
                    <div class="flex flex-col">
                        <span class="text-green-500 font-bold text-xs">{{ coin.name }}</span>
                        <span class=" text-xl font-bold">#{{ coin.symbol }}</span>
                    </div>
                    <button class="btn bg-green-700 text-white text-xs">Acheter</button>
                </div>
            </li>
        </ul>
        <button class="btn" @click="redirectToCreateCoin">Creer votre coin</button>

    </div>
</template>

<style scoped>
.container{max-width: 1200px;}
</style>

