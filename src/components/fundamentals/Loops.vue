<template>
  <div>
    <!-- list rendering -->
    <ul>
      <li v-for="user in users" :key="user.id">
        <a :href="`/users/${user.id}`">
          {{ user.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const users = [
  {
    id: 1,
    name: 'alice',
  },
  {
    id: 2,
    name: 'bob',
  },
  {
    id: 3,
    name: 'charly',
  },
]
</script>
