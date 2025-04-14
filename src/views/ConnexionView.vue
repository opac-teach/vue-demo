<script setup lang="ts">
import { reactive, ref , watch } from 'vue'


const etatconnexion = ref(false)

interface login {
  password: string
}

type Errors = Record<string, string | null>

const form = reactive<login>({
  password: ''
})

const errors = reactive<Errors>({
  password: null,
})

const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null) // ← ajouté ici

async function loginTest() {
  if (Object.values(errors).some(error => error !== null)) {
    console.log('Formulaire invalide')
    return
  }

  try {
    const body = JSON.stringify(form)
    console.log('Formulaire soumis:', body)
    const response = await fetch("https://nuxt-demo-blush.vercel.app/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })

    if (!response.ok) {
      if (response.status === 401) {
        console.log("Mot de passe incorrect")
        errorMessage.value = "Mot de passe incorrect"
      }
      throw new Error(`Échec de la requête: ${response.status}`)
    }

    etatconnexion.value = true
    successMessage.value = 'Vous êtes connecté !'
    errorMessage.value = null // ← reset en cas de succès
    console.log('Vous êtes connecté ', form)
    form.password = ''

    setTimeout(() => {
      successMessage.value = null
    }, 2000)

  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error)
  }
}

watch(form, (newForm) => {
  if (newForm.password.length < 4) {
    errors.password = 'Le password doit faire + de 4 caractères'
  } else {
    errors.password = null
  }
})

</script>
<template>
  <div class="w-full">
    <h1 class="text-4xl font-bold text-center text-primary mb-6">Connecte-toi !</h1>
    <form @submit.prevent="loginTest" class="flex flex-col gap-4">
      <label for="password" class="block">Password :</label>
      <input 
        v-model="form.password" 
        id="password"
        class="input w-full"   
        placeholder="Entrez le password"
        required
      />

      <!-- Message d'erreur de validation -->
      <div v-for="[key, error] in Object.entries(errors)" :key="key">
        <p v-if="error" class="text-red-500">{{ error }}</p>
      </div>

      <!-- Message d'erreur API -->
      <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>

      <!-- Message de succès -->
      <p v-if="successMessage" class="text-green-500 mt-4 text-center">{{ successMessage }}</p>

      <button type="submit" class="btn btn-primary">
        Se connecter
      </button>
    </form>
  </div>
</template>
