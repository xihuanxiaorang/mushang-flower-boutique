import * as goodsApi from '../../../api/goods'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 商品列表数据
     */
    goodsList: [],
    /**
     * 数据总条数
     */
    total: 0,
    /**
     * 分页请求参数
     */
    params: {
      /**
       * 页码
       */
      page: 1,
      /**
       * 每页展示条数
       */
      limit: 10,
      /**
       * 一级分类 id
       */
      category1Id: '',
      /**
       * 二级分类 id
       */
      category2Id: '',
    },
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
    Object.assign(this.data.params, options)
    this.getGoodsList()
  },

  /**
   * 获取商品分页列表数据
   */
  async getGoodsList() {
    if (this.data.isLoading) return
    this.setData({ isLoading: true })
    const { records, total } = await goodsApi.getGoodsList(this.data.params)
    this.setData({ goodsList: [...this.data.goodsList, ...records], total, isLoading: false })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({ goodsList: [], total: 0, noMore: false, 'params.page': 1 })
    await this.getGoodsList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.noMore) return
    const { goodsList, total, params } = this.data
    if (goodsList.length >= total) {
      this.setData({ noMore: true })
      return
    }
    const { page } = params
    this.setData({ 'params.page': page + 1 })
    this.getGoodsList()
  },
})
