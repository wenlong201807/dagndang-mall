import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
const ctgy = () => import('@/piniaviews/ctgy/index.vue')
const books = () => import('@/piniaviews/books/index.vue')
const test = () => import('@/piniaviews/test/index.vue')
const bookDetail = () => import('@/piniaviews/bookDetail/index.vue')
const shopcartlist = () => import('@/piniaviews/shopcartlist/index.vue')

const routes: RouteRecordRaw[] = [
  {
    name: 'ctgy',
    path: '/ctgy',
    component: ctgy,
  },
  {
    name: 'home',
    path: '/',
    component: ctgy,
  },
  {
    name: 'books',
    path: '/books/:thirdctgyid', // 数据错误
    component: books,
  },
  {
    name: 'test',
    path: '/test',
    component: test,
  },
  {
    name: 'bookDetail',
    path: '/bookDetail/:id', // 数据错误
    component: bookDetail,
  },
  {
    name: 'shopcartlist',
    path: '/shopcartlist',
    component: shopcartlist,
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
