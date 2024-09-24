import * as goodsApi from '../../../api/goods'
import { cartApi } from '@/api/index'
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/index'
import { useToast } from '@/utils/extendApi'
const computedBehavior = require('miniprogram-computed').behavior

Page({
  behaviors: [storeBindingsBehavior, computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 商品详情
     */
    goods: null,
    /**
     * 用于控制显示/隐藏弹框
     */
    showPopup: false,
    /**
     * 用于区分点击的是加入购物车还是立即购买
     */
    actionType: '',
    /**
     * 购买数量
     */
    count: 1,
    /**
     * 祝福语
     */
    blessing: '',
    /**
     * 购物车中商品总数量
     */
    total: 0,
  },

  storeBindings: [
    {
      store: userStore,
      fields: {
        userInfo: (store) => store.userInfo,
      },
    },
  ],

  computed: {
    totalCount(data) {
      const { total } = data
      if (total === 0) return ''
      return total > 99 ? '99+' : `${total}`
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    this.getGoodsById(id)
    this.getCartCount()
  },

  /**
   * 根据商品id获取商品详情
   * @param {number} id 商品id
   */
  async getGoodsById(id) {
    const goods = await goodsApi.getGoodsById(id)
    this.setData({ goods })
  },

  /**
   * 全屏预览图片
   */
  previewImage() {
    wx.previewImage({ urls: this.data.goods.detailList })
  },

  /**
   * 关闭弹窗
   */
  closePopup() {
    this.setData({ showPopup: false })
  },

  /**
   * 点击加入购物车按钮时显示弹窗
   */
  addCart() {
    this.setData({ actionType: 'addCart', showPopup: true })
  },

  /**
   * 点击立即购买按钮时显示弹窗
   */
  buyNow() {
    this.setData({ actionType: 'buyNow', showPopup: true })
  },

  /**
   * 更改购买数量
   * @param {Event} e 事件对象
   */
  changeCount(e) {
    this.setData({ count: Number(e.detail) })
  },

  /**
   * 提交表单，用于将商品加入购物车或者立即购买商品
   */
  async submit() {
    const { userInfo, actionType, goods, count, blessing } = this.data
    const { id } = goods
    if (!userInfo) {
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
    if (actionType === 'buyNow') {
      wx.navigateTo({ url: `/modules/orderPayModule/pages/order/detail/detail?goodsId=${id}&blessing=${blessing}` })
    } else {
      await cartApi.addCart({ id, count, blessing })
      this.getCartCount()
      useToast({ title: '加入购物车成功' })
      this.closePopup()
    }
  },

  /**
   * 获取购物车中商品总数量
   */
  async getCartCount() {
    if (!this.data.userInfo) return
    const cartList = await cartApi.getCartList()
    const total = cartList.reduce((sum, item) => sum + item.count, 0)
    this.setData({ total })
  },
})
