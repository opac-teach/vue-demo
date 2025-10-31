<template>
    <div class="min-h-screen bg-base-200 p-6">
        <h1 class="text-4xl font-bold text-center mb-8 text-primary">MemeCoins</h1>

        <div class="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <!-- Section MemeCoins (gauche) -->
            <div class="space-y-4">
                <h2 class="text-2xl font-bold mb-4">Nos MemeCoins</h2>

                <div class="space-y-4 max-h-screen overflow-y-auto">
                    <div v-for="coin in memecoin" :key="coin.id"
                        class="card bg-base-100 shadow-xl hover:bg-blue-800 hover:text-white transition-colors duration-300">
                        <div class="card-body">
                            <div class="flex items-center gap-4">
                                <div class="avatar">
                                    <div class="w-16 rounded-full">
                                        <img :src="coin.logoUrl" :alt="`Logo de ${coin.name}`" />
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <h3 class="card-title">{{ coin.name }} ({{ coin.symbol }})</h3>
                                    <p class="text-sm opacity-70">Owner: {{ coin.owner }}</p>
                                    <p class="text-sm">{{ coin.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-if="error" class="alert alert-error mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ error_api }}</span>
                    </div>
                </div>
            </div>

            <!-- Section Formulaire (droite) -->
            <div class="sticky top-6 h-fit mt-25">
                <div
                    class="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                    <h2 class="text-2xl font-bold text-white mb-6">Add a new memecoin</h2>

                    <form @submit.prevent="addMemeCoin">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300" for="name">Name</label>
                            <input class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="text" v-model="newMemeCoin.name" pattern=".[a-zA-Z]{4,16}" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300" for="symbol">Symbol</label>
                            <input class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                name="symbol" id="symbol" type="text" v-model="newMemeCoin.symbol"
                                pattern=".[A-Z]{2,4}" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300" for="description">Description</label>
                            <textarea class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                rows="3" name="description" id="description"
                                v-model="newMemeCoin.description"></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300" for="logoUrl">Url du logo</label>
                            <input class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="url" v-model="newMemeCoin.logoUrl"
                                pattern="/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/" />
                        </div>

                        <div class="flex justify-end">
                            <button
                                class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                type="submit">
                                Ajouter MemeCoin
                            </button>
                        </div>
                        <div>
                            <div v-if="error" class="alert alert-error mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{{ error }}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAddMemeCoin } from '../composables/addMemecoin';
const { memecoin, addMemeCoin, newMemeCoin, error } = useAddMemeCoin();
const error_api = ref<string | null>(null);
onMounted(async () => {
    error_api.value = null;
    try {
        const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
        const data = await response.json();
        console.log(data);
        memecoin.value = data.map((coin: any) => ({
            description: coin.description,
            id: coin.id,
            logoUrl: coin.logoUrl,
            name: coin.name,
            owner: coin.owner,
            symbol: coin.symbol,
        }));
    } catch (error) {
        error_api.value = (error as Error).message;
    }
});

</script>