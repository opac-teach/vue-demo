<template>
  <div>
    <!-- interpolation -->
    <p>Message: {{ msg }}</p>

    <!-- expressions -->
    <p>Number: {{ number }}</p>
    <p>Number * 2: {{ number * 2 }}</p>
    <p>Number * 3: {{ tripleNumber(number) }}</p>
  </div>
</template>

<script setup lang="ts">
const msg = 'Hello World'
const number: number = 5

function tripleNumber(n: number) {
  return n * 3
}
</script>
