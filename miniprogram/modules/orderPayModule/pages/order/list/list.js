import * as orderApi from '../../../api/order'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 订单列表数据
     */
    orderList: [],
    /**
     * 数据总条数
     */
    total: 0,
    /**
     * 页码
     */
    page: 1,
    /**
     * 每页展示条数
     */
    limit: 10,
    /**
     * 没有更多数据标志
     */
    noMore: false,
    /**
     * 正在加载数据中标志
     */
    isLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrderList()
  },

  async getOrderList() {
    if (this.data.isLoading) return
    this.setData({ isLoading: true })
    const { page, limit } = this.data
    const { records, total } = await orderApi.getOrderList(page, limit)
    this.setData({ orderList: [...this.data.orderList, ...records], total, isLoading: false })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({ orderList: [], total: 0, noMore: false, page: 1 })
    await this.getOrderList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.noMore) return
    const { orderList, total, page } = this.data
    if (orderList.length >= total) {
      this.setData({ noMore: true })
      return
    }
    this.setData({ page: page + 1 })
    this.getOrderList()
  },
})
