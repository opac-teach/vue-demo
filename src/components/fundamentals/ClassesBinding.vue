<template>
  <div class="flex flex-col gap-4">
    <div :class="isPair ? 'bg-red-200' : 'bg-blue-200'">
      <p :class="isBig ? 'text-2xl' : 'text-sm'">Is pair: {{ isPair }} Is big: {{ isBig }}</p>
    </div>

    <div
      :class="{
        'bg-red-200': isPair,
        'bg-blue-200': !isPair,
        'text-2xl': isBig,
        'text-sm': !isBig,
      }"
    >
      <p>Is pair: {{ isPair }} Is big: {{ isBig }}</p>
    </div>

    <div :class="[isPair ? 'bg-red-200' : 'bg-blue-200', isBig ? 'text-2xl' : 'text-sm']">
      <p>Is pair: {{ isPair }} Is big: {{ isBig }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPair?: boolean
  isBig?: boolean
}>()
</script>
