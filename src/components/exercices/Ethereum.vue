<template>
  <div>
    <h3>Block Number</h3>
    <p>{{ blockNumber }}</p>
  </div>
</template>

<script setup lang="ts">
import useEth from '@/composables/eth'
import { onUnmounted } from 'vue'

const { blockNumber, clear } = useEth()

onUnmounted(() => {
  clear()
})
</script>
