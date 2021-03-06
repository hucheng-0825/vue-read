import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'LoginIndex',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/',
      name: 'LayoutIndex',
      component: () => import('@/views/layout/Layout.vue'),
      children: [
        {
          path: '/bookrack',
          name: 'BookRack',
          component: () => import('@/views/bookrack/BookRack.vue')
        },
        {
          path: '/bookcity',
          name: 'BookCity',
          component: () => import('@/views/bookcity/BookCity.vue')
        },
        {
          path: '/my',
          name: 'Myindex',
          component: () => import('@/views/my/My.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'SearchIndex',
      component: () => import('@/views/search/Search.vue')
    },
    // 文章阅读路由
    {
      path: '/bookread',
      name: 'bookreadIndex',
      component: () => import('@/views/bookrack/components/BookRead'),
      props: true
    },
    // 批量购买章节路由
    {
      path: '/bookbulkpurchase/:bookId',
      name: 'bookbulkpurchase',
      component: () => import('@/views/bookrack/components/BookBulkPurchase'),
      props: true
    },
    {
      path: '/primarysort',
      name: 'PrimarySort',
      component: () => import('@/views/bookcity/components/PrimarySort.vue')
    },
    {
      path: '/secondarysort',
      name: 'SecondarySort',
      component: () => import('@/views/bookcity/components/SecondarySort.vue')
    },
    {
      path: '/myaccount',
      name: 'MyAccount',
      component: () => import('@/views/my/components/MyAccount.vue')
    },
    {
      path: '/bookdetails/:id',
      name: 'BookDetails',
      props: true,
      component: () => import('@/views/bookcity/BookDetails.vue')
    },
    {
      path: '/setting',
      name: 'SettingIndex',
      component: () => import('@/views/my/components/Setting.vue')
    }
  ]
})

export default router
