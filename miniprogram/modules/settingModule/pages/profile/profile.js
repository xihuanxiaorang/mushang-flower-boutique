import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/index'
import { userApi } from '@/api/index'

Page({
  behaviors: [storeBindingsBehavior],

  /**
   * 页面的初始数据
   */
  data: {},

  storeBindings: [
    {
      store: userStore,
      fields: {
        userInfo: (store) => store.userInfo,
      },
      actions: ['updateUserInfo'],
    },
  ],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 选择头像并上传
   *
   * 此方法用于处理用户选择头像的事件，并将所选头像上传至服务器。
   * @param {Event} e - 事件对象，包含用户选择的头像信息
   */
  async onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    // 将头像上传至服务器，并获取上传后的 URL
    const headimgurl = await userApi.uploadFile(avatarUrl, 'file')
    this.setData({ 'userInfo.headimgurl': headimgurl })
  },

  /**
   * 更新用户信息
   *
   * 关于用户头像昵称填写能力具体可以参考官方文档 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html
   *
   * @param {Event} e - 事件对象，包含表单提交的数据
   */
  async saveUserInfo(e) {
    // 从事件对象中提取用户输入的昵称
    const { nickname } = e.detail.value
    await this.updateUserInfo({
      headimgurl: this.data.userInfo.headimgurl,
      nickname,
    })
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
})
