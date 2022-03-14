import request from "@/utils/request"

/**
 * 获取左侧分类品牌推荐数据
 */
export const getBrandListApi = (limit = 6) => {
  return request({
    url: "/home/brand",
    method: "get",
    params: {
      limit
    }
  })
}

/**
 * 获取轮播图数据
 */
export const getBannerListApi = () => {
  return request({
    url: "/home/banner",
    method: "get"
  })
}

/**
 * 获取新鲜好物数据
 */
export const getNewsApi = () => {
  return request({
    url: "/home/new",
    method: "get"
  })
}

/**
 * 获取人气推荐数据
 */
export const getHotApi = () => {
  return request({
    url: "/home/hot",
    method: "get"
  })
}

/**
 * 获取热门品牌数据
 */
export const getBrandApi = () => {
  return request({
    url: "/home/brand",
    method: "get"
  })
}

/**
 * 获取商品数据
 */
export const getGoodsApi = () => {
  return request({
    url: "/home/goods",
    method: "get"
  })
}

/**
 * 获取最新专题
 */
export const getSpecialApi = () => {
  return request({
    url: "/home/special",
    method: "get"
  })
}


