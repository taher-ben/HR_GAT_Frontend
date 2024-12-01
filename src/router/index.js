import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/PenaltiesAndRewards',
      name: 'PenaltiesAndRewards',
      component: () => import('../views/PenaltiesAndRewards.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ChartsPage',
      name: 'ChartsPage',
      component: () => import('../views/ChartsPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/AttendaceView',
      name: 'AttendaceView',
      component: () => import('../views/AttendaceView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/Login')
  } else {
    next()
  }
})

export default router
