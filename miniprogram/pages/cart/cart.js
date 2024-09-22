import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/index'
import { cartApi } from '@/api/index'

Page({
  behaviors: [storeBindingsBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 购物车中的商品列表数据
     */
    cartList: [],
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
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCartList()
  },

  /**
   * 获取购物车中的商品列表
   */
  async getCartList() {
    if (!this.data.userInfo) {
      return
    }
    const cartList = await cartApi.getCartList()
    this.setData({ cartList })
  },
})
