import { createRouter, createWebHistory } from 'vue-router'
import MemberManage from '../views/MemberManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MemberManage
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/courseManage',
      name: 'courseManage',
      component: () => import('../views/CourseManage.vue')
    },
  ]
})

export default router
