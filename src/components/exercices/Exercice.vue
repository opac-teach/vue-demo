<template>
    hello: {{ hello }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const hello = ref(0);

onMounted(() => {
    setInterval(() => {
        hello.value++
    }, 1000)
})

</script>