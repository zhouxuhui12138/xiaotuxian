// 购物车状态
export default {
  namespaced: true,
  state() {
    return {
      list: []
    }
  },
  getters: {
    // 有效商品列表
    trueList(state) {
      return state.list.filter(item => item.isEffective && item.stock > 0)
    },
    // 有效商品数量
    trueTotal(state, getters) {
      return getters.trueList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品金额
    trueTotalPrice(state, getters) {
      return getters.trueList.reduce((p, c) => p + c.count * parseInt(c.nowPrice * 100), 0) / 100
    }
  },
  mutations: {
    // 添加购物车
    addCart(state, payload) {
      // 获取重复商品的index
      const sameIndex = state.list.findIndex(
        goods => goods.skuId === payload.skuId
      )
      if (sameIndex > -1) {
        // 有重复商品
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原有
        state.list.splice(sameIndex, 1)
      }
      // 插入最新
      console.log(payload)
      state.list.unshift(payload)
    }
  },
  actions: {
    addCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit("addCart", payload)
          resolve()
        }
      })
    }
  }
}
