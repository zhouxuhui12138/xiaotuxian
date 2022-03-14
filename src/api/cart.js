import request from "@/utils/request"

/**
 * 更新购物车商品信息
 */
export const getNewCartList = skuId => {
  return request({
    url: `/goods/stock/${skuId}`,
    method: "get"
  })
}
