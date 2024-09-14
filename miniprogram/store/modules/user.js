import { makeAutoObservable } from 'mobx-miniprogram'
import { userApi } from '../../api/index'

class UserStore {
  /**
   * 身份令牌
   */
  token = wx.getStorageSync('token')

  /**
   * 用户信息
   */
  userInfo = wx.getStorageSync('userInfo')

  /**
   * 构造函数
   * 使用 MobX 的 makeAutoObservable 方法自动使类属性可观察
   */
  constructor() {
    makeAutoObservable(this)
  }

  /**
   * 用户登录
   * @param {string} code - 临时登录凭证
   * @returns {Promise} - 返回一个 Promise 对象，该对象在请求成功后解析为用户信息
   */
  login(code) {
    return new Promise(async (resolve, reject) => {
      try {
        const { token } = await userApi.login(code)
        this.setToken(token)
        const userInfo = await userApi.getUserInfo()
        this.setUserInfo(userInfo)
        resolve(userInfo)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 设置身份令牌
   * @param {string} token - 身份令牌
   */
  setToken(token) {
    this.token = token
    wx.setStorageSync('token', token)
  }

  /**
   * 设置用户信息
   * @param {object} userInfo - 用户信息
   */
  setUserInfo(userInfo) {
    this.userInfo = userInfo
    wx.setStorageSync('userInfo', userInfo)
  }
}

// 创建 UserStore 实例并导出
export const userStore = new UserStore()
