import{d as i,c as r,a as n,b as P,w as S,t,F as h,r as y,o,v as C,n as c,e as u,f as _,g as N,h as x,i as L,j as I,k as M,l as g,m as b,p as k}from"./index-Co6B8EHA.js";import{S as q}from"./Slot-BFKur4xS.js";import{_ as w}from"./Examples.vue_vue_type_script_setup_true_lang-D35GzFcB.js";import{p as m}from"./md-CZtaPCbl.js";const V={key:2},$="Hello World",p=5,T=i({__name:"TemplateSyntax",setup(a){const e=[1,2,3,4,5];function s(l){return l*3}return(l,B)=>(o(),r("div",null,[n("p",null,"Message: "+t($)),n("p",null,"Number: "+t(p)),n("p",null,"Number * 2: "+t(p*2),1),n("p",null,"Number * 3: "+t(s(p)),1),(o(),r("p",V,"Number is less than 10")),P("",!0),S(n("p",null,"v-show",512),[[C,p>100]]),n("ul",null,[(o(),r(h,null,y(e,f=>n("li",{key:f},t(f),1)),64))])]))}}),U=`<template>
  <div>
    <!-- interpolation -->
    <p>Message: {{ msg }}</p>

    <!-- expressions -->
    <p>Number: {{ number }}</p>
    <p>Number * 2: {{ number * 2 }}</p>
    <p>Number * 3: {{ tripleNumber(number) }}</p>

    <!-- conditional rendering -->
    <p v-if="number > 10">Number is greater than 10</p>
    <p v-else-if="number === 10">Number is 10</p>
    <p v-else>Number is less than 10</p>

    <p v-if="number > 100">v-if</p>
    <p v-show="number > 100">v-show</p>

    <!-- list rendering -->
    <ul>
      <li v-for="n in numbers" :key="n">{{ n }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const msg = 'Hello World'
const number: number = 5
const numbers = [1, 2, 3, 4, 5]

function tripleNumber(n: number) {
  return n * 3
}
<\/script>
`,R={class:"flex flex-col gap-4"},d=i({__name:"ClassesBinding",props:{isPair:{type:Boolean},isBig:{type:Boolean}},setup(a){return(e,s)=>(o(),r("div",R,[n("div",{class:c(e.isPair?"bg-red-200":"bg-blue-200")},[n("p",null,"Is pair: "+t(e.isPair)+" Is big: "+t(e.isBig),1)],2),n("div",{class:c({"bg-red-200":e.isPair,"bg-blue-200":!e.isPair,"text-2xl":e.isBig,"text-sm":!e.isBig})},[n("p",null,"Is pair: "+t(e.isPair)+" Is big: "+t(e.isBig),1)],2),n("div",{class:c([e.isPair?"bg-red-200":"bg-blue-200",e.isBig?"text-2xl":"text-sm"])},[n("p",null,"Is pair: "+t(e.isPair)+" Is big: "+t(e.isBig),1)],2)]))}}),F=!0,D=i({__name:"PassingProps",setup(a){return(e,s)=>(o(),r("div",null,[u(d,{isPair:F,isBig:!1}),u(d,{isPair:!1,isBig:!0}),u(d,{isPair:!0,isBig:!0})]))}}),A=`<template>
  <div>
    <ClassesBinding :isPair="someVar" :isBig="false" />
    <ClassesBinding :isPair="false" :isBig="true" />
    <ClassesBinding :isPair="true" :isBig="true" />
  </div>
</template>

<script setup lang="ts">
import ClassesBinding from './ClassesBinding.vue'

const someVar = true
<\/script>
`,E=`<template>
  <div class="flex flex-col gap-4">
    <div :class="isPair ? 'bg-red-200' : 'bg-blue-200'">
      <p>Is pair: {{ isPair }} Is big: {{ isBig }}</p>
    </div>

    <div
      :class="{
        'bg-red-200': isPair,
        'bg-blue-200': !isPair,
        'text-2xl': isBig,
        'text-sm': !isBig,
      }"
    >
      <p>Is pair: {{ isPair }} Is big: {{ isBig }}</p>
    </div>

    <div :class="[isPair ? 'bg-red-200' : 'bg-blue-200', isBig ? 'text-2xl' : 'text-sm']">
      <p>Is pair: {{ isPair }} Is big: {{ isBig }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPair?: boolean
  isBig?: boolean
}>()
<\/script>
`,H={class:"flex-grow"},O=i({__name:"TemplateRefs",setup(a){const e=_(null),s=()=>{e.value.value="reset",e.value.focus()};return(l,B)=>(o(),r("div",H,[n("input",{class:"input",ref_key:"input",ref:e},null,512),n("button",{class:"btn",onClick:s},"Reset & Focus Input")]))}}),j=`<template>
  <div class="flex-grow">
    <input class="input" ref="input" />
    <button class="btn" @click="focusInput">Reset & Focus Input</button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
const input = ref<null | Ref>(null)

const focusInput = () => {
  input.value.value = 'reset'
  input.value.focus()
}
<\/script>
`,W=i({__name:"LifeCycle",setup(a){const e=_(!1);return N(()=>{console.log("mounted"),e.value=!0}),x(()=>{console.log("beforeMount")}),L(()=>{console.log("beforeUnmount")}),I(()=>{console.log("unmounted")}),(s,l)=>(o(),r("p",null,"Loaded: "+t(e.value),1))}}),z=`<template>
  <p>Loaded: {{ loaded }}</p>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, onBeforeUnmount, onUnmounted, ref } from 'vue'

const loaded = ref(false)

onMounted(() => {
  console.log('mounted')
  loaded.value = true
})

onBeforeMount(() => {
  console.log('beforeMount')
})

onBeforeUnmount(() => {
  console.log('beforeUnmount')
})

onUnmounted(() => {
  console.log('unmounted')
})
<\/script>
`,v=i({__name:"Slot",props:{success:{type:Boolean},error:{type:Boolean}},setup(a){return(e,s)=>(o(),r("button",{class:c(["btn",{"btn-success":e.success,"btn-error":e.error}])},[M(e.$slots,"default")],2))}}),J=i({__name:"Slots",setup(a){return(e,s)=>(o(),r("div",null,[u(v,{success:!0},{default:g(()=>s[0]||(s[0]=[b("Valider")])),_:1}),u(v,{error:!0},{default:g(()=>s[1]||(s[1]=[b("Annuler")])),_:1})]))}}),G=`<template>
  <div>
    <Slot :success="true">Valider</Slot>
    <Slot :error="true">Annuler</Slot>
  </div>
</template>

<script setup lang="ts">
import Slot from './Slot.vue'
<\/script>
`,Z=i({__name:"FundamentalsView",setup(a){const e=[{name:"Template Syntax",components:[T],sources:[U],description:m(`
Chaque fichier \`.vue\` est un composant, qui est separé en une partie template et une partie script.

La partie template est la partie HTML qui sera affichée.

La partie script est la partie JavaScript qui contient la logique du composant.`)},{name:"Components and slots",description:m(`
Les composants sont des blocks d'interface réutilisables.

On aura un fichier par composant, et celui-ci sera nommé en PascalCase. 

Afin d'utiliser un composant, on doit d'abord l'importer.  

Les slots sont des emplacements dans un composant qui peuvent etre remplis par le parent avec du contenu qui sera remplacé à l'emplacement de \`<slot/>\`. 
`),components:[J],sources:[G,q],sourcesNames:["Slots","Slot"]},{name:"Class Bindings",description:m(`
Les classes peuvent etre bindées à des variables dans le template de differentes façons.
    `),components:[D],sources:[E],sourcesNames:["ClassesBinding"]},{name:"Passing Props",description:"Les props sont des variables passées à un composant. Elles sont typées et peuvent être optionnelles ou obligatoires. <br/> Les props sont passées à un composant dans le template, et doivent être definies avec <code>defineProps</code>",components:[],sources:[A],sourcesNames:["PassingProps"]},{name:"Template Refs",description:"Les template refs sont des références à des éléments du DOM. Elles sont utilisées pour accéder à des éléments du DOM et les manipuler. <br/> Les template refs sont déclarés avec <code>ref</code> dans la partie script.",components:[O],sources:[j]},{name:"LifeCycle",description:"Le cycle de vie d'un composant est le processus par lequel un composant est créé, mis à jour et détruit. <br/> Les hooks de cycle de vie sont des fonctions qui sont appelées à des moments critiques du cycle de vie d'un composant.",components:[W],sources:[z]}];return(s,l)=>(o(),k(w,{examples:e}))}});export{Z as default};
