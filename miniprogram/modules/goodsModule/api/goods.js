import http from '@/utils/http'

/**
 * 获取商品分页列表数据
 *
 * @param {Object} params - 查询参数
 * @param {number} params.page - 当前页码
 * @param {number} params.limit - 每页数量
 * @param {...any} params.data- 其他查询参数
 * @returns {Promise} - 返回一个 Promise 对象，该对象在请求成功后解析为商品分页列表数据
 */
export const getGoodsList = ({ page, limit, ...data }) => {
  return http.get(`/goods/list/${page}/${limit}`, data)
}

/**
 * 根据商品id获取商品详情
 *
 * @param {number} id - 商品id
 * @returns {Promise} - 返回一个 Promise 对象，该对象在请求成功后解析为商品详情
 */
export const getGoodsById = (id) => {
  return http.get(`/goods/${id}`)
}
