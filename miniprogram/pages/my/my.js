import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/index'

Page({
  behaviors: [storeBindingsBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    orderPanelItems: [
      { title: '商品订单', iconfont: 'icon-shangpindingdan', url: '/modules/orderPayModule/pages/order/list/list' },
      { title: '礼品卡订单', iconfont: 'icon-lipinka', url: '/modules/orderPayModule/pages/order/list/list' },
      { title: '退款/售后', iconfont: 'icon-tuikuan', url: '/modules/orderPayModule/pages/order/list/list' },
    ],
  },

  storeBindings: [
    {
      store: userStore,
      fields: {
        userInfo: (store) => store.userInfo,
      },
    },
  ],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 跳转到登录页面
   */
  gotoLogin() {
    wx.navigateTo({ url: '/pages/login/login' })
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
