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

/**
 * 根据 ID 获取收货地址详情
 *
 * @param {number|string} id - 收货地址id
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为收货地址详情。
 */
export const getAddressById = (id) => {
  return http.get(`/userAddress/${id}`)
}

/**
 * 添加新的收货地址
 *
 * @param {object} address - 收货地址对象
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为响应数据。
 */
export const addAddress = (address) => {
  return http.post('/userAddress/save', address)
}

/**
 * 更新指定的收货地址
 *
 * @param {object} address - 收货地址对象
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为响应数据。
 */
export const updateAddress = (address) => {
  return http.post('/userAddress/update', address)
}
