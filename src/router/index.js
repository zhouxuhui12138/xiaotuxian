import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import store from "@/store"

const Layout = () => import("@/views/Layout.vue")
const Home = () => import("@/views/home/index.vue")
const TopCategory = () => import("@/views/category/index.vue")
const SubCategory = () => import("@/views/category/SubCategory.vue")
const Goods = () => import("@/views/goods/index.vue")
const Login = () => import("@/views/login/index.vue")
const Cart = () => import("@/views/cart/index.vue")
const Checkout = () => import("@/views/member/pay/Checkout.vue")
const Pay = () => import("@/views/member/pay/index.vue")
const PayResult = () => import("@/views/member/pay/PayResult.vue")
const MemberLayout = () => import("@/views/member/Layout.vue")
const MemberHome = () => import("@/views/member/home/index.vue")

const Test = () => import("@/Test.vue")

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
      { path: "/member/checkout", component: Checkout },
      { path: "/member/pay", component: Pay },
      { path: "/pay/callback", component: PayResult },
      {
        path: "/member",
        component: MemberLayout,
        children: [{ path: "/member", component: MemberHome }]
      }
    ]
  },
  { path: "/login", component: Login },
  { path: "/test", component: Test }
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

// 路由守卫
router.beforeEach((to, from, next) => {
  const { profile } = store.state.users
  if (!profile.token && to.path.startsWith("/member")) {
    // 跳转登录页面
    return next("/login?redirectUrl=" + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
