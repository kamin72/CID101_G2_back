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
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/administratorManage',
      name: 'administratorManage',
      component: () => import('../views/AdministratorManage.vue')
    },
    {
      path: '/addAdministrator',
      name: 'addAdministrator',
      component: () => import('../components/administratorManage/AddAdministrator.vue')
    },
    {
      path: '/editAdministrator',
      name: 'editAdministrator',
      component: () => import('../components/administratorManage/EditAdministrator.vue'),
      props: (route) => ({
        index: route.query.index
      })
    },
    {
      path: '/membermanage',
      name: 'membermanage',
      component: () => import('../views/MemberManage.vue')
    },
    {
      path: '/addNew',
      component: () => import('@/components/membermange/AddNew.vue')
    },
    {
      path: '/editMember',
      name: 'editMember',
      component: () => import('@/components/membermange/EditMember.vue')
    },
    {
      path: '/courseManage',
      name: 'courseManage',
      component: () => import('@/views/CourseManage.vue')
    },
    {
      path: '/addCoursePage',
      name: 'addCoursePage',
      component: () => import('../views/AddCoursePage.vue')
    },
    {
      path: '/editCoursePage/:id',
      name: 'editCoursePage',
      component: () => import('../views/EditCoursePage.vue')
    },
    {
      path: '/courseOrderManage',
      name: 'courseOrderManage',
      component: () => import('../views/CourseOrderManage.vue')
    },
    {
      path: '/courseOrderManagePage',
      name: 'courseOrderManagePage',
      component: () => import('../views/CourseOrderManagePage.vue')
    },
    {
      path: '/productManage',
      name: 'productManage',
      component: () => import('../views/ProductManage.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import('@/components/productManage/AddProduct.vue')
    },
    {
      path: '/editProduct/:id',
      name: 'editProduct',
      component: () => import('@/components/productManage/EditProduct.vue')
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: () => import('@/views/OrderManage.vue'),
      children: [
        {
          path: 'ordercount',
          name: 'ordercount',
          component: () => import('../components/ordermanage/OrderCount.vue')
        },
        {
          path: 'orderquery',
          name: 'orderquery',
          component: () => import('../components/ordermanage/OrderQuery.vue')
        }
      ]
    },
    {
      path: '/discount',
      component: () => import('../views/DiscountManage.vue')
    },
    {
      path: '/editOrder',
      name: 'editOrder',
      component: () => import('@/components/ordermanage/EditOrder.vue'),
      props: (route) => ({
        cartId: route.query.cartId
      })
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsManage.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizManage.vue')
    }
  ]
})

export default router
