const util = require('../../utils/util')
import Toast from '@vant/weapp/toast/toast'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      mobile: '',
      password: '',
    },
    showPassword: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
  showToast(msg) {
    Toast({ message: msg, selector: '#msg-toast' })
    return
  },
  validData() {
    let formData = this.data.formData
    if (formData.mobile == '') {
      this.showToast('手机号码不能为空')
      return false
    }
    if (!/^1[3456789]\d{9}$/.test(formData.mobile)) {
      this.showToast('手机号码格式错误')
      return false
    }
    if (formData.password == '') {
      this.showToast('密码不能为空')
      return false
    }
    return true
  },
  login(e) {
    if (!this.validData(e.detail.value)) return
  },
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
  register() {
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },
})
