import * as addressApi from '../../../api/address'
import Schema from 'async-validator'
import { useModal, useToast } from '@/utils/extendApi'
const computedBehavior = require('miniprogram-computed').behavior
const chooseLocation = requirePlugin('chooseLocation')
/**
 * 腾讯位置服务申请的key
 */
const key = 'HBQBZ-ZZT3G-JXTQ2-QV2JG-IDUQ6-VOFBQ'
const QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js')
const qqmapsdk = new QQMapWX({ key })

Page({
  behaviors: [computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 收货地址id
     */
    id: null,
    /**
     * 收货人姓名
     */
    name: '',
    /**
     * 收货人手机号
     */
    phone: '',
    /**
     * 省
     */
    provinceName: '',
    /**
     * 省编码
     */
    provinceCode: '',
    /**
     * 市
     */
    cityName: '',
    /**
     * 市编码
     */
    cityCode: '',
    /**
     * 区
     */
    districtName: '',
    /**
     * 区编码
     */
    districtCode: '',
    /**
     * 详细地址
     */
    address: '',
    /**
     * 完整地址
     */
    fullAddress: '',
    /**
     * 是否默认地址
     */
    isDefault: 0,
  },

  computed: {
    region(data) {
      const { provinceName, cityName, districtName } = data
      return [provinceName, cityName, districtName].join(' ').trim()
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    if (id) {
      this.setData({ id })
      wx.setNavigationBarTitle({ title: '修改地址' })
      this.getAddressById(id)
    }
  },

  /**
   * 根据id获取收货地址信息
   * @param {number} id - 收货地址id
   */
  async getAddressById(id) {
    const {
      name,
      phone,
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      districtName,
      districtCode,
      address,
      fullAddress,
      isDefault,
    } = await addressApi.getAddressById(id)
    this.setData({
      name,
      phone,
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      districtName,
      districtCode,
      address,
      fullAddress,
      isDefault,
    })
  },

  /**
   * 当用户选择省市区时触发的事件处理器
   * @param {Event} e - 事件对象
   */
  onRegionChange(e) {
    const [provinceName, cityName, districtName] = e.detail.value
    const [provinceCode, cityCode, districtCode] = e.detail.code
    this.setData({
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      districtName,
      districtCode,
    })
  },

  /**
   * 跳转到地图选点插件
   *
   * 获取用户的当前位置坐标，并跳转到腾讯位置服务插件进行地址选择
   */
  async chooseLocation() {
    const { latitude, longitude } = await this.getLocation()
    const referer = 'mushang-flower-boutique'
    const location = JSON.stringify({ latitude, longitude })
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location,
    })
  },
  /**
   * 获取用户位置信息
   *
   * 如果用户没有授权位置信息，则请求授权
   *
   * @returns {Promise<{latitude: number, longitude: number}>} 用户的位置信息
   */
  getLocation() {
    return new Promise(async (resolve, reject) => {
      const { authSetting } = await wx.getSetting()
      const isAuth = authSetting['scope.userLocation'] === undefined || authSetting['scope.userLocation']
      if (!isAuth) {
        const modalRes = await useModal({
          content: '您的位置信息将用于快速填写收货地址，请确认授权',
        })
        if (!modalRes) {
          reject('用户拒绝授权【scope.userLocation】')
          return
        }
        const { authSetting } = await wx.openSetting()
        const isAuth = authSetting['scope.userLocation']
        if (!isAuth) {
          reject('用户拒绝授权【scope.userLocation】')
          return
        }
      }
      try {
        resolve(await wx.getLocation({ type: 'gcj02' }))
      } catch (err) {
        reject(err)
      }
    })
  },

  /**
   * 切换默认地址时触发的事件处理器
   * @param {Event} e - 事件对象
   */
  onSwicthDefaultAddress({ detail: isDefault }) {
    this.setData({ isDefault })
  },

  /**
   * 保存或者更新收货地址信息
   */
  async saveAddress() {
    const { provinceName, cityName, districtName, address, fullAddress } = this.data
    const form = { ...this.data, fullAddress: fullAddress || provinceName + cityName + districtName + address }
    const valid = await this.validateForm(form)
    if (!valid) return
    this.data.id ? await addressApi.updateAddress(form) : await addressApi.addAddress(form)
    useToast({ title: this.data.id ? '更新成功' : '添加成功', duration: 1500 })
    setTimeout(() => wx.navigateBack(), 1500)
  },

  /**
   * 验证表单数据
   * @param {Object} form - 表单数据
   * @returns {Promise<boolean>} - 返回验证结果
   */
  async validateForm(form) {
    // 表单校验规则
    const rules = {
      name: [
        { type: 'string', required: true, message: '联系人不能为空' },
        // 验证收货人姓名，判断是否只包含大小写字母、数字和中文字符
        { type: 'string', required: true, pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, message: '联系人格式错误' },
      ],
      phone: [
        { type: 'string', required: true, message: '手机号不能为空' },
        // 验证手机号，判断是否符合中国大陆手机号码的格式
        {
          type: 'string',
          required: true,
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\d|9\d)\d{8}$/,
          message: '请输入正确的手机号',
        },
      ],
      provinceName: { type: 'string', required: true, message: '所在地区不能为空' },
      address: { type: 'string', required: true, message: '详细地址不能为空' },
    }
    // 传入校验规则创建表单校验器
    const validator = new Schema(rules)
    // 调用校验方法对表单进行校验
    return new Promise((resolve, reject) => {
      validator.validate(form, { first: true }, (errors) => {
        if (errors) {
          useToast({ title: errors[0].message, mask: false })
          reject(errors[0].message)
        }
        resolve(true)
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 获取用户从地图选点插件返回的选择地点信息（点击确认返回选点结果对象，否则返回 null）
    const location = chooseLocation.getLocation()
    // 如果用户选择了地点，则进行逆地址解析，用于快速填写收货地址
    if (location) {
      const { longitude, latitude, name } = location
      qqmapsdk.reverseGeocoder({
        location: { latitude, longitude },
        success: (res) => {
          console.log(res)
          // 关于行政区划代码（adcode）规则说明请参考  https://lbs.qq.com/service/webService/webServiceGuide/search/webServiceDistrict#7
          // 代码共6位，前两位代表省（一级）、中间两位为市/地区（二级），最后两位为区县（三级）
          const { adcode } = res.result.ad_info
          // 省、市、区、街道、门牌号，其中区、街道和门牌号有可能为空字符串
          const { province, city, district, street, street_number } = res.result.address_component
          const { standard_address } = res.result.formatted_addresses
          this.setData({
            provinceName: province,
            // 省级：前两位有值，后4位置0，如，河北省：130000
            provinceCode: adcode.replace(adcode.substring(2, 6), '0000'),
            cityName: city,
            // 市/地区：前4四位有值，包含省代码与市代码，最后两位置0，如河北省保定市：130600
            cityCode: adcode.replace(adcode.substring(4, 6), '00'),
            districtName: district,
            // 区县：6位全有值，包含前4位省市代码及区县代码，河北省保定市涿州市：130681
            // 东莞市、中山市、儋州市、嘉峪关市 因其下无区县级，因此增加了末位为99代码的同名子级，用于补齐到三级区划的结构
            districtCode: district && adcode,
            // 可以根据产品需求进行修改，此处暂时这样
            address: street + street_number + name,
            fullAddress: standard_address + name,
          })
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null)
  },
})
