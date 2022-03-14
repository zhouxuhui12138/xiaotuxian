import { getNewCartList } from "../../api/cart"

// 购物车状态
export default {
  namespaced: true,
  state() {
    return {
      list: null
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
      return (
        getters.trueList.reduce(
          (p, c) => p + c.count * parseInt(c.nowPrice * 100),
          0
        ) / 100
      )
    }
  },
  mutations: {
    // 添加购物车 同步
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
      state.list.unshift(payload)
    },
    // 更新购物车 同步
    updataCart(state, payload) {
      const updataGoods = state.list.find(item => item.skuId === payload.skuId)
      for (const key in payload) {
        if (
          payload[key] !== undefined &&
          payload[key] !== null &&
          payload[key] !== ""
        ) {
          updataGoods[key] = payload[key]
        }
      }
    },
    // 删除购物车 同步
    delectCart(state, payload) {
      const index = state.list.findIndex(item => item.skuId === payload)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 添加购物车 异步
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
    },
    // 更新购物车 异步
    getCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
          // 已登录
        } else {
          // 未登录
          // 获取所有购物车数据
          const promiseArr = ctx.getters.trueList.map(item => {
            if (item.skuId) {
              return getNewCartList(item.skuId)
            }
          })
          Promise.all(promiseArr).then(resList => {
            resList.forEach((item, index) => {
              ctx.commit('updataCart', {
                skuId: ctx.getters.trueList[index].skuId,
                ...item.result
              })
            })
          })
          resolve()
        }
      })
    },
    // 删除购物车 异步
    delectCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.users.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit("delectCart", payload)
          resolve()
        }
      })
    },
  }
}
