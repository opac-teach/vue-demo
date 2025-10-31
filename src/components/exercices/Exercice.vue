<template>
    <Articles />
</template>
<script setup lang="ts">
import Article from './Article.vue';
import Articles from './Articles.vue';
import { onUnmounted } from 'vue';
onUnmounted(() => {
    alert('vous avez quitté l\'exercice');
});
</script>