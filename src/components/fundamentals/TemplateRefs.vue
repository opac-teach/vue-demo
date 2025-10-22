<template>
  <div class="flex-grow">
    <input class="input" ref="input" />
    <button class="btn" @click="focusInput">Reset & Focus Input</button>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
const input = useTemplateRef('input')

const focusInput = () => {
  if (input.value) {
    input.value.value = 'reset'
    input.value.focus()
  }
}
</script>
