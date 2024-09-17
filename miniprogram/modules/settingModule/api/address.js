import http from '@/utils/http'

/**
 * 获取用户收货地址列表
 *
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为收货地址列表。
 */
export const getAddressList = () => {
  return http.get('/userAddress/findUserAddress')
}

/**
 * 删除指定的收货地址
 *
 * @param {number|string} id - 收货地址id
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为响应数据。
 */
export const deleteAddress = (id) => {
  return http.get(`/userAddress/delete/${id}`)
}
