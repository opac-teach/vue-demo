<template>
  <div class="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
    <h2 class="my-4">{{ name }}</h2>
    <p v-if="description" class="mb-4" v-html="description" />
    <div class="flex flex-row gap-4">
      <div v-if="components.length > 0" :class="sources.length > 0 ? 'w-1/2' : 'w-full'">
        <div
          class="border border-gray-300 rounded-md p-4"
          v-for="(component, index) in components"
          :key="index"
        >
          <component :is="component" />
        </div>
      </div>
      <div v-if="sources.length > 0" :class="components.length > 0 ? 'w-1/2' : 'w-full'">
        <div class="flex flex-col gap-4">
          <CodeSnippet
            v-for="(source, index) in sources"
            :key="source"
            :source="source"
            :name="sourcesNames && sourcesNames[index]"
            :lang="sourcesLangs && sourcesLangs[index]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeSnippet from '@/components/CodeSnippet.vue'
import type { Component } from 'vue'

export interface ExampleProps {
  name: string
  description?: string
  components: Array<string | Component>
  sources: Array<string>
  sourcesNames?: Array<string>
  sourcesLangs?: Array<string>
}

defineProps<ExampleProps>()
</script>
