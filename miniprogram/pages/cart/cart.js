import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/index'
import { cartApi } from '@/api/index'
import { useModal, useToast } from '@/utils/extendApi'
import { debounce } from 'miniprogram-licia'
const computedBehavior = require('miniprogram-computed').behavior

Page({
  behaviors: [storeBindingsBehavior, computedBehavior],

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

  computed: {
    checked(data) {
      const { cartList } = data
      return cartList && cartList.length > 0 && cartList.every((item) => item.isChecked)
    },
    totalPrice(data) {
      const { cartList } = data
      if (cartList && cartList.length > 0) {
        return cartList.filter((item) => item.isChecked).reduce((sum, item) => sum + item.price * item.count, 0)
      }
      return 0
    },
  },

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

  /**
   * 选择或取消选择某个商品
   * @param {Event} e 事件对象，包含商品id、索引和选中状态
   */
  async selectItem(e) {
    const { id, index } = e.currentTarget.dataset
    const checked = e.detail ? 1 : 0
    await cartApi.updateCheckedStatus(id, checked)
    this.setData({ [`cartList[${index}].isChecked`]: checked })
  },

  /**
   * 全选或取消全选所有商品
   * @param {Event} e 事件对象，包含选中状态
   */
  async selectAllItems(e) {
    const checked = e.detail ? 1 : 0
    await cartApi.updateAllCheckedStatus(checked)
    const cartList = Object.assign([], this.data.cartList)
    cartList.forEach((item) => (item.isChecked = checked))
    this.setData({ cartList })
  },

  /**
   * 更改购物车中某个商品的数量
   *
   * @param {Event} e 事件对象，包含商品id、索引和新旧数量
   */
  changeCount: debounce(async function (e) {
    const { id, index, count: oldCount } = e.currentTarget.dataset
    const newCount = e.detail
    const diff = newCount - oldCount
    if (diff === 0) return
    await cartApi.addCart({ id, count: diff })
    this.setData({ [`cartList[${index}].count`]: newCount })
  }, 500),

  /**
   * 删除购物车中的某个商品。
   *
   * @param {Event} e 事件对象，包含商品id
   */
  async deleteItem(e) {
    const modalRes = await useModal({
      content: '删除后信息将无法恢复，是否确定删除？',
    })
    if (modalRes) {
      const { id } = e.currentTarget.dataset
      await cartApi.deleteCartItem(id)
      await this.getCartList()
      useToast({ icon: 'success', title: '删除成功' })
    }
  },
})
