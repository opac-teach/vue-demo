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
      path: '/exercices',
      name: 'Exercices',
      component: () => import('@/views/ExercicesView.vue'),    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('@/views/CreateView.vue'),
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: () => import('@/views/ConnexionView.vue'),
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
