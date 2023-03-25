import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import storage from '@/utils/goodStorageUtil'
const home = () => import('@/piniaviews/home/home.vue')
const login = () => import('@/piniaviews/userinfo/login.vue')
const ctgy = () => import('@/piniaviews/ctgy/index.vue')
const search = () => import('@/piniaviews/search/index.vue')
const books = () => import('@/piniaviews/books/index.vue')
const test = () => import('@/piniaviews/test/index.vue')
const bookDetail = () => import('@/piniaviews/bookDetail/index.vue')
const shopcartlist = () => import('@/piniaviews/shopcartlist/index.vue')

const routes = [
  // const routes: RouteRecordRaw[] = [
  {
    name: 'default',
    path: '/', // 默认的首页
    component: home,
  },
  {
    name: 'home',
    path: '/home', // 首页
    component: home,
  },
  {
    name: 'search',
    path: '/search', // 搜索页面
    component: search,
  },
  {
    name: 'ctgy',
    path: '/ctgy', // 图书三级分类页
    component: ctgy,
  },
  {
    name: 'login',
    path: '/login', // 登陆页
    component: login,
    // 单独路由守卫: 登录后不可进入登录页
    beforeEnter(to: any, from: any, next: any) {
      const token = storage.get('token') || ''
      if (token) {
        next({ name: 'ctgy' })
      } else {
        next()
      }
    },
  },
  {
    name: 'books',
    path: '/books/:thirdctgyid', // 图书列表页
    component: books,
  },
  {
    name: 'test',
    path: '/test',
    component: test,
  },
  {
    name: 'bookDetail',
    path: '/bookDetail/:id', // 图书详情页
    component: bookDetail,
  },
  {
    name: 'shopcartlist',
    path: '/shopcartlist', // 购物车列表页
    component: shopcartlist,
  },
]

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = storage.get('token') || ''
  if (token || to.name === 'login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
