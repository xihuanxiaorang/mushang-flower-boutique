import http from '../utils/http'

/**
 * 请求首页数据
 * @returns {Promise<Array>} - 返回一个包含多个请求结果的数组的 Promise
 */
export const reqIndexData = () => {
  return http.all(
    // 首页轮播图数据
    http.get('/index/findBanner'),
    // 商品一级分类数据
    http.get('/index/findCategory1'),
    // 广告数据
    http.get('/index/advertisement'),
    // 猜你喜欢商品数据
    http.get('/index/findListGoods'),
    // 人气推荐商品数据
    http.get('/index/findRecommendGoods')
  )
}
