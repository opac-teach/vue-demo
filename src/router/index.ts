import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/exercices',
      name: 'Exercices',
      component: () => import('@/views/ExercicesView.vue'),
    },
    {
      path: '/paolo', // 👈 ton chemin personnalisé
      name: 'Paolo',
      component: () => import('@/views/PaoloPage.vue'),
    },
    {
      path: '/Characters', // 👈 ton chemin personnalisé
      name: 'Characters',
      component: () => import('@/components/Characters.vue'),
    },
    {
      path: '/Ajouter un nom', // 👈 ton chemin personnalisé
      name: 'Username',
      component: () => import('@/components/exercices/AddUsername.vue'),
    },
    {
      path: '/Memecoins', // 👈 ton chemin personnalisé
      name: 'Memecoins',
      component: () => import('@/components/Memecoins.vue'),
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
