<template>
  <form
    @submit="handleSubmit"
    class="flex flex-col justify-center items-center mb-10"
    v-if="jwt.jwt"
  >
    <label for="name">Name</label>
    <input class="input validator" type="text" name="name" pattern="\w{4,16}" required id="name" />
    <p class="validator-hint">Le nom doit faire entre 4 et 16 caractères.</p>
    <label for="symbol">Symbol</label>
    <input
      class="input validator"
      type="text"
      name="symbol"
      pattern="[A-Z]{2,4}"
      required
      id="symbol"
    />
    <p class="validator-hint">Le symbole doit faire entre 2 et 4 caractères en majuscules.</p>
    <label for="description">Description</label>
    <input class="input" type="text" name="description" pattern=".{0,1000}" id="description" />
    <label for="logoUrl">Logo URL</label>
    <input class="input" type="url" name="logoUrl" id="logoUrl" />
    <button class="btn mt-2" type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Ajout...' : 'Add Coin' }}
    </button>
    <p v-if="submitError" class="text-red-500 mt-2">{{ submitError }}</p>
  </form>
  <template v-else>
    <button class="btn mb-10" @click="$router.push('/login')">Se connecter</button>
  </template>

  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-if="error"
      class="bg-red-500 text-white p-2 rounded w-200 [box-shadow:rgba(17,_17,_26,_0.1)_0px_4px_16px,_rgba(17,_17,_26,_0.1)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px]"
    >
      {{ error }}
    </div>
    <div
      class="card bg-base-100 w-50 shadow-sm border-solid border-2 border-gray-200"
      v-for="content in data"
      :key="content.id"
    >
      <figure>
        <img :src="content.logoUrl" alt="content.symbol" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ content.name }}</h2>
        <p>
          {{ content.description }}
        </p>
        <p>{{ content.owner }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PushCoin } from './FetchCoins.vue'
import { useFetch } from './FetchCoins.vue'
import { useJwt } from '@/stores/jwt.ts'
const jwt = useJwt()

const { data, isLoading, error } = useFetch(
  'https://nuxt-demo-blush.vercel.app/api/get-memecoins',
  true,
)

const isSubmitting = ref(false)
const submitError = ref('')

async function handleSubmit(event: Event) {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await PushCoin(event)
  } catch (err: any) {
    submitError.value = err.message || 'Une erreur est survenue'
  } finally {
    isSubmitting.value = false
  }
}
</script>
