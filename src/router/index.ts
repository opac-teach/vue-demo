import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMemecoinsStore } from '@/stores/memecoins'
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
      path: '/paolo',
      name: 'Paolo',
      component: () => import('@/views/PaoloPage.vue'),
    },
    {
      path: '/Characters',
      name: 'Characters',
      component: () => import('@/components/Characters.vue'),
    },
    {
      path: '/Ajouter un nom',
      name: 'Username',
      component: () => import('@/components/exercices/AddUsername.vue'),
    },
    {
      path: '/Memecoins',
      name: 'Memecoins',
      component: () => import('@/components/Memecoins.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/auth.vue'),
      meta: {
        hide: true,
      },
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.isLoggedIn) {
          next('/')
        } else {
          next()
        }
      },
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
  const authStore = useAuthStore()
  if (to.meta.sayHello) {
    console.log('hello !')
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
