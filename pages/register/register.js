const util = require('../../utils/util')
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowYan: true,
    countTime: 60,
    inviterCode: '', //邀请码
    mobile: '',
    password: '',
    validateCode: '',
    name: '',
    code: '',
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
  showToast(msg) {
    Toast({ message: msg, selector: '#msg-toast' })
    return
  },
  validData() {
    if (this.data.mobile == '') {
      this.showToast('手机号码不能为空')
      return false
    }

    if (!/^1[3456789]\d{9}$/.test(this.data.mobile)) {
      this.showToast('手机号码格式错误')
      return false
    }
    return true
  },
  getSmsCode(e) {
    if (!this.validData()) return
    this.smsCode({
      mobile: this.data.mobile,
    })
      .then(res => {
        console.log('验证码', res)
        this.startCountdown()
        this.isShowYan = false
      })
      .catch(err => {})
  },
  startCountdown() {
    let time = 59
    let timer = setInterval(() => {
      this.countTime = time--
      if (time == 0) {
        clearInterval(timer)
        this.isShowYan = true
      }
    }, 1000)
  },
  register() {
    if (!this.validData()) return
    if (this.data.name == '') {
      this.showToast('用户名不能为空')
      return false
    }
    if (this.data.password == '' || this.data.password2 == '') {
      this.showToast('密码不能为空')
      return false
    }
    if (this.data.password != this.data.password2) {
      this.showToast('两次密码不一致，请重新输入')
      return false
    }
    if (this.data.validateCode == '') {
      this.showToast('手机验证码不能为空')
      return false
    }
    // #ifdef MP-WEIXIN
    let res = uni.login({
      provider: 'weixin',
    })
    this.data.code = res.code

    this.$store.dispatch('user/register', this.form).then(res => {
      console.log('注册返回', res)
      if (res.code == 0) {
        uni.switchTab({
          url: '/pages/work/index',
        })
      }
    })
  },
  toLogin() {
    wx.redirectTo({
      url: '/pages/phoneLogin/phoneLogin',
    })
  },
})
