<script setup lang="ts">
import { reactive, ref, watch, onMounted, toRaw } from 'vue'

const isResetting = ref(false)

interface CreateCoin {
  name: string
  symbol: string
  description: string
  logoUrl: string
}

type Errors = Record<string, string | null>

const form = reactive<CreateCoin>({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

let errors = reactive<Errors>({
  name: null,
  symbol: null,
  description: null,
  logoUrl: null
})

const borderColor = ref('')

watch(form, (newForm) => {
  if (isResetting.value) return;

  form.symbol = newForm.symbol.toUpperCase()
  if (newForm.name.length < 4 || newForm.name.length > 12) {
    errors.name = 'Le nom doit faire entre 4 et 12 caractères'
  } else {
    errors.name = null
    form.name = newForm.name.charAt(0).toUpperCase() + newForm.name.slice(1)
  }

  if (newForm.symbol.length < 2 || newForm.symbol.length > 4) {
    errors.symbol = 'Le symbole doit faire entre 2 et 4 caractères'
  } else {
    errors.symbol = null
  }

  if (newForm.description.length > 1000) {
    errors.description = 'La description doit faire maximum 1000 caractères'
  } else {
    errors.description = null
  }

  borderColor.value = newForm.symbol.length > 4 ? 'red' : 'green'
})

async function getData() {
  const url = "https://nuxt-demo-blush.vercel.app/api/get-memecoins";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const coinList = ref<any[]>([]);

onMounted(async () => {
  coinList.value = await getData();
})

function publishCoin() {
  if (Object.values(errors).some((error) => error !== null)) {
    console.log('Formulaire invalide')
    return
  }
  console.log('Formulaire valide', form)
  const formRaw = toRaw(form);
  console.log(formRaw);
  fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formRaw)
  }).then(async () => {
    const data = await getData();
    coinList.value = data;
  })
  .catch((error) => {
    console.error("Erreur lors de l'envoi du formulaire:", error);
  });
  isResetting.value = true
  form.name = "";
  form.symbol = "";
  form.description = "";
  form.logoUrl = "";

  getData();
  
  errors.name= null;
  errors.symbol= null;
  errors.description= null;
  errors.logoUrl= null;
  setTimeout(() => {
    isResetting.value = false;
  },0)
}
</script>

<template>
  <div>
    <ul>
      <li v-for="coin in coinList.slice(-3)" :key="coin.symbol" class="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex-shrink-0">
          <img :src="coin.logoUrl" alt="Logo du Memecoin" class="w-16 h-16 object-cover rounded-full" />
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-green-800">{{ coin.name }}</h3>
          <p class="text-sm text-green-600">Symbole: <span class="font-medium text-red-900">{{ coin.symbol }}</span></p>
          <p class="text-sm text-green-600">Propriétaire: <span class="font-medium text-red-900">{{ coin.owner }}</span></p>
        </div>
      </li>
    </ul>

    <div class="w-full">
      <h1 class="my-8">Viens créer ta crypto !!!</h1>
      <form @submit.prevent="publishCoin" class="flex flex-col gap-4">
        <label for="name" class="block">Nom (4-12) :</label>
        <input
          v-model="form.name"
          id="name"
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

        <div v-for="[key, error] in Object.entries(errors)" :key="key">
          <p v-if="error" class="text-red-500">{{ error }}</p>
        </div>

        <button type="submit" class="btn btn-primary">Soumettre</button>
      </form>
    </div>
  </div>
</template>
