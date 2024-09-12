import http from '../utils/http'

/**
 * 获取商品分类数据
 *
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为商品分类数据。
 */
export const reqCategoryData = () => {
  return http.get('/index/findCategoryTree')
}
