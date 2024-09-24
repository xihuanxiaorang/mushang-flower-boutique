import http from '@/utils/http'

/**
 * 获取订单的收货地址
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为订单的收货地址
 */
export const getAddress = () => {
  return http.get('/userAddress/getOrderAddress')
}

/**
 * 获取订单信息
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为订单信息
 */
export const getOrder = () => {
  return http.get('/order/trade')
}

/**
 * 立即购买指定商品
 * @param {Object} params - 请求参数
 * @param {number} params.goodsId - 商品id
 * @param {...any} params.data - 其他请求参数
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为订单信息
 */
export const buyNow = ({ goodsId, ...data }) => {
  return http.get(`/order/buy/${goodsId}`, data)
}
