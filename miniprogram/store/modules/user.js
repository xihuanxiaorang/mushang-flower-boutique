import { makeAutoObservable } from 'mobx-miniprogram'
import { userApi } from '@/api/index'

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

  /**
   * 更新用户信息
   *
   * 该方法用于更新用户的个人信息，并同步更新本地存储中的用户信息。
   *
   * @param {object} userInfo - 用户信息对象，包含要更新的信息
   * @returns {Promise<object>} - 返回一个 Promise 对象，该对象在请求成功后解析为更新后的用户信息。
   */
  updateUserInfo(userInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        this.userInfo = Object.assign({}, this.userInfo, userInfo)
        await userApi.updateUserInfo(this.userInfo)
        wx.setStorageSync('userInfo', this.userInfo)
        resolve(this.userInfo)
      } catch (err) {
        // 捕获错误并拒绝 Promise
        reject(err)
      }
    })
  }

  /**
   * 退出登录，清除身份令牌以及用户信息
   */
  logout() {
    this.token = ''
    this.userInfo = null
    wx.clearStorageSync()
  }
}

// 创建 UserStore 实例并导出
export const userStore = new UserStore()
