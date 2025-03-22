<template>
  <Examples :examples="examples" />
</template>

<script setup lang="ts">
import Reactivity from '@/components/state/Reactivity.vue'
import ReactivitySource from '@/components/state/Reactivity.vue?raw'

import Binding from '@/components/state/Binding.vue'
import BindingSource from '@/components/state/Binding.vue?raw'

import CountComposable from '@/components/state/CountComposable.vue'
import CountComposableComponentSource from '@/components/state/CountComposable.vue?raw'
import CountComposableSource from '@/composables/count.ts?raw'

import CountStore from '@/components/state/CountStore.vue'
import CountStoreComponentSource from '@/components/state/CountStore.vue?raw'
import CountStoreSource from '@/stores/counter.ts?raw'

import Ethereum from '@/components/state/Ethereum.vue'
import EthereumSource from '@/components/state/Ethereum.vue?raw'
import EthereumComposableSource from '@/composables/eth.ts?raw'

import UsernameStore from '@/components/state/UsernameStore.vue'
import UsernameStoreComponentSource from '@/components/state/UsernameStore.vue?raw'
import UsernameStoreSource from '@/stores/username.ts?raw' with { type: 'text' }

import Examples from '@/components/Examples.vue'
import { parse } from '@/lib/md'

const examples = [
  {
    name: 'Reactivity',
    description: parse(`
Afin que les données affichées soit réactives (affichage mis à jour quand la donnée change), il faut utiliser des variables de type réactives.

En Vue, on utilise soit\`ref\` soit \`reactive\` pour créer des variables réactives.

Pour une variable de type \`ref\` , dans la partie script, on lit/ecrit les valeurs avec \`variable.value\` et dans le template, on utilise juste \`variable\`.
    `),
    components: [Reactivity],
    sources: [ReactivitySource],
  },
  {
    name: 'Binding',
    description:
      'le binding sert a lier une variable reactive à un element du DOM, avec mise à jour dans les deux sens.',
    components: [Binding],
    sources: [BindingSource],
  },
  {
    name: 'Count Composable',
    description:
      "Les composables sont des fonctions qui contiennent une logique d'état local qui peut etre utilisé à plusieurs endroits, mais de manière independante",
    components: [CountComposable, CountComposable],
    sources: [CountComposableComponentSource, CountComposableSource],
    sourcesNames: ['CountComposableComponent', 'CountComposable'],
    sourcesLangs: ['vue', 'typescript'],
  },
  {
    name: 'Count Store',
    description:
      "Les stores (Pinia) sont des fonctions qui contiennent une logique d'état globale qui peut etre utilisé à plusieurs endroits, et qui garde les memes valeurs partout dans l'application",
    components: [CountStore, CountStore],
    sources: [CountStoreComponentSource, CountStoreSource],
    sourcesNames: ['CountStoreComponent', 'CountStore'],
    sourcesLangs: ['vue', 'typescript'],
  },
  {
    name: 'Ethereum composable',
    description:
      "Exemple d'un composable qui se mettra à jour tout seul. <br/> Attention, ceci est un mauvais exemple, car si il est utilisé à plusieurs endroits, il y aura duplication des requêtes inutiles. <br/> Pour ce genre de cas, on utilisera plutôt un store ou un fetch de type <b>StaleWhileRevalidate</b>.",
    components: [Ethereum],
    sources: [EthereumSource, EthereumComposableSource],
    sourcesNames: ['Ethereum', 'EthereumComposable'],
    sourcesLangs: ['vue', 'typescript'],
  },
  {
    name: 'Username store with localStorage',
    components: [UsernameStore],
    sources: [UsernameStoreComponentSource, UsernameStoreSource],
    sourcesNames: ['UsernameStoreComponent', 'UsernameStore'],
    sourcesLangs: ['vue', 'typescript'],
  },
]
</script>
