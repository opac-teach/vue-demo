<template>
        <p>{{ article.title }}</p>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'


defineProps<{
    article: { id: number; title: string; content: string; price: number  }
}>()


</script>