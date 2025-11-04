<template>
  <main class="flex flex-col gap-4">
    <h1 class="font-bold text-2xl">Nos meilleurs Meme Coins</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
      <fieldset class="flex flex-col gap-2 border p-4 rounded">
        <legend class="font-bold text-xl px-3">Créer un Memecoin</legend>
        <form
          v-if="jwt.data"
          @submit.prevent="onSubmit"
          @input="updateFormValidity"
          ref="formRef"
          class="flex flex-col gap-2 mb-4"
        >
          <div class="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder="Nom du Memecoin"
              class="input validator w-full"
              minlength="4"
              maxlength="16"
              required
            />
            <div class="validator-hint hidden">Le nom doit être entre 4 et 16 caractères.</div>
          </div>
          <div class="flex flex-col gap-2">
            <input
              type="text"
              name="symbol"
              placeholder="Symbole"
              class="input validator w-full"
              pattern="[A-Z0-9]{2,4}"
              required
              @input="
                (e) => {
                  const t = e.target as HTMLInputElement
                  t.value = t.value.toUpperCase()
                }
              "
            />
            <div class="validator-hint hidden">
              Le symbole doit être entre 2 et 4 caractères majuscules.
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <textarea
              name="description"
              placeholder="Description"
              class="textarea validator w-full"
              maxlength="1000"
            ></textarea>
            <div class="validator-hint hidden">
              La description doit faire moins de 1000 caractères.
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <input
              type="url"
              name="logoUrl"
              placeholder="URL du logo"
              class="input validator w-full"
              maxlength="200"
            />
            <div class="validator-hint hidden">Le logo doit être une URL valide.</div>
          </div>
          <p v-if="error" class="text-red-500">{{ error }}</p>
          <p v-if="success" class="text-green-500">{{ success }}</p>
          <button class="btn disabled:opacity-50" :disabled="isSubmitting || !isFormValid">
            Soumettre
          </button>
        </form>
        <div v-else class="flex flex-col gap-2">
          <p>Vous devez vous connecter pour créer un memecoin.</p>
          <a href="/auth" class="btn w-full">Se connecter</a>
        </div>
      </fieldset>
      <div>
        <div v-if="isLoading" class="flex justify-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-loader-icon lucide-loader animate-spin"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </div>
        <p v-else-if="isError" class="text-red-500">{{ fetchError?.message }}</p>
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="coin in memecoins"
            :key="coin.id"
            class="flex items-center gap-4 border p-4 rounded"
          >
            <img
              v-if="coin.logoUrl"
              :src="coin.logoUrl"
              :alt="coin.name"
              class="w-16 h-16 object-cover rounded"
            />
            <div>
              <h2 class="text-xl font-bold">{{ coin.name }} ({{ coin.symbol }})</h2>
              <p class="text-sm text-gray-600">Owner: {{ coin.owner }}</p>
              <p class="mt-2">{{ coin.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useJwt } from '@/stores/jwt'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

type Memecoin = {
  id: string
  name: string
  symbol: string
  description: string
  logoUrl: string
  owner: string
}

const {
  error: fetchError,
  isError,
  data: memecoins,
  isLoading,
  refetch,
} = useQuery<Memecoin[]>({
  queryKey: ['memecoins'],
  queryFn: async () => {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
    if (!res.ok) {
      throw new Error('Failed to fetch memecoins')
    }
    return (await res.json()) as Memecoin[]
  },
  refetchInterval: 2000,
})

const error = ref<string | null>(null)
const success = ref<string | null>(null)
const isSubmitting = ref(false)
const formRef = ref<HTMLFormElement | null>(null)
const isFormValid = ref(false)
const jwt = useJwt()

const updateFormValidity = () => {
  if (formRef.value) {
    isFormValid.value = formRef.value.checkValidity()
  }
}

const onSubmit = (e: Event) => {
  error.value = null

  if (!jwt.data) {
    error.value = 'You must be logged in to create a memecoin.'
    return
  }

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get('name')
  const symbol = formData.get('symbol')
  const description = formData.get('description')
  const logoUrl = formData.get('logoUrl')

  isSubmitting.value = true
  fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt.data.token}`,
    },
    body: JSON.stringify({
      name,
      symbol,
      description,
      logoUrl,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      isSubmitting.value = false
      if (data.error) {
        error.value = data.message
        return
      }
      success.value = data.message
      form.reset()
      refetch()
    })
    .catch((err) => {
      isSubmitting.value = false
      error.value = err
    })
}
</script>
