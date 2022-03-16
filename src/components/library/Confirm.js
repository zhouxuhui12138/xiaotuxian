import { createVNode, render } from "vue"
import XtxConfirm from "./XtxConfirm.vue"

// 创建真实dom
const div = document.createElement("div")
div.setAttribute("class", "xtx-confirm-container")
document.body.appendChild(div)

// 需要返回promise
export default ({ text, title }) => {
  return new Promise((resolve, reject) => {
    const hideCallback = () => {
      render(null, div)
      reject(new Error("点击取消"))
    }

    const submitCallback = () => {
      render(null, div)
      resolve()
    }

    const vnode = createVNode(XtxConfirm, { text, title, hideCallback, submitCallback })
    render(vnode, div)
  })
}
