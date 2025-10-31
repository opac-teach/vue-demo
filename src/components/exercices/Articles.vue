<template>
    <!-- Afficher tous les articles avec prix > 30 -->
    <div v-for="article in filteredArticles" :key="article.id">
        <Article :article="article" />
    </div>
     <form @submit.prevent="addArticle">
        <input type="text" v-model="newTitle" placeholder="Titre de l'article" />
        <textarea v-model="newContent" placeholder="Contenu de l'article"></textarea>
        <input type="number" class="input" v-model.number="newPrice" placeholder="Prix de l'article" />
        <button type="submit" class="btn">Ajouter l'article</button>
    </form>
    <br />

    <!-- From Uiverse.io by kyle1dev --> 
    <div class="checkbox-container">
    <label class="ios-checkbox blue">
    <span>All</span>
    <input type="checkbox" v-model="showAll"/>
    <div class="checkbox-wrapper">
      <div class="checkbox-bg"></div>
      <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          stroke="currentColor"
          d="M4 12L10 18L20 6"
          class="check-path"
        ></path>
      </svg>
    </div>
  </label>

  <label class="ios-checkbox green">
    <span>Human</span>
    <input type="checkbox" v-model="showHuman"/>
    <div class="checkbox-wrapper">
      <div class="checkbox-bg"></div>
      <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          stroke="currentColor"
          d="M4 12L10 18L20 6"
          class="check-path"
        ></path>
      </svg>
    </div>
  </label>

  <label class="ios-checkbox purple">
    <span>Alien</span>
    <input type="checkbox" v-model="showAlien"/>
    <div class="checkbox-wrapper">
      <div class="checkbox-bg"></div>
      <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          stroke="currentColor"
          d="M4 12L10 18L20 6"
          class="check-path"
        ></path>
      </svg>
    </div>
  </label>

    </div>
    <br />

    <div>
        <h2>Personnages Rick et Morty</h2>
        <ul>
            <li class="card card-border bg-base-100 w-96" v-for="character in displayedCharacters" :key="character.id">
                 <div class="card-body hover:bg-blue-800 hover:text-white transition-colors duration-300">
                    <p class="card-title">{{ character.name }} - {{ character.species }} - {{ character.gender }} - {{ character.origine.name }}</p> <br />
                    <div class="avatar">
                        <div class="w-32 rounded">
                            <img :src="character.images" :alt="character.name" width="100" />
                        </div>
                    </div>
                </div>
                <br />
            </li>
        </ul>
    </div>
    <input type="text" v-model="nicknameStore.nickname" placeholder="Entrez votre pseudo" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Article from './Article.vue';
import { useNickname } from '@/composables/nickname'

const nicknameStore = useNickname();

let newTitle = ref('');
let newContent = ref('');
let newPrice = ref(0);
let characters = ref<any[]>([]);
let isClicked = ref(false); // on fait des ref avec lesquelles on va mettre a jour les infos en fonction du filtre qui est coché
let showAll = ref(false);
let showHuman = ref(false);
let showAlien = ref(false);

let articles = ref([
    { id: 1, title: "Article 1", content: "Contenu de l'article 1", price: 19.99 },
    { id: 2, title: "Article 2", content: "Contenu de l'article 2", price: 29.99 },
    { id: 3, title: "Article 3", content: "Contenu de l'article 3", price: 39.99 },
    { id: 4, title: "Article 4", content: "Contenu de l'article 4", price: 49.99 },
    { id: 5, title: "Article 5", content: "Contenu de l'article 5", price: 59.99 },
    { id: 6, title: "Article 6", content: "Contenu de l'article 6", price: 69.99 },
    { id: 7, title: "Article 7", content: "Contenu de l'article 7", price: 100.00 },
]);

import { computed } from 'vue';

const filteredArticles = computed(() => {
    return articles.value.filter(article => article.price > 30)
});

