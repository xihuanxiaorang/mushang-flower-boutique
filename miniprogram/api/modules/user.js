import http from '@/utils/http'

/**
 * 微信登录
 * @param {string} code 临时登录凭证
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为登录信息
 */
export const login = (code) => {
  return http.get(`/weixin/wxLogin/${code}`)
}

/**
 * 获取用户信息
 *
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为用户信息。
 */
export const getUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}

/**
 * 文件上传
 * @param {string} filePath - 要上传文件资源的路径（本地路径）
 * @param {string} name - 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
 * @returns {Promise} - 返回一个 Promise 对象
 */
export const uploadFile = (filePath, name) => {
  return http.upload('/fileUpload', filePath, name)
}

/**
 * 更新用户信息
 *
 * @param {Object} userInfo - 最新的用户信息
 * @returns {Promise<any>} - 返回一个 Promise 对象，该对象在请求成功后解析为响应数据。
 */
export const updateUserInfo = (userInfo) => {
  return http.post('/weixin/updateUser', userInfo)
}
