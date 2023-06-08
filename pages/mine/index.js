// pages/mine/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 0,
    titleBarHeight: 44,
    wHeight: '',
    keywords: '', //搜索关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '我的',
    })
    wx.getSystemInfo({
      success(res) {
        let headerH = wx.getWindowInfo()
        that.setData({
          statusBarHeight: res.statusBarHeight + 44,
          wHeight: res.windowHeight,
          titleBarHeight:
            headerH.bottom + headerH.top - res.statusBarHeight * 2 + 20,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  logout() {
    wx.clearStorageSync()
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
