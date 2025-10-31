import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewPageView from '../views/NewPageView.vue'
import { useTokenStore } from '@/stores/token';

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
      name: 'Exercices',
      component: () => import('@/views/ExercicesView.vue'),
    },

    {
      path: '/new',
      name: 'NewPage',
      component: NewPageView
    },

    {
      path: '/meme-coins',
      name: 'MemeCoins',
      component: () => import('@/views/MemeCoinView.vue'),
    },

    {
      path: '/authentification',
      name: 'Authentification',
      component: () => import('@/views/AuthentificationView.vue'),
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
  const isAuthenticated = useTokenStore().isAuthenticated;
  if (to.name === 'Authentification' && isAuthenticated === true) {
    next({ name: 'MemeCoins' });
  } else if (to.name === 'MemeCoins' && isAuthenticated === false) {
    next({ name: 'Authentification' });
  } else {
    next();
  }
});

export default router
