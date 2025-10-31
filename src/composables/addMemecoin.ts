import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
const tokenStore = ref(useTokenStore());
    
const memecoin = ref<any[]>([]);
const newMemeCoin = ref({
    description: '',
    logoUrl: '',
    name: '',
    owner: '',
    symbol: '',
});
const error = ref<string | null>(null);

export const useAddMemeCoin = () => {
    const addMemeCoin = async () => {
        error.value = null;
        tokenStore.value.user_id; // on s'assure que le user_id est chargé depuis le store
        try {
            const response = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenStore.value.token}`, // on ajoute le token dans l'entete pour l'authentification
                },
                body: JSON.stringify({ // on envoie la donnée au format JSON
                    name: newMemeCoin.value.name,
                    symbol: newMemeCoin.value.symbol,
                    description: newMemeCoin.value.description,
                    logoUrl: newMemeCoin.value.logoUrl,
                    owner: tokenStore.value.user_id, // on utilise le user_id du store pour l'owner
                }),
            });

            if (response.ok) { // si la reponse est ok on save le memecoin et on le push dans le tableau
                const savedCoin = await response.json();
                console.log('MemeCoin ajouté avec succès:', savedCoin);
                memecoin.value.push(savedCoin);

                // Réinitialiser le formulaire
                newMemeCoin.value = {
                    description: '',
                    logoUrl: '',
                    name: '',
                    owner: '',
                    symbol: '',
                };
            } else {
                throw new Error('Erreur lors de l\'ajout du MemeCoin'); // si il y a une erreur de format on catch l'erreur
            }
        } catch (err) {
            error.value = (err as Error).message; // et dans le pire des cas on affiche le message d'erreur
        }
    };

    return { // ici on retourne les variables et fonctions pour les utiliser dans le composant
        addMemeCoin,
        memecoin,
        newMemeCoin,
        error
    };
};