<template>
  <p>Nom d'utilisateur : {{ usernameStore.username }}</p>
  <input class="input" name="name" v-model="username"></input>
  <button class="btn" @click="usernameStore.setUsernameExo(username)">Changer le nom d'utilisateur</button>
  <ul>
        <div v-for="character in characters" :key="character.id">
            <li>
                <Article :article="character"></Article>
            </li>
        </div>
    </ul>

    <ul>
        <div v-for="character in characters" :key="character.id">
            <li>
                <Article :article="character"></Article>
            </li>
        </div>
    </ul>

    
    
</template>

<script setup lang="ts">
import { format } from 'path';
import Article from './Article.vue';
import {ref, computed, onMounted} from 'vue'
import { useUsernameStoreExo } from '@/stores/UsernameExo';

const usernameStore = useUsernameStoreExo()

const characters = ref([]);

const username = ref('');

onMounted(async () => {
  try{
    const data = await fetch('https://api.sampleapis.com/rickandmorty/characters')
    const val = await data.json()
    characters.value = val
  } catch (error) {
    characters.value = error.message
  }
})
</script>