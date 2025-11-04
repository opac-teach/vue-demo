import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref<{ id: number; nom: string }[]>([])

  // Action pour ajouter un utilisateur
  const ajouterUser = (nom: string) => {
    if (!nom) return
    const nouvelId = users.value.length + 1
    users.value.push({ id: nouvelId, nom })
  }

  return { users, ajouterUser }
})
