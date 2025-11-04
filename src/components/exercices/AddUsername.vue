
<template>
  <form @submit.prevent="ajouterUserForm">
    <input
      v-model="nouvelUser.nom"
      type="text"
      placeholder="Nom de l'utilisateur"
      required
      class="input"
    />
    <button type="submit" class="btn">Ajouter</button>
  </form>

  <h2>Liste des utilisateurs :</h2>
  <ul>
    <li v-for="user in usersStore.users" :key="user.id">
      {{ user.nom }}
    </li>
  </ul>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

// Formulaire
const nouvelUser = ref({ nom: '' })

const ajouterUserForm = () => {
  usersStore.ajouterUser(nouvelUser.value.nom)
  nouvelUser.value.nom = '' // reset du formulaire
}
</script>
