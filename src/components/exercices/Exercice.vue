<template>
  <div>
    <h1>Articles au-dessus de 50€</h1>
    <!-- Utilisation du computed -->
    <div v-for="article in articlesFiltres" :key="article.id">
      <p>{{ article.nom }} — {{ article.prix }} €</p>
    </div>

    <h1>Liste complète des articles</h1>
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />


    <!-- 🧾 Formulaire d'ajout -->
    <h2>Ajouter un nouvel article</h2>
    <form @submit.prevent="ajouterArticle">
      <input
        v-model="nouvelArticle.nom"
        type="text"
        placeholder="Nom de l'article"
        required
        class="input"
      />
      <input
        v-model.number="nouvelArticle.prix"
        type="number"
        placeholder="Prix (€)"
        required
        class="input"
      />
      <button type="submit" class="btn">Ajouter</button>
    </form>
  </div>
</template>




<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import ArticleItem from '@/components/exercices/ArticleItem.vue'

// ✅ Alerte quand on quitte la page
onBeforeUnmount(() => {
  alert('Vous quittez la page des exercices 👋')
})

// ✅ Liste d’articles (réactive)
const articles = ref([
  { id: 1, nom: 'Casque audio', prix: 45 },
  { id: 2, nom: 'Clavier mécanique', prix: 85 },
  { id: 3, nom: 'Écran 27"', prix: 220 },
  { id: 4, nom: 'Souris gamer', prix: 60 },
])

// ✅ Variable calculée (computed)
const articlesFiltres = computed(() =>
  articles.value.filter(a => a.prix > 50)
)


// ✏️ Nouvel article (state local)
const nouvelArticle = ref({
  nom: '',
  prix: null as number | null,
})


// ➕ Fonction d’ajout
const ajouterArticle = () => {
  if (!nouvelArticle.value.nom || !nouvelArticle.value.prix) return

  const nouvelId = articles.value.length + 1
  articles.value.push({
    id: nouvelId,
    nom: nouvelArticle.value.nom,
    prix: Number(nouvelArticle.value.prix),
  })

  // Réinitialiser le formulaire
  nouvelArticle.value.nom = ''
  nouvelArticle.value.prix = null
}

</script>
