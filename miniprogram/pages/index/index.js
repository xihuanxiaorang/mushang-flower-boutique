import { reqIndexData } from '../../api/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 轮播图数据列表
     */
    bannerList: [],
    /**
     * 商品导航分类数据列表
     */
    categoryList: [],
    /**
     * 活动广告数据列表
     */
    activeList: [],
    /**
     * 人气推荐商品数据列表
     */
    hotList: [],
    /**
     * 猜你喜欢商品数据列表
     */
    guessList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexData()
  },

  async getIndexData() {
    const [bannerList, categoryList, activeList, guessList, hotList] = await reqIndexData()
    this.setData({ bannerList, categoryList, activeList, guessList, hotList })
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
