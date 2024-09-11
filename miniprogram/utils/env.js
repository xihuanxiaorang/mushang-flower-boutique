// 获取当前小程序的环境版本信息
const { miniProgram } = wx.getAccountInfoSync()
const { envVersion } = miniProgram

// 初始化环境配置对象
const env = {
  baseURL: '', // 默认基础URL为空
}

// 根据不同的环境版本设置相应的基础URL
switch (envVersion) {
  // 开发版
  case 'develop':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break
  // 体验版
  case 'trial':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break
  // 正式版
  case 'release':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break
  // 默认情况，如果以上都不是，则使用默认的基础URL
  default:
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break
}

// 导出环境配置供其他模块使用
export default env
