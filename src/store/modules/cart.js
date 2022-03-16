import { getNewCartList } from "../../api/cart"

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
    },
    // 无效商品列表
    unUsedList(state) {
      return state.list.filter(item => (item.skuId && !item.isEffective) || item.stock <= 0)
    },
    // 已选择的商品列表
    selectedList(state, getters) {
      return state.list.filter(item => item.selected)
    },
    // 已选择商品总件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选择商品总金额
    selectedTotalPrice(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count * parseInt(c.nowPrice * 100), 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.trueList.length !== 0 && getters.trueList.length === getters.selectedList.length
    }
  },
  mutations: {
    // 添加购物车
    addCart(state, payload) {
      // 获取重复商品的index
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        // 有重复商品
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原有
        state.list.splice(sameIndex, 1)
      }
      // 插入最新
      state.list.unshift(payload)
    },
    // 更新购物车
    updataCart(state, payload) {
      const updataGoods = state.list.find(item => item.skuId === payload.skuId)
      for (const key in payload) {
        if (payload[key] !== undefined && payload[key] !== null && payload[key] !== "") {
          updataGoods[key] = payload[key]
        }
      }
    },
    // 删除购物车
    delectCart(state, payload) {
      const index = state.list.findIndex(item => item.skuId === payload)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 添加购物车
    addCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
        } else {
          ctx.commit("addCart", payload)
          resolve()
        }
      })
    },
    // 获取最新购物车数据
    getCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
        } else {
          const promiseArr = ctx.getters.trueList.map(item => {
            if (item.skuId) {
              return getNewCartList(item.skuId)
            }
          })
          Promise.all(promiseArr).then(resList => {
            resList.forEach((item, index) => {
              ctx.commit("updataCart", {
                skuId: ctx.getters.trueList[index].skuId,
                ...item.result
              })
            })
          })
          resolve()
        }
      })
    },
    // 删除购物车
    delectCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
        } else {
          ctx.commit("delectCart", payload)
          resolve()
        }
      })
    },
    // 修改购物车
    updataCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
        } else {
          ctx.commit("updataCart", payload)
          resolve()
        }
      })
    },
    // 全选
    checkAllCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
        } else {
          ctx.getters.trueList.forEach(item => {
            ctx.commit("updataCart", { skuId: item.skuId, selected: payload })
          })
          resolve()
        }
      })
    },
    // 批量删除
    batchDelectCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
        } else {
          ctx.getters[isClear === -1 ? "unUsedList" : "selectedList"].forEach(item => {
            ctx.commit("delectCart", { skuId: item.skuId })
          })
          resolve()
        }
      })
    }
  }
}
