<template>
  <div class="max-w-2xl mx-auto w-full">
    <h1 class="font-bold text-2xl">Authentification</h1>
    <form
      @submit.prevent="onSubmit"
      @input="updateFormValidity"
      ref="formRef"
      class="flex flex-col gap-4"
    >
      <div class="flex flex-col gap-2">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          autocomplete="current-password"
          required
          class="input validator w-full"
        />
        <p class="validator-hint hidden">Veuillez saisir un mot de passe</p>
      </div>
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <p v-if="success" class="text-green-500">{{ success }}</p>
      <button class="btn w-full" :disabled="isSubmitting || !isFormValid">Soumettre</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useJwt } from '@/stores/jwt'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const error = ref<string | null>(null)
const success = ref<string | null>(null)
const isSubmitting = ref(false)
const formRef = ref<HTMLFormElement | null>(null)
const isFormValid = ref(false)
const jwt = useJwt()
const router = useRouter()

const updateFormValidity = () => {
  if (formRef.value) {
    isFormValid.value = formRef.value.checkValidity()
  }
}

const onSubmit = (e: Event) => {
  error.value = null
  success.value = null

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const password = formData.get('password')

  isSubmitting.value = true
  fetch('https://nuxt-demo-blush.vercel.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((data) => {
      isSubmitting.value = false
      if (data.error) {
        error.value = data.message
        return
      }

      success.value = data.message
      jwt.data = { token: data.token, userId: data.userId }
      router.push('/memecoins')
    })
    .catch((err) => {
      isSubmitting.value = false
      console.error(err)
      error.value = 'La connexion a échouée'
    })
}
</script>
