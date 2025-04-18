<template>
  <div class="mb-8">
    <h3 class="text-xl font-bold mb-4">Créer un Memecoin</h3>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <div class="form-control w-full">
        <label class="label" for="name">
          <span class="label-text">Nom (4-16 caractères)</span>
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Nom du memecoin"
          class="input input-bordered w-full"
          :class="{ 'input-error': errors.name }"
        />
        <label v-if="errors.name" class="label">
          <span class="label-text-alt text-error">{{ errors.name }}</span>
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label" for="symbol">
          <span class="label-text">Symbole (2-4 caractères, majuscules)</span>
        </label>
        <input
          id="symbol"
          v-model="form.symbol"
          type="text"
          placeholder="SYMB"
          class="input input-bordered w-full"
          :class="{ 'input-error': errors.symbol }"
        />
        <label v-if="errors.symbol" class="label">
          <span class="label-text-alt text-error">{{ errors.symbol }}</span>
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label" for="description">
          <span class="label-text">Description (0-1000 caractères)</span>
        </label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Description du memecoin"
          class="textarea textarea-bordered w-full"
          :class="{ 'input-error': errors.description }"
        ></textarea>
        <label v-if="errors.description" class="label">
          <span class="label-text-alt text-error">{{ errors.description }}</span>
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label" for="logoUrl">
          <span class="label-text">URL du logo (0-200 caractères)</span>
        </label>
        <input
          id="logoUrl"
          v-model="form.logoUrl"
          type="text"
          placeholder="https://example.com/logo.png"
          class="input input-bordered w-full"
          :class="{ 'input-error': errors.logoUrl }"
        />
        <label v-if="errors.logoUrl" class="label">
          <span class="label-text-alt text-error">{{ errors.logoUrl }}</span>
        </label>
      </div>

      <div v-if="apiError" class="text-error mb-2">{{ apiError }}</div>
      <div v-if="success" class="text-success mb-2">Memecoin créé avec succès!</div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading">Création en cours...</span>
        <span v-else>Créer Memecoin</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useMemecoinsStore } from '@/stores/memecoins'

const form = reactive({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const errors = reactive({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const loading = ref(false)
const apiError = ref('')
const success = ref(false)
const store = useMemecoinsStore()

function validateForm() {
  let valid = true

  // Reset errors
  errors.name = ''
  errors.symbol = ''
  errors.description = ''
  errors.logoUrl = ''

  // Validate name
  if (!form.name) {
    errors.name = 'Le nom est obligatoire'
    valid = false
  } else if (form.name.length < 4 || form.name.length > 16) {
    errors.name = 'Le nom doit contenir entre 4 et 16 caractères'
    valid = false
  }

  // Validate symbol
  if (!form.symbol) {
    errors.symbol = 'Le symbole est obligatoire'
    valid = false
  } else if (form.symbol.length < 2 || form.symbol.length > 4) {
    errors.symbol = 'Le symbole doit contenir entre 2 et 4 caractères'
    valid = false
  } else if (!/^[A-Z]+$/.test(form.symbol)) {
    errors.symbol = 'Le symbole doit contenir uniquement des lettres majuscules'
    valid = false
  }

  // Validate description
  if (form.description && form.description.length > 1000) {
    errors.description = 'La description ne peut pas dépasser 1000 caractères'
    valid = false
  }

  // Validate logoUrl
  if (form.logoUrl) {
    if (form.logoUrl.length > 200) {
      errors.logoUrl = 'L\'URL du logo ne peut pas dépasser 200 caractères'
      valid = false
    } else {
      try {
        new URL(form.logoUrl)
      } catch (e) {
        errors.logoUrl = 'L\'URL du logo n\'est pas valide'
        valid = false
      }
    }
  }

  return valid
}

async function submitForm() {
  if (!validateForm()) return

  loading.value = true
  success.value = false
  apiError.value = ''

  try {
    const result = await store.createMemecoin(form)
    if (result) {
      success.value = true
      // Reset form
      form.name = ''
      form.symbol = ''
      form.description = ''
      form.logoUrl = ''
    } else {
      apiError.value = store.error || 'Une erreur est survenue'
    }
  } catch (e: any) {
    apiError.value = e.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>
