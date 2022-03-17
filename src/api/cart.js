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

/**
 * 获取购物车列表
 */
export const getCart = () => {
  return request({
    url: `/member/cart`,
    method: "get"
  })
}

/**
 * 合并购物车
 */
export const mergeLocalCart  = data => {
  return request({
    url: `/member/cart/merge`,
    method: "post",
    data
  })
}

/**
 * 加入购物车
 */
export const addCart  = data => {
  return request({
    url: `/member/cart`,
    method: "post",
    data
  })
}
