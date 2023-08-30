import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDeTail from '@/views/prodetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDeTail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 所有的路由在真正被访问到之前（解析渲染到对应组件页面前），都会先经过全局前置守卫
// 全局前置导航前卫
// to：到哪里去，到哪去的完整路由信息对象（路径，参数）
// from：从哪里来，从哪里来的完整路由信息对象（路径，参数）
// next:是否放行
// （1）next() 直接放行，放行到to要去的路径
// （2）next(路径) 进行拦截，拦截到next里面配置的路径

// 定义一个数组，专门用于存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 非权限页面直接放行
    next()
    return
  }
  // 是权限页面
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
