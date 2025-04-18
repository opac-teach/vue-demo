<template>
  <div class="">
    <p data-testid="count-composable-count">{{ count }}</p>
    <button class="btn" @click="increment" data-testid="count-composable-increment">
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCount } from '@/composables/count'

const { count, increment } = useCount()
</script>
