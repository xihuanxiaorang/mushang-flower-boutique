class WxRequest {
  /**
   * 默认请求配置对象
   */
  defaultConfig = {
    /**
     * 基础 URL 地址
     */
    baseURL: '',
    /**
     * 请求方法 默认为 GET
     */
    method: 'GET',
    /**
     * 请求头
     */
    header: {
      'Content-Type': 'application/json',
    },
    /**
     * 请求超时时间 默认为 60 秒
     */
    timeout: 60000,
    /**
     * 是否显示加载提示，默认为 true
     */
    showLoading: true,
  }

  /**
   * 请求和响应拦截器
   */
  interceptors = {
    /**
     * 请求拦截器函数
     * @param {Object} config - 请求配置对象
     * @returns {Object} - 修改后的请求配置对象
     */
    request: (config) => config,
    /**
     * 响应拦截器函数
     * @param {Object} response - 响应对象
     * @returns {Object} - 修改后的响应对象
     */
    response: (response) => response,
  }

  /**
   * 保存所有正在进行的请求的队列
   */
  queue = []

  /**
   * 定时器 ID 用于控制 loading 的显示与隐藏
   */
  timerId = null

  /**
   * 构造函数 允许传入自定义配置
   * @param {Object} config - 自定义配置对象
   */
  constructor(config = {}) {
    // 合并默认配置与自定义配置
    this.defaultConfig = Object.assign({}, this.defaultConfig, config)
  }

  /**
   * 发起 HTTP 请求
   * @param {Object} config - 请求配置选项
   * @returns {Promise} - 返回一个 Promise 对象
   */
  request(config = {}) {
    // 清除定时器
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
    // 处理请求的配置信息
    config = this.processConfig(config)
    // 如果配置要求显示 loading 且当前队列为空
    if (config.showLoading && this.queue.length === 0) {
      // 显示 loading
      wx.showLoading({ title: '加载中...', mask: true })
    }
    // 创建 Promise 并发起请求
    const promise = new Promise((resolve, reject) => {
      try {
        wx.request({
          success: (res) => {
            // 应用响应拦截器
            resolve(this.interceptors.response(Object.assign({}, res, { config, success: true })))
          },
          fail: (err) => {
            // 应用响应拦截器
            reject(this.interceptors.response(Object.assign({}, err, { config, success: false })))
          },
          complete: () => {
            // 从队列中移除当前请求
            this.queue = this.queue.filter((item) => item.promise !== promise)
            // 设置延迟，确保所有请求完成后才隐藏 loading
            this.timerId = setTimeout(() => {
              // 如果所有请求都不需要显示 loading 或者队列为空的话，则隐藏 loading
              if (this.queue.every((item) => !item.config.showLoading)) {
                wx.hideLoading()
              }
            }, 100)
          },
          ...config,
        })
      } catch (err) {
        reject(err)
      }
    })
    // 将当前请求和配置信息添加到队列中
    this.queue.push({ promise, config })
    return promise
  }

  /**
   * 发起 GET 请求
   * @param {string} url - 请求的 URL
   * @param {Object} [data={}] - 请求参数
   * @param {Object} [config={}] - 额外的配置项
   * @returns {Promise} - 返回一个 Promise 对象
   */
  get(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'GET' }, config))
  }

  /**
   * 发起 POST 请求
   * @param {string} url - 请求的 URL
   * @param {Object} [data={}] - 请求参数
   * @param {Object} [config={}] - 额外的配置项
   * @returns {Promise} - 返回一个 Promise 对象
   */
  post(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'POST' }, config))
  }

  /**
   * 发起 PUT 请求
   * @param {string} url - 请求的 URL
   * @param {Object} [data={}] - 请求参数
   * @param {Object} [config={}] - 额外的配置项
   * @returns {Promise} - 返回一个 Promise 对象
   */
  put(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'PUT' }, config))
  }

  /**
   * 发起 DELETE 请求
   * @param {string} url - 请求的 URL
   * @param {Object} [data={}] - 请求参数
   * @param {Object} [config={}] - 额外的配置项
   * @returns {Promise} - 返回一个 Promise 对象
   */
  delete(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'DELETE' }, config))
  }

  /**
   * 文件上传
   * @param {string} url - 请求的 URL 地址
   * @param {string} filePath - 要上传文件资源的路径（本地路径）
   * @param {string} name - 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
   * @param {Object} [config={}] - 额外的配置项
   * @returns {Promise} - 返回一个 Promise 对象
   */
  upload(url, filePath, name, config = {}) {
    config = this.processConfig(Object.assign({ url, filePath, name }, config))
    return new Promise((resolve, reject) => {
      try {
        wx.uploadFile({
          success: (res) => {
            // 解析返回的数据
            res.data = JSON.parse(res.data)
            // 应用响应拦截器
            resolve(this.interceptors.response(Object.assign({}, res, { config, success: true })))
          },
          fail: (err) => {
            // 应用响应拦截器
            reject(this.interceptors.response(Object.assign({}, err, { config, success: false })))
          },
          ...config,
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 并发请求
   * @param {...Promise} promises - 一个或多个 Promise 对象
   * @returns {Promise} - 返回一个 Promise 对象，当所有并发请求完成时解析
   */
  all(...promises) {
    return Promise.all(promises)
  }

  /**
   * 处理请求的配置信息
   * @param {Object} config - 请求的配置信息
   * @returns {Object} - 处理后的配置信息
   */
  processConfig(config) {
    // 构建完整的 URL
    const url = this.defaultConfig.baseURL + config.url
    // 合并配置项
    config = Object.assign({}, this.defaultConfig, config, { url })
    // 应用请求拦截器
    config = this.interceptors.request(config)
    // 打印配置信息
    console.debug(config)
    // 返回处理后的配置信息
    return config
  }
}

export default WxRequest
