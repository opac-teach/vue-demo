<template>
  <div>
    <ClassesBinding :isPair="true" :isBig="false" />
    <ClassesBinding :isPair="false" :isBig="true" />
    <ClassesBinding :isPair="true" :isBig="true" />
  </div>
</template>

<script setup lang="ts">
import ClassesBinding from './ClassesBinding.vue'
</script>
