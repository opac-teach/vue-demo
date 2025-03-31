<template>
  <div class="flex flex-col gap-4 container max-w-full w-full">
    <Example v-for="(example, index) in examples" :key="index" v-bind="example" />
  </div>
</template>

<script setup lang="ts">
import Example, { type ExampleProps } from '@/components/Example.vue'

defineProps<{
  examples: Array<ExampleProps>
}>()
</script>
