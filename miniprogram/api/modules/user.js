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
