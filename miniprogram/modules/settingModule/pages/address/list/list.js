import { useModal, useToast } from '@/utils/extendApi'
import * as addressApi from '../../../api/address'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAddressList()
  },

  /**
   * 获取用户收货地址列表
   */
  async getAddressList() {
    const addressList = await addressApi.getAddressList()
    this.setData({ addressList })
  },

  /**
   * 修改收货地址
   *
   * @param {Event} e - 事件对象，包含要编辑的收货地址id
   */
  editAddress(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/modules/settingModule/pages/address/add/add?id=${id}` })
  },

  /**
   * 删除指定的收货地址
   *
   * @param {Event} e - 事件对象，包含要删除的收货地址id
   */
  async deleteAddress(e) {
    const modalRes = await useModal({
      content: '删除后信息将无法恢复，是否确定删除？',
    })
    if (modalRes) {
      const { id } = e.currentTarget.dataset
      await addressApi.deleteAddress(id)
      await this.getAddressList()
      useToast({ icon: 'success', title: '删除成功' })
    }
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
