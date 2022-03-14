import request from "@/utils/request"

/**
 * 获取全部分类
 */
export const getAllCategory = () => {
  return request({
    url: "/home/category/head",
    method: "get"
  })
}

/**
 * 获取顶级分类数据
 */
export const getTopCategory = (id) => {
  return request({
    url: "category",
    method: "get",
    params: {
      id
    }
  })
}

/**
 * 获取二级分类筛选数据
 */
export const getSubFilter = (id) => {
  return request({
    url: "/category/sub/filter",
    method: "get",
    params: {
      id
    }
  })
}

/**
 * 获取二级分类下的商品数据
 */
export const getSubCategoryGoods = (data) => {
  return request({
    url: "/category/goods/temporary",
    method: "post",
    data
  })
}
