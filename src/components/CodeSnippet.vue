<template>
  <div
    class="w-full overflow-x-scroll max-h-screen overflow-y-scroll border border-gray-300 rounded-md shadow-sm"
  >
    <div v-if="name" class="text-md italic text-end pr-2 pt-1">{{ name }}</div>
    <div v-html="highlightedCode" class="text-sm px-2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { codeToHtml } from 'shiki'
import { useUIStore } from '@/stores/ui'

const props = defineProps<{
  source: string
  name?: string
  lang?: string
}>()

const highlightedCode = ref('')
const uiStore = useUIStore()

async function updateHighlight() {
  highlightedCode.value = await codeToHtml(props.source, {
    lang: props.lang || 'vue',
    theme: uiStore.isDarkMode ? 'vitesse-dark' : 'vitesse-light',
  })
}

onMounted(updateHighlight)

watch(() => uiStore.isDarkMode, updateHighlight)
</script>
