<template>
  <div class="">
    <p>
      simple: <span data-testid="count-store-count">{{ countStore.count }}</span>
    </p>
    <p>double: {{ countStore.doubleCount }}</p>
    <button
      class="btn btn-primary"
      @click="countStore.increment"
      data-testid="count-store-increment"
    >
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const countStore = useCounterStore()
</script>
