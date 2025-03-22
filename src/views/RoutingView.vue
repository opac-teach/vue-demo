<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import RouterSource from '@/router/index.ts?raw'
import LayoutSource from '@/layouts/DefaultLayout.vue?raw'
import RewriteSource from '@/../vercel.json?raw'
import Examples from '@/components/Examples.vue'

const examples = [
  {
    name: 'Routing',
    description:
      'Le router capturera toutes les routes demandées et affichera les composants associés. <br/>Pour rappel, le serveur doit toujours retourner le <code>index.html</code>, quel que soit la page pour avoir un comportement <b>SPA</b> <i>(rewrite)</i> .',
    components: [],
    sources: [RouterSource, LayoutSource, RewriteSource],
    sourcesNames: ['Router', 'Layout', 'vercel.json'],
    sourcesLangs: ['typescript', 'vue', 'json'],
  },
]
</script>
