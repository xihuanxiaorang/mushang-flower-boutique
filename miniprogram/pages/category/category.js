import { reqCategoryData } from '../../api/category'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 商品分类数据
     */
    categoryList: [],
    /**
     * 当前激活的一级分类索引，默认为0
     */
    activeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCategoryData()
  },

  /**
   * 获取商品分类数据
   */
  async getCategoryData() {
    const categoryList = await reqCategoryData()
    this.setData({ categoryList })
  },

  /**
   * 当一级分类项被点击时改变激活索引
   * @param {Event} e - 事件对象
   */
  changeActiveIndex(e) {
    const { index: activeIndex } = e.currentTarget.dataset
    this.setData({ activeIndex })
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
