import request from "@/utils/request"

/**
 * 获取商品详情
 */
export const getGoods = id => {
  return request({
    url: "/goods",
    method: "get",
    params: {
      id
    }
  })
}

/**
 * 获取商品推荐 传入id是商品推荐 不传id是猜你喜欢
 */
export const getRecommednGoods = ({ id, limit }) => {
  return request({
    url: "/goods/relevant",
    method: "get",
    params: {
      id,
      limit
    }
  })
}

/**
 * 获取商品推荐 传入id是商品推荐 不传id是猜你喜欢
 */
export const getHotGoods = ({ id, type, limit }) => {
  return request({
    url: "/goods/hot",
    method: "get",
    params: {
      id,
      type,
      limit
    }
  })
}

/**
 * 获取商品评价信息
 */
export const getCommentInfo = (id) => {
  return request({
    // axios遇见http开头的url 不会追url
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    method: "get"
  })
}

/**
 * 获取商品评价列表
 */
export const getCommentList = (id, params) => {
  return request({
    // axios遇见http开头的url 不会追url
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    method: "get",
    params
  })
}
