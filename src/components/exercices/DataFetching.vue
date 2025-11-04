<template>
    <div>
        <p>{{ lorem }}</p>
    </div>
</template>


<script setup lang="ts">
import {ref } from 'vue';



const lorem = ref('loading...')
try{
    const data = await fetch('https://api.sampleapis.com/rickandmorty/characters');
    const text = await data.text();
    lorem.value = text;
}catch(e){
    lorem.value = 'Error fetching data';
}
</script>