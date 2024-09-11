import WxRequest from './request'
import env from './env'
import { useModal, useToast } from './extendApi'

// 创建 WxRequest 实例并设置基础 URL 和超时时间
const instance = new WxRequest({
  baseURL: env.baseURL,
  timeout: 5000,
})

/**
 * 自定义请求拦截器
 * @param {Object} config - 请求配置对象
 * @returns {Object} - 修改后的请求配置对象
 */
instance.interceptors.request = (config) => {
  // 尝试从本地存储中获取访问令牌 token
  const token = wx.getStorageSync('token')
  // 如果访问令牌 token 存在，则将其添加到请求头中
  if (token) {
    config.header['token'] = token
  }
  // 在发送请求之前做些什么
  return config
}

/**
 * 自定义响应拦截器
 * @param {Object} response - 响应对象
 * @returns {Promise|Object} - 根据响应情况返回 Promise 或数据对象
 */
instance.interceptors.response = async (response) => {
  const { success, data: res } = response
  // 检查请求是否成功
  if (!success) {
    useToast({ title: '网络异常请重试', icon: 'error' })
    return Promise.reject(response)
  }
  const { data, code } = res
  // 根据响应码 code 进行不同的处理
  switch (code) {
    // 如果状态码为 200，则表示请求成功
    case 200:
      // 返回解析后的数据
      return Promise.resolve(data)
    // 如果状态码为 208，则表示登录授权过期
    case 208:
      const modalRes = await useModal({
        content: '登录授权过期，请重新登录',
        showCancel: false,
      })
      if (modalRes) {
        // 清除本地存储中的数据
        wx.clearStorageSync()
        // 导航至登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
      break
    // 其他状态码
    default:
      useToast({
        title: '服务器异常，请联系客服或稍后重试！',
        icon: 'error',
      })
      return Promise.reject(response)
  }
}

export default instance
