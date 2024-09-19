import { categoryApi } from '@/api/index'

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
    const categoryList = await categoryApi.getCategoryData()
    this.setData({ categoryList })
  },

  /**
   * 当一级分类项被点击时改变激活索引
   * @param {Event} e - 事件对象
   */
  changeActiveIndex(e) {
    const activeIndex = e.detail
    this.setData({ activeIndex })
  },
})
