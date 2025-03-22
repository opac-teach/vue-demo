<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import RouterSource from '@/router/index.ts?raw'
import LayoutSource from '@/layouts/DefaultLayout.vue?raw'
import NavSource from '@/components/Nav.vue?raw'
import RewriteSource from '@/../vercel.json?raw'
import Examples from '@/components/Examples.vue'

const examples = [
  {
    name: 'Routing',
    description:
      'Le router sera géré par vue-router et il capturera toutes les routes demandées et affichera les composants associés, sans rechargement de la page. <br/>Pour rappel, le serveur doit toujours retourner le <code>index.html</code>, quel que soit la page pour avoir un comportement <b>SPA</b> <i>(rewrite)</i> .',
    components: [],
    sources: [RouterSource, LayoutSource, NavSource, RewriteSource],
    sourcesNames: ['Router', 'Layout', 'Nav', 'vercel.json'],
    sourcesLangs: ['typescript', 'vue', 'vue', 'json'],
  },
]
</script>
