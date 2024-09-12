Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 轮播图列表
     */
    bannerList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * 当前轮播图索引，默认为0
     */
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 该方法会在轮播图切换到新的图片时被触发，主要功能是更新当前活动索引。
     *
     * @param {Object} e - 事件对象，包含轮播图切换的信息
     */
    onSwiperChange(e) {
      const { current: currentIndex } = e.detail
      this.setData({ currentIndex })
    },
  },
})
