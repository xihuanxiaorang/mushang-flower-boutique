import * as orderApi from '../../../api/order'
import { formatTime } from '../../../utils/formatTime'
import { debounce } from 'miniprogram-licia'
import Schema from 'async-validator'
import { useToast } from '@/utils/extendApi'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 收货地址
     */
    address: null,
    /**
     * 订单
     */
    order: null,
    /**
     * 订购人姓名
     */
    name: '',
    /**
     * 订购人手机号
     */
    phone: '',
    /**
     * 期望送达日期
     */
    deliveryDate: '',
    /**
     * 祝福语
     */
    blessing: '',
    /**
     * 用于控制底部日期选择器弹框显隐
     */
    show: false,
    /**
     * 可选的最小时间
     */
    minDate: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { goodsId, blessing } = options
    this.goodsId = goodsId
    this.setData({ blessing })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAddress()
    this.getOrder()
  },

  /**
   * 获取收货地址
   *
   * 首先判断全局变量中是否存在收货地址（该地址是在点击更换时到收货地址列表页面重新选择的），如果存在的话，则使用该地址，否则的话，就发起请求获取订单收货地址
   */
  async getAddress() {
    let address = app.globalData.address
    if (address) {
      this.setData({ address: address })
      app.globalData.address = null
      return
    }
    if (this.data.address) return
    address = await orderApi.getAddress()
    this.setData({ address })
  },

  /**
   * 获取订单详情
   */
  async getOrder() {
    if (this.data.order) return
    const goodsId = this.goodsId
    const order = goodsId ? await orderApi.buyNow({ goodsId, blessing: this.data.blessing }) : await orderApi.getOrder()
    const goods = order.cartVoList.find((item) => item.blessing)
    this.setData({ order, blessing: (goods && goods.blessing) || '' })
  },

  /**
   * 显示日期选择器弹框
   */
  showDatetimePickerPopup() {
    this.setData({ show: true })
  },

  /**
   * 关闭日期选择器弹框
   */
  closeDatetimePickerPopup() {
    this.setData({ show: false })
  },

  /**
   * 确认送达日期
   * @param {Event} e 事件对象
   */
  comfirmDeliveryDate(e) {
    const deliveryDate = formatTime(new Date(e.detail))
    this.setData({ deliveryDate, show: false })
  },

  /**
   * 提交订单（防抖处理）
   */
  submitOrder: debounce(async function () {
    const { address, order, name, phone, deliveryDate, blessing } = this.data
    const params = {
      buyName: name,
      buyPhone: phone,
      cartList: order.cartVoList,
      deliveryDate,
      remarks: blessing,
      userAddressId: address.id,
    }
    const valid = await this.validateForm(params)
    if (!valid) return
  }, 500),

  /**
   * 验证表单数据
   * @param {Object} form - 表单数据
   * @returns {Promise<boolean>} - 返回验证结果
   */
  async validateForm(form) {
    // 表单校验规则
    const rules = {
      buyName: [
        { type: 'string', required: true, message: '订购人姓名不能为空' },
        // 验证订购人姓名，判断是否只包含大小写字母、数字和中文字符
        { type: 'string', required: true, pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, message: '订购人姓名格式错误' },
      ],
      buyPhone: [
        { type: 'string', required: true, message: '订购人手机号不能为空' },
        // 验证手机号，判断是否符合中国大陆手机号码的格式
        {
          type: 'string',
          required: true,
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\d|9\d)\d{8}$/,
          message: '请输入正确的手机号',
        },
      ],
      deliveryDate: { type: 'string', required: true, message: '请选择期望送达日期' },
      userAddressId: { type: 'number', required: true, message: '请选择收货地址' },
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
})
