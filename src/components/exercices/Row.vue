<template>
  <li>{{ title }}</li>
</template>
<script setup lang="ts">
defineProps<{
  title: string
}>();
</script>
