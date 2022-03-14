// 用户模块
export default {
  namespaced: true,
  // 模块的state要写成函数
  state() {
    return {
      profile: {
        id: "",
        avatar: "",
        nickname: "",
        account: "",
        mobile: "",
        token: ""
      }
    }
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload
    }
  }
}
