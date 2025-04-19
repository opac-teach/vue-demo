import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

// Définition du store d'authentification
export const useAuthStore = defineStore('auth', {
  // État initial du store, Récupère les données d'authentification sauvegardées dans le localStorage et     // Parse les données ou initialise avec des valeurs vides
  state: () => {
    const savedAuth = localStorage.getItem('auth');
    const parsedAuth = savedAuth ? JSON.parse(savedAuth) : { token: '', userId: '' };

    return {
      token: parsedAuth.token || '',
      userId: parsedAuth.userId || '',
    };
  },

  // Getters : propriétés dérivées de l'état
  getters: {
    // Indique si l'utilisateur est connecté (présence d'un token)
    isAuthenticated: (state) => !!state.token,
  },

  // Actions : méthodes permettant de modifier l'état
  actions: {
    /**
     * Définir les informations d'authentification et les sauvegarder
     * @param token - Le jeton d'authentification
     * @param userId - L'identifiant de l'utilisateur
     */
    setAuth(token: string, userId: string) {
      this.token = token;
      this.userId = userId;
      localStorage.setItem('auth', JSON.stringify({ token, userId }));
    },

    /**
     * Déconnecte l'utilisateur :
     * - Réinitialise les données d'authentification
     * - Supprime les infos du localStorage
     * - Redirige vers la page de connexion
     */
    logout() {
      this.token = '';
      this.userId = '';
      localStorage.removeItem('auth');

      const router = useRouter();
      router.push('/login');
    },
  },
});
