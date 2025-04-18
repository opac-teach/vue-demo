import{d,f as l,q as R,s as v,c as p,a as n,w as b,t as u,u as i,v as B,m as _,b as E,o as m,x as $,y as k,z as j,A as y,j as M,p as P}from"./index-Co6B8EHA.js";import{C as q,a as V}from"./counter-BHSSEN-2.js";import{_ as L}from"./Examples.vue_vue_type_script_setup_true_lang-D35GzFcB.js";import{p as O}from"./md-CZtaPCbl.js";const T={key:0},G=d({__name:"Reactivity",setup(s){let e=0;const t=l(0),r=R({count:0});function o(){e++}function a(){t.value++}function I(){t.value--}function U(g){r.count+=g}const N=t.value%2===0,x=v(()=>t.value%2===0),f=v(()=>r.count%2===0);return(g,c)=>(m(),p("div",null,[c[3]||(c[3]=n("h3",{class:"mt-2"},"Bad",-1)),n("p",null,"Bad count: "+u(i(e)),1),n("button",{class:"btn",onClick:o},"Bad increment"),c[4]||(c[4]=n("h3",null,"Ref",-1)),n("p",null,"Ref count: "+u(t.value),1),n("button",{class:"btn",onClick:a},"Good increment"),n("button",{class:"btn",onClick:c[0]||(c[0]=w=>t.value++)},"Good inline increment"),n("button",{class:"btn",onClick:I},"Good decrement"),n("p",null,"Computed is pair: "+u(x.value),1),n("p",null,"Not computed is pair: "+u(N)),c[5]||(c[5]=n("h3",null,"Reactive",-1)),n("p",null,"Reactive count: "+u(r.count),1),n("button",{class:"btn",onClick:c[1]||(c[1]=w=>U(3))},"Reactive increment"),b(n("p",null,[c[2]||(c[2]=_("Reactive is pair ! ")),f.value?(m(),p("span",T,"Yes")):E("",!0)],512),[[B,f.value]])]))}}),A=`<template>
  <div>
    <h3 class="mt-2">Bad</h3>
    <p>Bad count: {{ badCount }}</p>
    <button class="btn" @click="badIncrement">Bad increment</button>

    <h3>Ref</h3>
    <p>Ref count: {{ count }}</p>
    <button class="btn" @click="increment">Good increment</button>
    <button class="btn" @click="count++">Good inline increment</button>
    <button class="btn" @click="decrement">Good decrement</button>
    <p>Computed is pair: {{ isPair }}</p>
    <p>Not computed is pair: {{ badIsPair }}</p>

    <h3>Reactive</h3>
    <p>Reactive count: {{ reactiveObject.count }}</p>
    <button class="btn" @click="incrementReactive(3)">Reactive increment</button>
    <p v-show="reactiveIsPair">Reactive is pair ! <span v-if="reactiveIsPair">Yes</span></p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

let badCount = 0
const count = ref(0)

const reactiveObject = reactive({
  count: 0,
})

function badIncrement() {
  badCount++
}
function increment() {
  count.value++
}
function decrement() {
  count.value--
}
function incrementReactive(n: number) {
  reactiveObject.count += n
}

const badIsPair = count.value % 2 === 0
const isPair = computed(() => count.value % 2 === 0)
const reactiveIsPair = computed(() => reactiveObject.count % 2 === 0)
<\/script>
`,C="Hello World",D="text",W=d({__name:"Binding",setup(s){const e=l(""),t=l(0);return $(e,(r,o)=>{console.log("text changed",r,o),t.value=r.length}),(r,o)=>(m(),p("div",null,[n("p",null,"Const msg: "+u(C)),n("input",{class:"input",type:D,value:C}),n("p",null,"Ref msg: "+u(e.value)+" (length: "+u(t.value)+")",1),b(n("input",{class:"input",onKeyup:o[0]||(o[0]=j(a=>e.value+="up",["up"])),"onUpdate:modelValue":o[1]||(o[1]=a=>e.value=a)},null,544),[[k,e.value]])]))}}),H=`<template>
  <div>
    <p>Const msg: {{ constMsg }}</p>
    <input class="input" v-bind:type="constInputType" :value="constMsg" />

    <p>Ref msg: {{ refMsg }} (length: {{ refMsgLength }})</p>
    <input class="input" @keyup.up="refMsg += 'up'" v-model="refMsg" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const constMsg = 'Hello World'
const constInputType = 'text'

const refMsg = ref('')
const refMsgLength = ref(0)

watch(refMsg, (newVal, oldVal) => {
  console.log('text changed', newVal, oldVal)
  refMsgLength.value = newVal.length
})
<\/script>
`,J=()=>{const s=l(0);return{count:s,increment:()=>{s.value++}}},K={class:""},Y={"data-testid":"count-composable-count"},S=d({__name:"CountComposable",setup(s){const{count:e,increment:t}=J();return(r,o)=>(m(),p("div",K,[n("p",Y,u(i(e)),1),n("button",{class:"btn",onClick:o[0]||(o[0]=(...a)=>i(t)&&i(t)(...a)),"data-testid":"count-composable-increment"}," Increment ")]))}}),z=`<template>
  <div class="">
    <p data-testid="count-composable-count">{{ count }}</p>
    <button class="btn" @click="increment" data-testid="count-composable-increment">
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCount } from '@/composables/count'

const { count, increment } = useCount()
<\/script>
`,F=y("counter",()=>{const s=l(0),e=v(()=>s.value*2);function t(){s.value++}return{count:s,doubleCount:e,increment:t}}),Q={class:""},X={"data-testid":"count-store-count"},h=d({__name:"CountStore",setup(s){const e=F();return(t,r)=>(m(),p("div",Q,[n("p",null,[r[1]||(r[1]=_(" simple: ")),n("span",X,u(i(e).count),1)]),n("p",null,"double: "+u(i(e).doubleCount),1),n("button",{class:"btn btn-primary",onClick:r[0]||(r[0]=(...o)=>i(e).increment&&i(e).increment(...o)),"data-testid":"count-store-increment"}," Increment ")]))}}),Z=`<template>
  <div class="">
    <p>
      simple: <span data-testid="count-store-count">{{ countStore.count }}</span>
    </p>
    <p>double: {{ countStore.doubleCount }}</p>
    <button
      class="btn btn-primary"
      @click="countStore.increment"
      data-testid="count-store-increment"
    >
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const countStore = useCounterStore()
<\/script>
`,ee=()=>{const s=l(null);async function e(){const a=await(await fetch("https://eth.llamarpc.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",method:"eth_blockNumber",params:[],id:1})})).json();if(a.error)throw new Error(`Error: ${a.error.message}`);s.value=parseInt(a.result,16)}const t=setInterval(e,1e4);return e(),{blockNumber:s,clear:()=>clearInterval(t)}},ne=d({__name:"Ethereum",setup(s){const{blockNumber:e,clear:t}=ee();return M(()=>{t()}),(r,o)=>(m(),p("div",null,[o[0]||(o[0]=n("h3",null,"Block Number",-1)),n("p",null,u(i(e)),1)]))}}),te=`<template>
  <div>
    <h3>Block Number</h3>
    <p>{{ blockNumber }}</p>
  </div>
</template>

<script setup lang="ts">
import useEth from '@/composables/eth'
import { onUnmounted } from 'vue'

const { blockNumber, clear } = useEth()

onUnmounted(() => {
  clear()
})
<\/script>
`,oe=`import { ref } from 'vue'

const useEth = () => {
  const blockNumber = ref<null | number>(null)

  async function getCurrentBlockNumber() {
    const rpcUrl = 'https://eth.llamarpc.com'

    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(\`Error: \${data.error.message}\`)
    }

    // Convert hex string to decimal
    blockNumber.value = parseInt(data.result, 16)
  }

  const interval = setInterval(getCurrentBlockNumber, 10000)

  getCurrentBlockNumber()
  return {
    blockNumber,
    clear: () => clearInterval(interval),
  }
}

export default useEth
`,se=y("username",()=>{const s=l("");function e(r){s.value=r,localStorage.setItem("username",r),console.log("saved username")}function t(){console.log("get username"),s.value=localStorage.getItem("username")||""}return t(),{username:s,setUsername:e}}),re={class:""},ae=d({__name:"UsernameStore",setup(s){const e=se(),t=l("");return(r,o)=>(m(),p("div",re,[n("span",null,"username: "+u(i(e).username),1),b(n("input",{class:"input","onUpdate:modelValue":o[0]||(o[0]=a=>t.value=a)},null,512),[[k,t.value]]),n("button",{class:"btn",onClick:o[1]||(o[1]=a=>i(e).setUsername(t.value))},"Set username")]))}}),ue=`<template>
  <div class="">
    <span>username: {{ usernameStore.username }}</span>
    <input class="input" v-model="username" />
    <button class="btn" @click="usernameStore.setUsername(username)">Set username</button>
  </div>
</template>

<script setup lang="ts">
import { useUsernameStore } from '@/stores/username'
import { ref } from 'vue'

const usernameStore = useUsernameStore()
const username = ref('')
<\/script>
`,ce=`import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsernameStore = defineStore('username', () => {
  const username = ref('')
  function setUsername(name: string) {
    username.value = name
    localStorage.setItem('username', name)
    console.log('saved username')
  }
  function getUsername() {
    console.log('get username')
    username.value = localStorage.getItem('username') || ''
  }

  getUsername()

  return { username, setUsername }
})
`,de=d({__name:"StateView",setup(s){const e=[{name:"Reactivity",description:O("\nAfin que les données affichées soit réactives (affichage mis à jour quand la donnée change), il faut utiliser des variables de type réactives.\n\nEn Vue, on utilise soit`ref` soit `reactive` pour créer des variables réactives.\n\nPour une variable de type `ref` , dans la partie script, on lit/ecrit les valeurs avec `variable.value` et dans le template, on utilise juste `variable`.\n    "),components:[G],sources:[A]},{name:"Binding",description:"le binding sert a lier une variable reactive à un element du DOM, avec mise à jour dans les deux sens.",components:[W],sources:[H]},{name:"Count Composable",description:"Les composables sont des fonctions qui contiennent une logique d'état local qui peut etre utilisé à plusieurs endroits, mais de manière independante",components:[S,S],sources:[z,q],sourcesNames:["CountComposableComponent","CountComposable"],sourcesLangs:["vue","typescript"]},{name:"Count Store",description:"Les stores (Pinia) sont des fonctions qui contiennent une logique d'état globale qui peut etre utilisé à plusieurs endroits, et qui garde les memes valeurs partout dans l'application",components:[h,h],sources:[Z,V],sourcesNames:["CountStoreComponent","CountStore"],sourcesLangs:["vue","typescript"]},{name:"Ethereum composable",description:"Exemple d'un composable qui se mettra à jour tout seul. <br/> Attention, ceci est un mauvais exemple, car si il est utilisé à plusieurs endroits, il y aura duplication des requêtes inutiles. <br/> Pour ce genre de cas, on utilisera plutôt un store ou un fetch de type <b>StaleWhileRevalidate</b>.",components:[ne],sources:[te,oe],sourcesNames:["Ethereum","EthereumComposable"],sourcesLangs:["vue","typescript"]},{name:"Username store with localStorage",components:[ae],sources:[ue,ce],sourcesNames:["UsernameStoreComponent","UsernameStore"],sourcesLangs:["vue","typescript"]}];return(t,r)=>(m(),P(L,{examples:e}))}});export{de as default};
