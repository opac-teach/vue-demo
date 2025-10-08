<template>
  <div>
    <Row data="hello"></Row>
    <Row data="world"></Row>
    <Row data="name"></Row>
    <Row :data="name"></Row>
  </div>
</template>

<script setup lang="ts">
import Row from './Row.vue'

const name = 'Bob'
</script>
