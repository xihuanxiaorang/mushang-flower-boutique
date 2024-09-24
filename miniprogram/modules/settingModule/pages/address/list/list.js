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
    const { navigateFrom } = options
    if (navigateFrom) this.navigateFrom = navigateFrom
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
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAddressList()
  },

  /**
   * 选择地址
   *
   * 用于订单结算页面快速更换收货地址，在选择地址后将地址保存到全局变量中备用，然后在订单结算页面中取出使用
   *
   * @param {Event} e 事件对象,，包含要选择的收货地址索引
   */
  chooseAddress(e) {
    if (this.navigateFrom !== 'orderPay') return
    const { index } = e.currentTarget.dataset
    const address = this.data.addressList[index]
    if (address) {
      getApp().globalData.address = address
      wx.navigateBack()
    }
  },
})
