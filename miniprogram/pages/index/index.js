import { indexApi } from '../../api/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 轮播图列表
     */
    bannerList: [],
    /**
     * 商品导航分类列表
     */
    categoryList: [],
    /**
     * 广告列表
     */
    adList: [],
    /**
     * 猜你喜欢商品列表
     */
    guessList: [],
    /**
     * 人气推荐商品列表
     */
    hotList: [],
    /**
     * 加载状态标志，默认为 true，表示正在加载数据
     */
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexData()
  },

  /**
   * 获取首页数据
   */
  async getIndexData() {
    // 调用 API 获取首页数据
    const [bannerList, categoryList, adList, guessList, hotList] = await indexApi.getIndexData()
    // 设置数据到页面的 data 中，并将 loading 设置为 false，表示数据加载完成
    this.setData({ bannerList, categoryList, adList, guessList, hotList, loading: false })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
