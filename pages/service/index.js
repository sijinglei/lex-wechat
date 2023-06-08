// pages/service/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keywords: "", //搜索关键字
    list: [],
    isFixed: false,
    menuWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      list: this.initData(20),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  initData(n) {
    let arr = new Array(n).fill(0).map((d, i) => {
      let min = Math.ceil(1);
      let max = Math.floor(3);
      let type = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        id: i + 1,
        type: type,
        title: `餐厅服务员${type}`,
      };
    });
    return arr;
  },
  toSearch() {
    wx.navigateTo({
      url: "/pages/search/search?type=2",
    });
  },
  onPageScroll(e) {
    this.isFixed = e.scrollTop >= this.statusBar;
  },
  clickLogin() {
    let postData = {
      username: "111",
      password: "22222",
    };
    this.login(postData).then((res) => {
      console.log("登录成功", res);
    });
  },

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
});
