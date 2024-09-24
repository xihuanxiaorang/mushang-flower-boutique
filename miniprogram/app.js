import { setupModal, setupToast } from '@/utils/extendApi'

App({
  globalData: {
    /**
     * 收货地址
     *
     * 用于订单结算页面更换收货地址时重新选择的地址
     */
    address: null,
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    setupToast()
    setupModal()
  },
})
