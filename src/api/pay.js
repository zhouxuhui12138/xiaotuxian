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
