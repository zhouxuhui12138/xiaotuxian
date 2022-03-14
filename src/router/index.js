import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const Layout = () => import("@/views/Layout.vue")
const Home = () => import("@/views/home/index.vue")
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/SubCategory.vue')
const Goods = () => import('@/views/goods/index.vue')
const Login = () => import('@/views/login/index.vue')
const Cart = () => import('@/views/cart/index.vue')

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: Home },
      { path: "/category/:id", component: TopCategory },
      { path: "/category/sub/:id", component: SubCategory },
      { path: "/product/:id", component: Goods },
      { path: "/cart", component: Cart },
    ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 路由发生变换时滚动到页面最顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
