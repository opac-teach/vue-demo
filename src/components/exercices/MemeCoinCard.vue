<template>
  <div class="flex flex-row card shadow-sm border p-2 box-border pl-4">
    <figure>
      <img :src="coin.logoUrl" :alt="coin.name" class="rounded-full w-25 h-25" />
    </figure>
    <div class="p-4 card-body">
      <hgroup>
        <h2 class="card-title">{{ coin.name }}</h2>
        <p>
          <span class="font-bold">{{ coin.symbol }}</span> {{ coin.owner }}
        </p>
      </hgroup>
      <p>{{ coin.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  coin: {
    type: Object,
    required: true,
  },
})
</script>
