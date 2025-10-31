import router from "@/router";
import { defineStore } from "pinia";
import { watch } from "vue";
const tokenKey = "auth_token";
const userId = "user_id";
export const useTokenStore = defineStore("token", {
    state: () => ({ // on initialise le token avec la valeur stockée dans le localStorage ou null
        token: localStorage.getItem(tokenKey) || null,
        user_id: localStorage.getItem(userId) || null,
    }),
    getters: {
        isAuthenticated(): boolean {
            return this.token !== null && this.user_id !== null;
        },  
    },
    actions: {
        setToken(newToken: string) {
            this.token = newToken;
            localStorage.setItem(tokenKey, newToken);
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem(tokenKey);
        },

        setUserId(newUserId: string) {
            this.user_id = newUserId;
            localStorage.setItem(userId, newUserId);
        },
        clearUserId() {
            this.user_id = null;
            localStorage.removeItem(userId);
        },

        logout() {
            this.token = null;
            this.user_id = null;
            localStorage.clear();
            router.push({ name: 'Authentification' });
        }
    }
});
