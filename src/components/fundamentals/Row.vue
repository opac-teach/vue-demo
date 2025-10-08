<template>
  <p>{{ data }}</p>
</template>

<script setup lang="ts">
defineProps<{
  data: string
}>()
</script>
