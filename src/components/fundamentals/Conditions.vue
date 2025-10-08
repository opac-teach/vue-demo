<template>
  <div>
    <!-- conditional rendering -->
    <p v-if="number > 10">Number is greater than 10</p>
    <p v-else-if="number === 10">Number is 10</p>
    <p v-else>Number is less than 10</p>

    <p v-if="number > 100">v-if</p>
    <p v-show="number > 100">v-show</p>
  </div>
</template>

<script setup lang="ts">
const number: number = 5
</script>
