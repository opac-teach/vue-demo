<template>
  <div class="flex-grow">
    <input class="input" ref="input" />
    <button class="btn" @click="focusInput">Reset & Focus Input</button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
const input = ref<null | Ref>(null)

const focusInput = () => {
  input.value.value = 'reset'
  input.value.focus()
}


</script>
