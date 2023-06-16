// pages/imglist/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgs: [{
                src: 'https://gd-hbimg.huaban.com/1d0ea2bebe4ce6c6645366d327b636605012edbc34685-4mxagw_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/37454c36e53499f27654e4ea079f72c6320533c82a9e7-7tKAqj_fw658webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/13c824dcad228c564e6987ac4df54932ca14802121498-CRAaTo_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/991515e2619fae2f97a6959265c82d69605db89016d83-GfWt8w_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/428cdfd17cd65c23bd2cd6fec2dda91a07743edc14e1c-XYfSF0_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/c8aea27d6865bbc8d9cb11f5ca13da53cc5bdb6314b8f-N2vGn4_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/be34af4deb25b4b6198923bb6c46a492f56969a935cf0-xRaOj0_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/e5c52605850edb6a163690620482bdb07b71ab262101a-pYfins_fw240webp',
            },
            {
                src: 'https://gd-hbimg.huaban.com/e085c4e7700fca47c47b531610460f98bcf76fd023e9f-LzUeis_fw240webp',
            },
        ],
    },
    viewLarge(e) {
        wx.navigateTo({
            url: '/pages/imgview/index?imgsrc=' + e.currentTarget.dataset.imgurl,
        })
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
})