function addArticle() {
    const newArticle = {
        id: articles.value.length + 1,
        title: newTitle.value,
        content: newContent.value,
        price: newPrice.value
    };
    articles.value.push(newArticle);
    newTitle.value = '';
    newContent.value = '';
    newPrice.value = 0;
}

onMounted( async () => {
    try {
        const res =  await fetch("https://api.sampleapis.com/rickandmorty/characters");
        const data = await res.json();
        console.log(data);
        characters.value = data.map((character: any) => ({
            id: character.id,
            name: character.name,
            status: character .status,
            species: character.species,
            type: character.type,
            gender: character.gender,
            origine: character.origin,
            images: character.image,
        }));

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});

const filteredCharacters = computed(() => {
    return showAll.value ? characters.value : [];
});

// Computed équivalent à votre fonction filterBySpecies()
const filteredCharactersBySpecies = computed(() => {
    let result: any[] = [];
    
    if (showHuman.value) {
        result = [...result, ...characters.value.filter(character => character.species === 'Human')]; // ... est un spread operator qui permet de décomposer un tableau en éléments individuels et donc sort les elements de leurs tableaux respectifs pour les mettre dans un seul tableau unique.
    }
    if (showAlien.value) {
        result = [...result, ...characters.value.filter(character => character.species === 'Alien')]; // idem ici
    }
    
    return result;
});

// Computed pour afficher les personnages
const displayedCharacters = computed(() => {
    return [...filteredCharacters.value, ...filteredCharactersBySpecies.value]; // et la on combine les deux tableaux pour l'affichage et fonction de ce qui est coché dans les checkboxes les personnages s'affichent.
});

</script>

<style scoped>
/* From Uiverse.io by kyle1dev */ 
.checkbox-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
}

.ios-checkbox {
  --checkbox-size: 28px;
  --checkbox-color: #3b82f6;
  --checkbox-bg: #dbeafe;
  --checkbox-border: #93c5fd;

  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.ios-checkbox input {
  display: none;
}

.checkbox-wrapper {
  position: relative;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.checkbox-bg {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  border: 2px solid var(--checkbox-border);
  background: white;
  transition: all 0.2s ease;
}

.checkbox-icon {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 80%;
  height: 80%;
  color: white;
  transform: scale(0);
  transition: all 0.2s ease;
}

.check-path {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  transition: stroke-dashoffset 0.3s ease 0.1s;
}

/* Checked State */
.ios-checkbox input:checked + .checkbox-wrapper .checkbox-bg {
  background: var(--checkbox-color);
  border-color: var(--checkbox-color);
}

.ios-checkbox input:checked + .checkbox-wrapper .checkbox-icon {
  transform: scale(1);
}

.ios-checkbox input:checked + .checkbox-wrapper .check-path {
  stroke-dashoffset: 0;
}

/* Hover Effects */
.ios-checkbox:hover .checkbox-wrapper {
  transform: scale(1.05);
}

/* Active Animation */
.ios-checkbox:active .checkbox-wrapper {
  transform: scale(0.95);
}

/* Focus Styles */
.ios-checkbox input:focus + .checkbox-wrapper .checkbox-bg {
  box-shadow: 0 0 0 4px var(--checkbox-bg);
}

/* Color Themes */
.ios-checkbox.blue {
  --checkbox-color: #3b82f6;
  --checkbox-bg: #dbeafe;
  --checkbox-border: #93c5fd;
}

.ios-checkbox.green {
  --checkbox-color: #10b981;
  --checkbox-bg: #d1fae5;
  --checkbox-border: #6ee7b7;
}

.ios-checkbox.purple {
  --checkbox-color: #8b5cf6;
  --checkbox-bg: #ede9fe;
  --checkbox-border: #c4b5fd;
}

.ios-checkbox.red {
  --checkbox-color: #ef4444;
  --checkbox-bg: #fee2e2;
  --checkbox-border: #fca5a5;
}

/* Animation */
@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.ios-checkbox input:checked + .checkbox-wrapper {
  animation: bounce 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

</style>