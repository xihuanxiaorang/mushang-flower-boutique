/**
 * 显示一个提示框（Toast），用于短暂地向用户展示信息。
 *
 * @param {Partial<WechatMiniprogram.ShowToastOption>} [option={}] - 提示框的配置选项。
 * @description
 * 该函数接受一个可选的对象参数 `option`，该对象包含 `wx.showToast` 的配置选项。
 * 如果提供了 `option` 对象，它将覆盖默认配置。
 * 默认情况下，提示框的标题为 "数据加载中..."，图标为 "none"，显示时长为 2000 毫秒，并且显示遮罩。
 *
 * 可配置的选项包括：
 * - `title` (string): 提示文字，默认为 "数据加载中..."。
 * - `icon` (string): 图标类型，默认为 "none"。可选值为 "success"、 "error"、"loading" 或 "none"。
 * - `duration` (number): 提示框显示的时间长度，默认为 2000 毫秒。
 * - `mask` (boolean): 是否显示透明蒙层，默认为 true。
 */
export const useToast = (option = {}) => {
  wx.showToast({
    title: '数据加载中...',
    icon: 'none',
    duration: 2000,
    mask: true,
    ...option,
  })
}

/**
 * 将自定义的 useToast 方法挂载到全局 wx 对象上，以便在整个应用中更方便地调用。
 */
export const setupToast = () => {
  wx.toast = useToast
}

/**
 * 显示一个模态对话框，并返回一个 Promise，等待用户确认或取消。
 *
 * @param {Partial<WechatMiniprogram.ShowModalOption>} [option={}] - 模态对话框的配置选项。
 * @description
 * 该函数接受一个可选的对象参数 `option`，该对象包含 `wx.showModal` 的配置选项。
 * 如果提供了 `option` 对象，它将覆盖默认配置。
 * 默认情况下，模态对话框的标题为 "提示"，内容为 "您确定执行该操作吗?"，
 * 确认按钮颜色为 "#f3514f"，并且显示取消按钮。
 *
 * 可配置的选项包括：
 * - `title` (string): 对话框标题，默认为 "提示"。
 * - `content` (string): 对话框内容，默认为 "您确定执行该操作吗?"。
 * - `confirmColor` (string): 确定按钮的颜色，默认为 "#f3514f"。
 * - `showCancel` (boolean): 是否显示取消按钮，默认为 true。
 * - `success` (Function): 成功回调函数。
 * - `fail` (Function): 失败回调函数。
 *
 * @returns {Promise<boolean>} - 返回一个 Promise，当用户点击确定时解析为 true，点击取消时解析为 false。
 */
export const useModal = (option = {}) => {
  return new Promise((resolve, reject) => {
    try {
      wx.showModal({
        title: '提示',
        content: '您确定执行该操作吗?',
        confirmColor: '#f3514f',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            resolve(true)
          } else if (cancel) {
            resolve(false)
          }
        },
        fail: (err) => {
          reject(err)
        },
        ...option,
      })
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 将自定义的 useModal 方法挂载到全局 wx 对象上，以便在整个应用中更方便地调用。
 */
export const setupModal = () => {
  wx.modal = useModal
}
