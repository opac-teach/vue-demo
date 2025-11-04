import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/mapage',
      name: 'mapage',
      component: () => import('@/views/MapageView.vue'),
      meta: { requiresAuth: true }
  },
     {
      path: '/connexion',
      name: 'connexion',
      component: () => import('@/views/ConnexionView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { hide: true },
    },
  ],
})
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  console.log('Route:', to.path, 'isAuthenticated:', auth.isAuthenticated())

  if (to.meta.requiresGuest && auth.isAuthenticated()) return next('/')


  if (to.meta.requiresAuth && !auth.isAuthenticated()) return next('/connexion')

  next()
})

export default router
