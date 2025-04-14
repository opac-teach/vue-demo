import{_ as n}from"./Examples.vue_vue_type_script_setup_true_lang-D35GzFcB.js";import{d as t,p as o,o as r}from"./index-Co6B8EHA.js";const s=`import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/fundamentals',
      name: 'Fundamentals',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/FundamentalsView.vue'),
    },
    {
      path: '/routing',
      name: 'Routing',
      component: () => import('@/views/RoutingView.vue'),
      meta: { sayHello: true },
    },
    {
      path: '/state',
      name: 'State',
      component: () => import('@/views/StateView.vue'),
    },
    {
      path: '/tests',
      name: 'Tests',
      component: () => import('@/views/TestsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { hide: true },
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.sayHello) {
    console.log('hello !')
  }

  next()
})

export default router
`,a=`<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
<\/script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex flex-1 container mx-auto w-screen-lg max-w-screen-lg w-full p-8">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
`,u=`<template>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path" active-class="bg-neutral text-neutral-content">
          {{ route.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes().filter((route) => !route.meta?.hide)
<\/script>
`,i=`{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
`,d=t({__name:"RoutingView",setup(m){const e=[{name:"Routing",description:"Le router sera géré par vue-router et il capturera toutes les routes demandées et affichera les composants associés, sans rechargement de la page. <br/>Pour rappel, le serveur doit toujours retourner le <code>index.html</code>, quel que soit la page pour avoir un comportement <b>SPA</b> <i>(rewrite)</i> .",components:[],sources:[s,a,u,i],sourcesNames:["Router","Layout","Nav","vercel.json"],sourcesLangs:["typescript","vue","vue","json"]}];return(c,p)=>(r(),o(n,{examples:e}))}});export{d as default};
