// 分类模块
import { topCategory } from "@/api/constants"
import { getAllCategory } from "@/api/category"

export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    // 修改分类数组
    setList(state, payload) {
      state.list = payload
    },
    // 控制分类显示和隐藏
    show(state, id) {
      const category = state.list.find(category => category.id === id)
      category.open = false
      category.open = true
    },
    hide(state, id) {
      const category = state.list.find(category => category.id === id)
      category.open = false
    }
  },
  actions: {
    // 获取分类信息
    async getList({ commit }) {
      const { result } = await getAllCategory()
      result.forEach(item => {
        item.open = false
      })

      commit("setList", result)
    }
  }
}
