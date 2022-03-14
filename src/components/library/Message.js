// 封装message组件

import { createVNode, render } from 'vue'
import XtxMessage from './XtxMessage.vue'

// 创建真实dom
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

let timer = null

export default ({text, type}) => {
  // 创建虚拟dom
  const vnode = createVNode(XtxMessage, { text, type })
  // 渲染虚拟dom
  render(vnode, div)

  // 销毁组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
