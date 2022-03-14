import request from "@/utils/request"

/**
 * 账号登录
 */
export const loginByAccount = (data) => {
  return request({
    url: "/login",
    method: "post",
    data
  })
}

/**
 * 发送验证码
 * !!接口不可用
 */
export const sendMsg = (mobile) => {
  return request({
    url: "/login/code",
    method: "get",
    params: {
      mobile
    }
  })
}

/**
 * 验证码登录
 */
export const loginByMsg = (data) => {
  return request({
    url: "/login/code",
    method: "post",
    data
  })
}
