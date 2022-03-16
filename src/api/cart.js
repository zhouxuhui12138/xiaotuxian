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

/**
 * 获取购物车sku信息
 */
export const getCartSku = skuId => {
  return request({
    url: `/goods/sku/${skuId}`,
    method: "get"
  })
}
