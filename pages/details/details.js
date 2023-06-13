// pages/details/details.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        item: null,
        address: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let detail = JSON.parse(options.item) || null
        this.setData({
            item: detail,
        })
        if (detail) {
            let { latitude, longitude, address } = detail
            app.getAddress({ latitude, longitude }, data => {
                console.log('根据经纬度获取位置', data)
                let { city, district, street } = data.address_component
                let _address = `${city}·${district}·${street} | ${address}`
                this.setData({
                    address: _address,
                })
            })
        }
    },
    mapView() {
        let { latitude, longitude, address } = this.data.item
        wx.openLocation({
            latitude: Math.floor(latitude),
            longitude: Math.floor(longitude),
            scale: 18,
            name: address,
        })
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