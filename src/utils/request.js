import axios from "axios"
import store from "@/store/index"
import route from '@/router/index'

export const baseURL = "https://apipc-xiaotuxian-front.itheima.net/"

const request = axios.create({
  baseURL,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { profile } = store.state.users
    // 携带token
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  res => res.data,
  err => {
    // token失效 重新登录
    if (err.response && err.response.status === 401) {
      store.commit('users/setProfile', {})
      const fullPath = encodeURIComponent(route.currentRoute.value.fullPath)
      route.push(`/login?redirectUrl=${fullPath}`)
    }
    return Promise.reject(err)
  }
)

export default request
