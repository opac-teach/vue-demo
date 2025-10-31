<template>
  <section class="h-15">
    <div v-if="memeCoins.error || memeCoins.submitError" role="alert" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current z-50"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ memeCoins.error?.message }}{{ memeCoins.submitError?.message }} Erreur</span>
    </div>
  </section>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-base-300">
    <section class="md:col-span-2 grid gap-2">
      <MemeCoinCard v-for="(coin, index) in memeCoins.memeCoins" :key="index" :coin="coin" />
      <div v-if="memeCoins.isLoading">
        <span class="loading loading-spinner loading-xl"></span>
      </div>
    </section>
    <section class="md:col-span-1">
      <form v-if="authStore.userId" @submit.prevent="submitForm">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend class="fieldset-legend">Submit MemeCoin</legend>

          <label class="label">Name</label>
          <input
            type="text"
            class="input validator"
            placeholder="name"
            name="name"
            v-model="coinInput.name"
            required
            minlength="4"
            maxlength="16"
          />
          <p class="validator-hint">Must be 4 to 16 characters</p>

          <label class="label">symbol</label>
          <input
            type="text"
            class="input validator"
            placeholder="symbol"
            name="symbol"
            v-model="coinInput.symbol"
            required
            pattern="[A-Z]{2,4}"
            minlength="2"
            maxlength="4"
            title="Only letters, numbers or dash"
          />
          <p class="validator-hint">
            Must be 2 to 4 characters containing only Capital letters, numbers or dash
          </p>

          <label class="label">Logo Url</label>
          <input
            type="text"
            class="input validator"
            placeholder="https://"
            name="logoUrl"
            v-model="coinInput.logoUrl"
            pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
            min-length="0"
            max-length="200"
          />
          <p class="validator-hint">Must be valid URL</p>

          <label class="label">Description</label>
          <input
            type="text"
            class="input"
            placeholder="description"
            name="description"
            v-model="coinInput.description"
            minlength="0"
            maxlength="200"
          />
          <p class="validator-hint">Must be valid URL</p>

          <button v-if="!memeCoins.isSubmitting" class="btn btn-neutral mt-4">Submit</button>
          <button v-else class="btn btn-disabled">
            <span class="loading loading-spinner"></span>
            Submitting...
          </button>
        </fieldset>
      </form>
      <div v-else class="card bg-neutral text-neutral-content w-96">
        <div class="card-body items-center text-center">
          <h2 class="card-title">Connexion</h2>
          <p>Vous devez être connecté pour ajouter une pièce</p>
          <div class="card-actions justify-end">
            <router-link class="btn btn-primary" to="/auth">Login</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import MemeCoinCard from '@/components/exercices/MemeCoinCard.vue'
import { reactive } from 'vue'
import { useMemeCoinsStore, type Coin } from '@/stores/memecoins'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const memeCoins = useMemeCoinsStore()

const coinInput = reactive<Coin>({
  name: '',
  symbol: '',
  logoUrl: '',
  owner: '',
  description: '',
})

function submitForm() {
  memeCoins.addMemeCoin(coinInput)
}
</script>
