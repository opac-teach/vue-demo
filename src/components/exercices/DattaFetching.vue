<template>
    <div>
        <p>{{ lorem }}</p>
        <div class="btn"></div>
    </div>
</template>


<script setup lang="ts">

const characters = ref([]);
import { onMounted, ref } from 'vue';

onMounted( async () => {
    try{
        const data = await fetch('https://api.sampleapis.com/rickandmorty/characters');
        const val = await data.json();
        characters.value = valr

    
    } catch(Error){
    
        characters.value = Error.message;
    }
});
</script>