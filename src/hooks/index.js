// 提供可复用的函数
import { useIntersectionObserver, useIntervalFn } from "@vueuse/core"
import dayjs from "dayjs"
import { onUnmounted, ref } from "vue"

/**
 * 数据懒加载
 */
export const useLazyData = (target, apiFn) => {
  const result = ref([])

  // stop停止观察
  // isIntersecting是否进入可视区

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observeElement) => {
      if (isIntersecting) {
        // 停止继续观察
        stop()
        // 调用请求数据的函数
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项
    {
      // 相交的比例大于0就触发懒加载
      threshold: 0
    }
  )

  return result
}

/**
 * 支付倒计时
 */
export const usePayTime = () => {
  const time = ref(0)
  const timeText = ref("")

  const { pause, resume } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm秒ss分')
    if (time.value <= 0) {
      pause()
    }
  }, 1000, false)

  const start = (count) => {
    time.value = count
    timeText.value = dayjs.unix(time.value).format('mm秒ss分')
    resume()
  }

  onUnmounted(() => {
    pause()
  })

  return {
    timeText,
    start
  }
}
