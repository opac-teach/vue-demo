<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'

// Define interface for the form data structure
interface CreateCoin {
  nom: string
  symbol: string
  description: string
  logoUrl: string
}

// Type for errors (key: field name, value: error message or null)
type Errors = Record<string, string | null>

// Reactive form object
const form = reactive<CreateCoin>({
  nom: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

// Reactive errors object
const errors = reactive<Errors>({
  nom: null,
  symbol: null,
  description: null,
  logoUrl: null
})

// Border color for validation
const borderColor = ref('')

// Watch for form changes and validate them
watch(form, (newForm) => {
  // Validate 'nom'
  if (newForm.nom.length < 4 || newForm.nom.length > 12) {
    errors.nom = 'Le nom doit faire entre 4 et 12 caractères'
  } else {
    errors.nom = null
    form.nom = newForm.nom.charAt(0).toUpperCase() + newForm.nom.slice(1) // Capitalize first letter
  }

  // Validate 'symbol'
  if (newForm.symbol.length < 2 || newForm.symbol.length > 4) {
    errors.symbol = 'Le symbole doit faire entre 2 et 4 caractères'
  } else {
    errors.symbol = null
  }

  // Validate 'description'
  if (newForm.description.length > 1000) {
    errors.description = 'La description doit faire maximum 1000 caractères'
  } else {
    errors.description = null
  }

  // Set border color for symbol input
  borderColor.value = newForm.symbol.length > 4 ? 'red' : 'green'
})

// Fetch data from the API on mounted
async function getData() {
  const url = "https://nuxt-demo-blush.vercel.app/api/get-memecoins";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
}

// Reactive reference for coin list
const coinList = ref<any[]>([]); // any[] because we don't have exact types for coin list items

// Fetch coin list when the component is mounted
onMounted(async () => {
  coinList.value = await getData();
})

// Handle form submission
function publishCoin() {
  if (Object.values(errors).some((error) => error !== null)) {
    console.log('Formulaire invalide')
    return
  }
  console.log('Formulaire valide', form)
}
</script>

<template>
  <div>
    <ul>
      <!-- Displaying the last coin from coinList -->
      <li v-for="coin in coinList.slice(-1)" :key="coin.symbol" class="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex-shrink-0">
          <img :src="coin.logoUrl" alt="Logo du Memecoin" class="w-16 h-16 object-cover rounded-full" />
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-800">{{ coin.name }}</h3>
          <p class="text-sm text-gray-600">Symbole: <span class="font-medium text-gray-900">{{ coin.symbol }}</span></p>
          <p class="text-sm text-gray-600">Propriétaire: <span class="font-medium text-gray-900">{{ coin.owner }}</span></p>
        </div>
      </li>
    </ul>

    <!-- Create Coin Form -->
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
          :style="{ borderColor: borderColor }"
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
        <input v-model="form.logoUrl" id="logoUrl" class="input w-full" placeholder="Entrez l'URL du logo" required />

        <!-- Display errors -->
        <div v-for="[key, error] in Object.entries(errors)" :key="key">
          <p v-if="error" class="text-red-500">{{ error }}</p>
        </div>

        <button type="submit" class="btn btn-primary">Soumettre</button>
      </form>
    </div>
  </div>
</template>
