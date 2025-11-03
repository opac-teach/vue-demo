<template>
  <div>
    <form action="" @submit.prevent="addItem">
      <label for="">Nom :</label>
      <input type="text" class="input" name="name" v-model="name">

      <label for="">Prix :</label>
      <input type="number" class="input" name="prix" v-model="prix">

      <button  class="btn">Valider</button>
    </form>
  </div>
  <div>
    <ul>
      <li v-for="article in filteredArticles" :key="article.id">
        <ArticleItem :name="article.name" :price="article.price" />
      </li>
    </ul>
  </div>
  <div class="filters" style="margin: 1rem 0">
    <label for="filter">Filtrer :</label>
    <select id="filter" v-model="selectedFilter">
      <option value="All">All</option>
      <option value="Human">Human</option>
      <option value="Alien">Alien</option>
    </select>
  </div>

  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 " >
    <div v-for="content in filteredContents" :key="content.id">
      <h1>{{ content.name }}</h1>
      <img :src="content.image" alt="">
      <p>{{ content.species }}</p>
    </div>
  </section>

  <form @submit.prevent="updateNickname" class="mb-4">
      <div class="flex items-center gap-2">
        <input
          class="input"
          v-model="tempNickname"
          placeholder="Entrez votre surnom..."
          aria-label="Surnom"
        />
        <button type="submit" class="btn">Changer</button>
      </div>
      <p class="text-sm mt-1">Surnom actuel : {{ nickNameStore.nickName || 'Non défini' }}</p>
    </form>
</template>

<script setup lang="ts"> 
import { computed } from 'vue'  
import ArticleItem from './ArticleItem.vue'
import { ref } from 'vue';
import { onMounted } from 'vue'
type Article = { id: number, name: string,  price: number }

const articles=ref([
  { id: 1,  name: "Câble USB-C 1m",            price: 9.99  },
  { id: 2,  name: "Tasse isotherme",           price: 14.9  },
  { id: 3,  name: "Souris sans fil",           price: 24.5  },
  { id: 4,  name: "Lampe de bureau LED",       price: 39.99 },
  { id: 5,  name: "Clé USB 256Go",             price: 50.0  },   
  { id: 6,  name: "Casque audio filaire",      price: 59.9  },
  { id: 7,  name: "Sac à dos urbain",          price: 75.0  },
  { id: 8,  name: "Mini enceinte bluetooth",   price: 89.99 },
  { id: 9,  name: "Clavier mécanique",         price: 99.99 },
  { id: 10, name: "Disque SSD 1To",            price: 100.0 },   
  { id: 11, name: "Moniteur 27\" 144Hz",       price: 129.0 },
  { id: 12, name: "Casque gaming 7.1",         price: 199.0 },
])



const filteredArticles = computed(() => articles.value.filter(a => a.price > 50))


const name = ref('');
const prix = ref(0);


function addItem(){
  articles.value.push({
    id:Math.random(),
    name: name.value,
    price: prix.value,
  })
} 

const lorem = ref('loading...')

type Character = {
  id: string,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: string | { name?: string } | any,
  image: string,
}

const contents = ref<Character[]>([])
const selectedFilter = ref<'All' | 'Human' | 'Alien'>('All')

const filteredContents = computed(() => {
  if (!contents.value) return []
  if (selectedFilter.value === 'All') return contents.value
  return contents.value.filter(c => (c.species || '').toLowerCase() === selectedFilter.value.toLowerCase())
})

onMounted(async () => {
  const res = await fetch('https://api.sampleapis.com/rickandmorty/characters')
  const data = await res.json()
  contents.value = data
})

import { useNickName } from '@/stores/nickname';
const nickNameStore = useNickName()
const tempNickname = ref('')

function updateNickname() {
  if (tempNickname.value.trim()) {
    nickNameStore.nickName = tempNickname.value
    tempNickname.value = ''
  }
}


</script>