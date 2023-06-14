const app = getApp()
import utils from '../../utils/util.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        keywords: '', //搜索关键字
        list: [],
        isFixed: false,
        menuWidth: 0,
        statusBar: 0,
        currentAddress: app.globalData.currentAddress || '',
        pageParams: {
            page: 1,
            pageSize: 30,
        },
        loadding: false,
        areaId: '1755',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const custom = wx.getMenuButtonBoundingClientRect()
        this.setData({
            menuWidth: custom.width + 10,
            statusBar: app.globalData.statusBar,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('show work')
        let that = this
            // 延期获取一下
        setTimeout(() => {
            console.log('currentAddress', that.data.currentAddress, app)
            const adrr = app.globalData.currentAddress
            that.setData({
                currentAddress: adrr,
            })
            console.log('currentAddress', adrr)
        }, 1000)
        let areaId = wx.getStorageSync('VIEW_AREAID') || ''
        if (areaId) {
            this.setData({
                areaId: areaId,
            })
        }
        that.getList()
    },
    getList(isMore = false) {
        wx.showLoading()
        this.setData({
            loadding: true,
        })
        let query = {
            ...this.data.pageParams,
            areaId: '1755',
        }
        utils
            .get('/app/convenientService/recommend', query)
            .then(res => {
                let rows = res.items
                if (isMore) {
                    rows = [...res.items, ...this.data.list]
                } else {
                    rows = res.items
                }
                this.setData({
                    loadding: false,
                    list: rows,
                })
                wx.hideLoading()
            })
            .catch(err => {
                wx.hideLoading()
            })
            // this.list = this.rowData.filter(d => d.type == this.currentId)
    },
    toSearch() {
        wx.navigateTo({
            url: '/pages/search/search?type=2',
        })
    },
    onPageScroll(e) {
        this.setData({
            isFixed: e.scrollTop >= this.data.statusBar,
        })
    },
    clickLogin() {
        let postData = {
            username: '111',
            password: '22222',
        }
        this.login(postData).then(res => {
            console.log('登录成功', res)
        })
    },
    toAddress() {
        wx.navigateTo({
            url: '/pages/chooseAddress/chooseAddress?type=1',
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log('上拉加载更多。。。')
        if (this.data.list.length >= this.data.total)
            return wx.showToast('数据加载完毕')
        if (this.data.isloading) return
        setTimeout(() => {
            this.setData({
                'pageParams.page': this.data.pageParams.page++,
            })
            this.getList(true)
        }, 1000)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
})