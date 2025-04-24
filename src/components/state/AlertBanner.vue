<template>
  <div
    v-if="alert.visible"
    :class="[
      'fixed top-20 right-4 z-50 px-4 py-2 rounded shadow transition-all duration-300 text-white text-sm',
      alert.type === 'success' ? 'bg-green-600/75' : 'bg-red-600/75'
    ]"
  >
    {{ alert.message }}
  </div>
</template>

<script setup lang="ts">

import { useAlertStore } from '@/stores/alertStore'

const alert = useAlertStore()

</script>
