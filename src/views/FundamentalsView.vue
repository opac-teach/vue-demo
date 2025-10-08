<template>
  <Examples :examples="examples" />
  <h1 class="">Exercices</h1>
  <FundamentalsExercices />
</template>

<script setup lang="ts">
import TemplateSyntax from '@/components/fundamentals/TemplateSyntax.vue'
import TemplateSyntaxSource from '@/components/fundamentals/TemplateSyntax.vue?raw'
import Conditions from '@/components/fundamentals/Conditions.vue'
import ConditionsSource from '@/components/fundamentals/Conditions.vue?raw'
import Loops from '@/components/fundamentals/Loops.vue'
import LoopsSource from '@/components/fundamentals/Loops.vue?raw'
import PassingProps from '@/components/fundamentals/PassingProps.vue'
import PassingPropsSource from '@/components/fundamentals/PassingProps.vue?raw'
import ClassesBindingSource from '@/components/fundamentals/ClassesBinding.vue?raw'
import TemplateRefs from '@/components/fundamentals/TemplateRefs.vue'
import TemplateRefsSource from '@/components/fundamentals/TemplateRefs.vue?raw'
import LifeCycle from '@/components/fundamentals/LifeCycle.vue'
import LifeCycleSource from '@/components/fundamentals/LifeCycle.vue?raw'
import Components from '@/components/fundamentals/Components.vue'
import ComponentsSource from '@/components/fundamentals/Components.vue?raw'
import RowSource from '@/components/fundamentals/Row.vue?raw'
import Slots from '@/components/fundamentals/Slots.vue'
import SlotsSource from '@/components/fundamentals/Slots.vue?raw'
import SlotSource from '@/components/fundamentals/Slot.vue?raw'
import Examples from '@/components/Examples.vue'
import type { ExampleProps } from '@/components/Example.vue'
import { parse } from '@/lib/md'
import Exercices from '@/components/Exercices.vue'
import FundamentalsExercices from '@/components/exercices/Fundamentals.vue'

const examples: Array<ExampleProps> = [
  {
    name: 'Template Syntax',
    components: [TemplateSyntax],
    sources: [TemplateSyntaxSource],
    description: parse(`
Chaque fichier \`.vue\` est un composant, qui est separé en une partie template et une partie script.

La partie template est la partie HTML qui sera affichée.

La partie script est la partie JavaScript qui contient la logique du composant.`),
  },
  {
    name: 'Conditions',
    components: [Conditions],
    sources: [ConditionsSource],
    description: parse(`
Il est possible d'afficher ou non certains elements en définissant certaines conditions. 

Les attributs v-if v-else-if et v-else fonctionnent comme une structure conditionnelle traditionnelle et affichera l'element qui correspondra aux conditions définies. 

L'attribut v-show se comportera comme le v-if, à la difference que l'element sera toujours inclus dans le DOM, seulement caché par du CSS si la condition est fausse. 
A utiliser pour des elements qui s'affichent/se cachent souvent afin d'économiser du temps de rendering. 

Pour les élements qui s'activent rarement (changement d'onglet par exemple) il est preferable d'utiliser le v-if, qui consommera moins de ressources pour les élements cachés. 
`),
  },
  {
    name: 'Boucles',
    components: [Loops],
    sources: [LoopsSource],
    description: parse(`
Il arrive souvent de devoir afficher des elements similaires pour une liste de données (liste d'articles, liste de messages ...). On utilisera pour cela des boucles v-for, auquel on passera un tableau d'objets et un composant qui sera utilisé pour chacun de ces objets. 

Il est important de définir une 'key' qui doit être unique pour chaque element de la liste. 
`),
  },
  {
    name: 'Components',
    description: parse(`
Les composants sont des blocs d'interface réutilisables.

On aura un fichier par composant, et celui-ci sera nommé en PascalCase.

Afin d'utiliser un composant, on doit d'abord l'importer.

### Props
Les props sont des variables passées à un composant.
Elles sont typées et peuvent être optionnelles ou obligatoires.

Les props sont passées à un composant dans le template, et doivent être definies avec <code>defineProps</code>

- Lorsque l'on désire passer une valeur brute, on utilise le nom de la prop dans les attributs du composants \`attr="value"\`
- Lorsque l'on désire passer une variable, on utilise le nom de la prop avec \`:\` devant: \`:attr="value"\`

`),
    components: [Components],
    sources: [ComponentsSource, RowSource],
    sourcesNames: ['Components', 'Row'],
  },
  {
    name: 'Class Bindings',
    description: parse(`
Les classes peuvent etre bindées à des variables dans le template de differentes façons.
    `),
    components: [PassingProps],
    sources: [ClassesBindingSource, PassingPropsSource],
    sourcesNames: ['ClassesBinding'],
  },
  {
    name: 'Slots',
    description: parse(`
Les slots sont des emplacements dans un composant qui peuvent etre remplis par le parent avec du contenu qui sera remplacé à l'emplacement de \`<slot/>\`.
`),
    components: [Slots],
    sources: [SlotsSource, SlotSource],
    sourcesNames: ['Slots', 'Slot'],
  },
  {
    name: 'Template Refs',
    description:
      'Les template refs sont des références à des éléments du DOM. Elles sont utilisées pour accéder à des éléments du DOM et les manipuler. <br/> Les template refs sont déclarés avec <code>ref</code> dans la partie script.',
    components: [TemplateRefs],
    sources: [TemplateRefsSource],
  },
  {
    name: 'LifeCycle',
    description:
      "Le cycle de vie d'un composant est le processus par lequel un composant est créé, mis à jour et détruit. <br/> Les hooks de cycle de vie sont des fonctions qui sont appelées à des moments critiques du cycle de vie d'un composant.",
    components: [LifeCycle],
    sources: [LifeCycleSource],
  },
]
</script>
