import Dialog from '@vant/weapp/dialog/dialog'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        wxuserInfo: null,
        mobile2: '',
    },
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
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let user = JSON.parse(wx.getStorageSync('user'))
        if (user && user.mobile) {
            this.setData({
                wxuserInfo: user,
                mobile2: user.mobile.substring(0, 4) + '****' + user.mobile.substring(7, 11),
            })
        }
    },

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
})