<script setup lang="ts">

import DefaultLayout from './layouts/DefaultLayout.vue'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('App mounted');
})
</script>

<template>
  <DefaultLayout />
</template>
