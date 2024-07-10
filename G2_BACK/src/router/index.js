import { createRouter, createWebHistory } from 'vue-router'
import MemberManage from '../views/MemberManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MemberManage,
      meta: { title: 'Silken Sip Vineyard' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: '登入' }
    },
    {
      path: '/administratorManage',
      name: 'administratorManage',
      component: () => import('../views/AdministratorManage.vue'),
      meta: { title: '管理員管理' }
    },
    {
      path: '/addAdministrator',
      name: 'addAdministrator',
      component: () => import('../components/administratorManage/AddAdministrator.vue'),
      meta: { title: '新增管理員' }
    },
    {
      path: '/editAdministrator',
      name: 'editAdministrator',
      component: () => import('../components/administratorManage/EditAdministrator.vue'),
      meta: { title: '編輯管理員' },
      props: (route) => ({
        index: route.query.index
      })
    },
    {
      path: '/membermanage',
      name: 'membermanage',
      component: () => import('../views/MemberManage.vue'),
      meta: { title: '會員管理' }
    },
    {
      path: '/addNew',
      component: () => import('@/components/membermange/AddNew.vue'),
      meta: { title: '新增會員' }
    },
    {
      path: '/editMember',
      name: 'editMember',
      component: () => import('@/components/membermange/EditMember.vue'),
      meta: { title: '編輯會員' }
    },
    {
      path: '/courseManage',
      name: 'courseManage',
      component: () => import('@/views/CourseManage.vue'),
      meta: { title: '課程管理' }
    },
    {
      path: '/addCoursePage',
      name: 'addCoursePage',
      component: () => import('../views/AddCoursePage.vue'),
      meta: { title: '新增課程' }
    },
    {
      path: '/editCoursePage/:id',
      name: 'editCoursePage',
      component: () => import('../views/EditCoursePage.vue'),
      meta: { title: '編輯課程' }
    },
    {
      path: '/courseOrderManage',
      name: 'courseOrderManage',
      component: () => import('../views/CourseOrderManage.vue'),
      meta: { title: '課程訂單管理' }
    },
    {
      path: '/courseOrderManagePage',
      name: 'courseOrderManagePage',
      component: () => import('../views/CourseOrderManagePage.vue'),
      meta: { title: '課程訂單管理' }
    },
    {
      path: '/productManage',
      name: 'productManage',
      component: () => import('../views/ProductManage.vue'),
      meta: { title: '商品管理', keepAlive: true }
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import('@/components/productManage/AddProduct.vue'),
      meta: { title: '新增商品' }
    },
    {
      path: '/editProduct/:id',
      name: 'editProduct',
      component: () => import('@/components/productManage/EditProduct.vue'),
      meta: { title: '編輯商品' }
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: () => import('@/views/OrderManage.vue'),
      meta: { title: '訂單管理' },
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
      component: () => import('../views/DiscountManage.vue'),
      meta: { title: '優惠卷管理' }
    },
    {
      path: '/editOrder',
      name: 'editOrder',
      component: () => import('@/components/ordermanage/EditOrder.vue'),
      meta: { title: '編輯訂單' },
      props: (route) => ({
        cartId: route.query.cartId
      })
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsManage.vue'),
      meta: { title: '最新消息管理' }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizManage.vue'),
      meta: { title: '問題管理' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 設置頁面標題
  document.title = to.meta.title || 'Silken Sip Vineyard'
  // 确保调用 next()
  next()
})

export default router
