/**
 * 扩展组件和指令
 */
import errImg from "@/assets/images/200.png"
import XtxSkeleton from "./XtxSkeleton.vue"
import XtxSwiper from "./XtxSwiper.vue"
import XtxMore from "./XtxMore.vue"
import XtxBread from "./XtxBread.vue"
import XtxBreadItem from "./XtxBreadItem.vue"
import XtxCheckbox from "./XtxCheckbox.vue"
import XtxInfiniteLoading from "./XtxInfiniteLoading.vue"
import XtxCity from "./XtxCity.vue"
import XtxNumbox from "./XtxNumbox.vue"
import XtxButton from "./XtxButton.vue"
import XtxPagination from "./XtxPagination.vue"
import XtxConfirm from "./XtxConfirm.vue"
import XtxDialog from "./XtxDialog.vue"

export default {
  install(app) {
    // 骨架屏组件
    app.component(XtxSkeleton.name, XtxSkeleton)
    // 轮播图组件
    app.component(XtxSwiper.name, XtxSwiper)
    // 查看更多组件
    app.component(XtxMore.name, XtxMore)
    // 面包屑导航组件
    app.component(XtxBread.name, XtxBread)
    // 面包屑导航子组件
    app.component(XtxBreadItem.name, XtxBreadItem)
    // 复选框组件
    app.component(XtxCheckbox.name, XtxCheckbox)
    // 加载更多组件
    app.component(XtxInfiniteLoading.name, XtxInfiniteLoading)
    // 城市组件
    app.component(XtxCity.name, XtxCity)
    // 数量组件
    app.component(XtxNumbox.name, XtxNumbox)
    // 按钮组件
    app.component(XtxButton.name, XtxButton)
    // 分页组件
    app.component(XtxPagination.name, XtxPagination)
    // confirm
    app.component(XtxConfirm.name, XtxConfirm)
    // dialog
    app.component(XtxDialog.name, XtxDialog)

    // 定义指令
    difineDirective(app)
  }
}

const difineDirective = app => {
  /**
   * 图片懒加载
   *  1. 先把src值存起来
   *  2. 等到图片进入可视区域时把src重新赋值给img
   */
  app.directive("lazy", {
    mounted(el, binding) {
      // 观察dom是否进入可视区域
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observe.unobserve(el)
            // 图片加载失败 设置默认图片
            el.onerror = () => {
              el.src = errImg
            }
            // 把指令传过来的src赋值给被观测的dom
            el.src = binding.value
          }
        },
        {
          threshold: 0
        }
      )
      // 开启观察
      observe.observe(el)
    }
  })
}
