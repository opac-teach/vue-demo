<template>
  <form class="space-y-3" @submit.prevent="onSubmit">
    <div>
      <label class="block text-sm">Nom (4–16)</label>
      <input v-model.trim="form.name" class="border rounded px-2 py-1 w-full" />
      <p v-if="v.name" class="text-red-500 text-sm">{{ v.name }}</p>
    </div>

    <div>
      <label class="block text-sm">Symbole (2–4, MAJUSCULES)</label>
      <input v-model.trim="form.symbol" class="border rounded px-2 py-1 w-full" />
      <p v-if="v.symbol" class="text-red-500 text-sm">{{ v.symbol }}</p>
    </div>

    <div>
      <label class="block text-sm">Description (0–1000)</label>
      <textarea v-model.trim="form.description" rows="3" class="border rounded px-2 py-1 w-full" />
      <p v-if="v.description" class="text-red-500 text-sm">{{ v.description }}</p>
    </div>

    <div>
      <label class="block text-sm">Logo URL (optionnel)</label>
      <input v-model.trim="form.logoUrl" class="border rounded px-2 py-1 w-full" />
      <p v-if="v.logoUrl" class="text-red-500 text-sm">{{ v.logoUrl }}</p>
    </div>

    <div class="flex items-center gap-3">
      <button :disabled="submitting || !isValid" class="border rounded px-3 py-1 hover:bg-neutral-800 disabled:opacity-50">
        {{ submitting ? 'Envoi…' : 'Créer' }}
      </button>
      <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-500 text-sm">{{ successMsg }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useMemecoinsStore } from '@/stores/memecoins'

const store = useMemecoinsStore()

const form = reactive({
  name: '',
  symbol: '',
  description: '',
  logoUrl: '',
})

const submitting = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const v = reactive<{ [k: string]: string | null }>({
  name: null,
  symbol: null,
  description: null,
  logoUrl: null,
})

function isUrl(value: string) {
  try { new URL(value); return true } catch { return false }
}

function validate() {
  v.name = form.name.length < 4 || form.name.length > 16 ? 'Le nom doit faire entre 4 et 16 caractères.' : null
  v.symbol = !/^[A-Z]{2,4}$/.test(form.symbol) ? 'Le symbole doit contenir 2 à 4 lettres MAJUSCULES.' : null
  v.description = form.description.length > 1000 ? 'Max 1000 caractères.' : null
  v.logoUrl = form.logoUrl && !isUrl(form.logoUrl) ? 'URL invalide.' : null
}

const isValid = computed(() => {
  validate()
  return !v.name && !v.symbol && !v.description && !v.logoUrl
})

async function onSubmit() {
  validate()
  if (!isValid.value) return
  submitting.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await store.createCoin({
      name: form.name,
      symbol: form.symbol,
      description: form.description || undefined,
      logoUrl: form.logoUrl || undefined,
    })
    successMsg.value = 'Memecoin créé avec succès !'
    // reset
    form.name = ''
    form.symbol = ''
    form.description = ''
    form.logoUrl = ''
    await store.fetchList()
  } catch (e: any) {
    errorMsg.value = e?.message ?? 'Erreur lors de la création'
  } finally {
    submitting.value = false
  }
}
</script>
