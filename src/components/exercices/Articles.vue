<template>
  <div :style="{ color: prix > 100 ? 'red' : prix < 100 ? 'green' : 'inherit' }">
    <p>{{ nom }} {{ prix }}</p>
    
  </div>
</template>

<script setup lang="ts">
import { inherits } from 'util'

const props = defineProps<{
  nom: string
  prix: number
}>()
</script>
