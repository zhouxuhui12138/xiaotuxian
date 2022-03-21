import request from "@/utils/request"

/**
 * 生成订单信息
 */
export const createOrder = () => {
  return request({
    url: "/member/order/pre",
    method: "get"
  })
}

/**
 * 添加收货地址
 */
export const addAddress = (data) => {
  return request({
    url: "/member/address",
    method: "post",
    data
  })
}

/**
 * 修改收货地址
 */
export const editAddress = (data) => {
  return request({
    url: `/member/address/${data.id}`,
    method: "put",
    data
  })
}

/**
 * 提交订单
 */
export const submitOrder = (data) => {
  return request({
    url: `/member/order`,
    method: "post",
    data
  })
}

/**
 * 获取订单信息
 */
export const findOrder = (id) => {
  return request({
    url: `/member/order/${id}`,
    method: "get"
  })
}
