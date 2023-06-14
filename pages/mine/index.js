// pages/mine/index.js
import Dialog from '@vant/weapp/dialog/dialog'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        wxuserInfo: null,
        statusBarHeight: 0,
        titleBarHeight: 44,
        wHeight: '',
        keywords: '', //搜索关键字
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
                    titleBarHeight: headerH.bottom + headerH.top - res.statusBarHeight * 2 + 20,
                })
            },
        })
        let user = JSON.parse(wx.getStorageSync('user') || null)
        if (user) {
            user.mobile =
                user.mobile.substring(0, 4) + '****' + user.mobile.substring(7, 11)
        }
        this.setData({
            wxuserInfo: user,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    logout() {
        Dialog.confirm({
                title: '提醒',
                message: '是否确认退出登陆？',
            })
            .then(() => {
                wx.clearStorageSync()
                wx.switchTab({
                    url: '/pages/work/index',
                })
            })
            .catch(() => {
                // on cancel
            })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
})