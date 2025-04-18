import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExercicesView from '@/views/ExercicesView.vue'
import FundamentalsView from '@/views/FundamentalsView.vue'

import AuthView from '@/views/AuthView.vue'
import RoutingView from '@/views/RoutingView.vue'
import StateView from '@/views/StateView.vue'
import TestsView from '@/views/TestsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth'

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
      component: FundamentalsView,
    },
    {
      path: '/routing',
      name: 'Routing',
      component: RoutingView,
      meta: { sayHello: true },
    },
    {
      path: '/state',
      name: 'State',
      component: StateView,
    },
    {
      path: '/tests',
      name: 'Tests',
      component: TestsView,
    },
    {
      path: '/exercices',
      name: 'Exercices',
      component: ExercicesView,
    },
    {
      path: '/login',
      name: 'Login',
      component: AuthView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
      meta: { hide: true },
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si la page est login et que l'utilisateur est déjà connecté, rediriger vers exercices
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/exercices')
    return
  }

  if (to.meta.sayHello) {
    console.log('hello !')
  }

  next()
})

export default router
