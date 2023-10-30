import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routeConfig from './routesConfig'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/sendEmail',
    component: () => import('@/views/SendEmail.vue')
  },
  {
    path: '/resetPassword',
    component: () => import('@/views/ResetPassword.vue')
  },
  {
    component: () => import('@/layouts/default/Default.vue'),
    children: routeConfig.map((route) => ({
      ...route,
      component: () => import(/* @vite-ignore */ '@/views/' + route.name)
    })),
    path: ''
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
