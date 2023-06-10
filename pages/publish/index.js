// pages/publish/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

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
  isLogin() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showModal({
        title: '未登录提醒',
        content: '您还没有登陆，请先登录，否则无法正常使用',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          return false
        },
      })
      return false
    }
    return true
  },
  doRelease(e) {
    if (!this.isLogin()) {
      return
    }
    let type = e.currentTarget.dataset.type
    let url = '/pages/release/release'
    if (type == 2) {
      url = '/pages/releaseService/releaseService'
    }
    wx.navigateTo({
      url: url,
    })
  },
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
})
