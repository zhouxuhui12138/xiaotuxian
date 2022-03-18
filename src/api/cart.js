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
export const mergeLocalCart = data => {
  return request({
    url: `/member/cart/merge`,
    method: "post",
    data
  })
}

/**
 * 加入购物车
 */
export const addCart = data => {
  return request({
    url: `/member/cart`,
    method: "post",
    data
  })
}

/**
 * 删除购物车
 */
export const delectCart = ids => {
  return request({
    url: `/member/cart`,
    method: "delete",
    data: {
      ids
    }
  })
}

/**
 * 修改购物车
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request({
    url: `/member/cart/${skuId}`,
    method: "put",
    data: {
      selected,
      count
    }
  })
}

/**
 * 全选
 */
export const checkAllCart = ({ selected, ids }) => {
  return request({
    url: `/member/cart/selected`,
    method: "put",
    data: {
      selected,
      ids
    }
  })
}
