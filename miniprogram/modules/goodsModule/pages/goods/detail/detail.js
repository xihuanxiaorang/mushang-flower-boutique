import * as goodsApi from '../../../api/goods'

Page({
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    this.getGoodsById(id)
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
   * 提交表单
   * @param {Event} e 事件对象
   */
  submit(e) {
    console.log(e)
  },
})
