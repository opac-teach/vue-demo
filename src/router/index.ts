import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore.ts'

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
      path: '/exercices',
      name: 'Liste',
      component: () => import('@/views/ExercicesView.vue'),
    },
    {
      path: '/coin-form',
      name: 'Création',
      component: () => import('@/views/CoinFormView.vue'),
    },
    {
      path: '/auth-form',
      name: 'Authentification',
      component: () => import('@/views/AuthFormView.vue'),
    },
    {
      path: '/profile-detail',
      name: 'Profile',
      component: () => import('@/components/ProfileDetail.vue'),
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

  const auth = useAuthStore();

  if (to.meta.sayHello && to.meta.requiresAuth && !auth.isAuthenticated) {
    console.log('hello !')
  } else {
    next()
  }

})

export default router
