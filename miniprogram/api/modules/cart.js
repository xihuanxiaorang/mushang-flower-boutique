import http from '@/utils/http'

/**
 * 向购物车中添加商品
 *
 * @param {Object} params - 请求参数
 * @param {number} params.id - 商品id
 * @param {number} params.count - 添加到购物车的数量
 * @param {...any} params.data - 其他请求参数
 * @returns {Promise} - 返回一个 Promise 对象，该对象在请求成功后解析为服务器响应的数据
 */
export const addCart = ({ id, count, ...data }) => {
  return http.get(`/cart/addToCart/${id}/${count}`, data)
}

/**
 * 获取购物车中的商品列表
 *
 * @returns {Promise} - 返回一个 Promise 对象，该对象在请求成功后解析为购物车中的商品列表数据
 */
export const getCartList = () => {
  return http.get('/cart/getCartList')
}
