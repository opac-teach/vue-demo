<template>
  <button
    class="btn"
    :class="{
      'btn-success': success,
      'btn-error': error,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  success?: boolean
  error?: boolean
}>()
</script>
