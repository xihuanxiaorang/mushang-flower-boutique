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

/**
 * 提交订单
 * @param {Object} data - 提交订单所需的参数
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为提交订单的结果
 */
export const submitOrder = (data) => {
  return http.post('/order/submitOrder', data)
}

/**
 * 获取预支付订单信息
 * @param {string} orderNo - 订单号
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为预支付订单信息
 */
export const getPrePayOrder = (orderNo) => {
  return http.get(`/webChat/createJsapi/${orderNo}`)
}

/**
 * 查询支付状态
 * @param {string} orderNo - 订单号
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为支付状态信息
 */
export const getPayStatus = (orderNo) => {
  return http.get(`/webChat/queryPayStatus/${orderNo}`)
}

/**
 * 获取订单列表
 * @param {number} page - 当前页码
 * @param {number} limit - 每页的数量
 * @returns {Promise} 返回一个 Promise 对象，该对象在请求成功后解析为订单列表数据
 */
export const getOrderList = (page, limit) => {
  return http.get(`/order/order/${page}/${limit}`)
}
