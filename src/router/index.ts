import { createRouter, createWebHistory } from 'vue-router'
const BASE_URL = import.meta.env.BASE_URL

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      }
    ]
  },
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
  history: createWebHistory(BASE_URL),
  routes
})

export default router
