import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
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
    }
  ]
})

export default router
