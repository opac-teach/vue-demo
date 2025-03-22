<template>
  <div>
    <ClassesBinding :isPair="someVar" :isBig="false" />
    <ClassesBinding :isPair="false" :isBig="true" />
    <ClassesBinding :isPair="true" :isBig="true" />
  </div>
</template>

<script setup lang="ts">
import ClassesBinding from './ClassesBinding.vue'

const someVar = true
</script>
