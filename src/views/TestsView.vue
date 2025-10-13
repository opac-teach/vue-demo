<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import SlotSource from '@/components/fundamentals/Slot.vue?raw'
import SlotTestSource from '@/components/fundamentals/__tests__/Slot.vue.test.ts?raw'

import CountComposableSource from '@/composables/count.ts?raw'
import CountComposableTestSource from '@/composables/__test__/count.test.ts?raw'

import CounterStoreSource from '@/stores/counter.ts?raw'
import CounterStoreTestSource from '@/stores/counter.test.ts?raw'

import E2ETests from '../../e2e/app.spec.ts?raw'

import Examples from '@/components/Examples.vue'

const examples = [
  {
    name: 'Tests unitaires',
    description:
      "On va verifier qu'un composant isolé fait bien son travail. <br/> On a besoin d'une lib (vue test-utils) pour 'monter' un composant en mémoire et simuler une application",
    components: [],
    sources: [SlotSource, SlotTestSource],
    sourcesNames: ['Slot', 'Slot.test'],
    sourcesLangs: ['vue', 'typescript'],
  },
  {
    name: 'Count Composable',
    description: 'On peut tester les composables de manières très simple',
    components: [],
    sources: [CountComposableSource, CountComposableTestSource],
    sourcesNames: ['Count', 'Count.test'],
    sourcesLangs: ['typescript', 'typescript'],
  },
  {
    name: 'Counter Store',
    description: 'Pour tester les stores, il faut re-creer un store Pinia frais à chaque test',
    components: [],
    sources: [CounterStoreSource, CounterStoreTestSource],
    sourcesNames: ['Counter', 'Counter.test'],
    sourcesLangs: ['typescript', 'typescript'],
  },
  {
    name: 'End 2 End Tests',
    description:
      "Tests complet via un navigateur sur l'application, on va verifier que tout est bien relié et a le comportement souhaité. ",
    components: [],
    sources: [E2ETests],
    sourcesNames: ['app.spec.ts'],
    sourcesLangs: ['typescript'],
  },
]
</script>
