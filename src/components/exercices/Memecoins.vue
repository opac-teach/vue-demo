<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useAuthStore } from '@/stores/auth'

const { isLoading, error, data } = useFetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', true)

const auth = useAuthStore()

onMounted(() => {
  auth.loadFromStorage()
})

const form = reactive({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const err = reactive({
  name: '',
  symbol: '',
  description: '',
  logoUrl: ''
})

const apiError = ref('')
const success = ref('')
const loading = ref(false)

function serverBusyMessage() {
  return "Désolé, beaucoup de monde sur le site. Veuillez réessayer dans quelques secondes."
}

function validate() {
  err.name = ''
  err.symbol = ''
  err.description = ''
  err.logoUrl = ''
  
  if (!form.name) {
    err.name = 'Nom requis'
  } else if (form.name.length < 4 || form.name.length > 16) {
    err.name = 'Nom: 4-16 caractères'
  }
  
  if (!form.symbol) {
    err.symbol = 'Symbole requis'
  } else if (form.symbol.length < 2 || form.symbol.length > 4) {
    err.symbol = '2-4 caractères'
  } else if (!/^[A-Z]+$/.test(form.symbol)) {
    err.symbol = 'MAJUSCULES uniquement'
  }
  
  if (form.description && form.description.length > 1000) {
    err.description = '1000 caractères max pour la description'
  }
  
  if (form.logoUrl) {
    if (form.logoUrl.length > 200) {
      err.logoUrl = '200 caractères max'
    } else {
      try {
        new URL(form.logoUrl)
      } catch {
        err.logoUrl = 'URL invalide'
      }
    }
  }
}

function invalidForm() {
  validate()
  return !!(err.name || err.symbol || err.logoUrl || err.description)
}

async function submitForm() {
  apiError.value = ''
  success.value = ''
  
  validate()
  if (invalidForm()) {
    return
  }
  
  if (!auth.jwt) {
    apiError.value = "Authentifiez-vous pour poster !"
    return
  }
  
  loading.value = true
  
  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.jwt}`
      },
      body: JSON.stringify(form)
    })
    
    const resData = await res.json().catch(() => ({}))
    
    if (res.status === 500) {
      throw new Error('500')
    }
    
    if (!res.ok) {
      throw new Error(resData?.message || 'Erreur')
    }
    
    if (resData.owner !== auth.userId) {
      success.value = 'Créé, mais owner inattendu ! (' + resData.owner + ')'
    } else {
      success.value = 'Memecoin ajouté ✔ (owner OK)'
    }
    
    form.name = ''
    form.symbol = ''
    form.description = ''
    form.logoUrl = ''
    
    window.location.reload()
    
  } catch (e) {
    const errObj = e as Error
    if (errObj.message === '500') {
      apiError.value = serverBusyMessage()
    } else {
      apiError.value = errObj.message || 'Erreur ...'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h2 style="margin-top:1.5rem;margin-bottom:0.5rem;">Liste des memecoins</h2>
  
  <div v-if="isLoading">Chargement…</div>
  
  <div v-else-if="String(error) === '500'" style="color: red; font-size: small">
    {{ serverBusyMessage() }}
  </div>
  
  <div v-else-if="error" style="color: red; font-size: small">Erreur : {{ error }}</div>
  
  <ul style="margin-bottom:2rem;">
    <li v-for="c in (Array.isArray(data) ? data : (data?.items ?? []))" :key="c.id || c.symbol">
      <span v-if="c.logoUrl">
        <img :src="c.logoUrl" alt="logo" width="24" style="vertical-align:middle;" />
      </span>
      <span><strong>{{ c.name }}</strong> ({{ c.symbol }})</span>
    </li>
    <li v-if="!(Array.isArray(data) ? data : (data?.items ?? [])).length">Aucun memecoin.</li>
  </ul>

  <div v-if="auth.jwt">
    <h2 style="margin-bottom:0.5rem;">Ajouter un memecoin</h2>
    
    <form @submit.prevent="submitForm" style="background:#f6f7fb; padding:1.2rem 1rem 1rem 1rem;border-radius: 8px; box-shadow: 0 0 3px #e0e0e0; max-width:410px;">
      
      <div style="margin-bottom:7px;">
        <input 
          v-model="form.name" 
          @blur="validate" 
          type="text" 
          placeholder="Nom (4-16)" 
          style="width:100%;padding:8px;border-radius:4px;border:1px solid #d1d5db;box-sizing:border-box;" 
        />
        <div v-if="err.name" style="color:red;font-size:small;margin:2px 0 0 4px;">
          {{ err.name }}
        </div>
      </div>
      
      <div style="margin-bottom:7px;">
        <input 
          v-model="form.symbol" 
          @input="form.symbol=form.symbol.toUpperCase()" 
          @blur="validate" 
          type="text" 
          maxlength="4" 
          placeholder="Symbole (2-4 MAJ)"
          style="width:100%;padding:8px;border-radius:4px;border:1px solid #d1d5db;box-sizing:border-box;" 
        />
        <div v-if="err.symbol" style="color:red;font-size:small;margin:2px 0 0 4px;">
          {{ err.symbol }}
        </div>
      </div>
      
      <div style="margin-bottom:7px;">
        <textarea 
          v-model="form.description" 
          @blur="validate" 
          placeholder="Description optionnelle (max 1000)" 
          maxlength="1000" 
          rows="3"
          style="width:100%;padding:8px;border-radius:4px;border:1px solid #d1d5db;box-sizing:border-box;resize:vertical;" 
        />
        <div v-if="err.description" style="color:red;font-size:small;margin:2px 0 0 4px;">
          {{ err.description }}
        </div>
      </div>
      
      <div style="margin-bottom:7px;">
        <input 
          v-model="form.logoUrl" 
          @blur="validate" 
          type="url" 
          maxlength="200" 
          placeholder="Logo URL (option)" 
          style="width:100%;padding:8px;border-radius:4px;border:1px solid #d1d5db;box-sizing:border-box;" 
        />
        <div v-if="err.logoUrl" style="color:red;font-size:small;margin:2px 0 0 4px;">
          {{ err.logoUrl }}
        </div>
      </div>
      
      <button 
        :disabled="loading || invalidForm()" 
        type="submit"
        style="font-weight:bold; background:#2563eb; color:white; padding:9px 18px; border-radius:5px; margin-top:6px; border:0; cursor:pointer; min-width:115px;"
      >
        Ajouter
      </button>
      
      <div v-if="apiError" style="color:red;font-size:small; margin-top:6px">{{ apiError }}</div>
      <div v-if="success" style="color:green;font-size:small; margin-top:6px">{{ success }}</div>
    </form>
  </div>
  
  <div v-else style="margin-top:2rem;">
    <button 
      @click="$router.push('/auth')" 
      style="font-weight:bold; background:#2563eb; color:white; padding:9px 18px; border-radius:5px; border:0; cursor:pointer; min-width:175px;"
    >
      Se connecter pour créer
    </button>
  </div>
</template>
