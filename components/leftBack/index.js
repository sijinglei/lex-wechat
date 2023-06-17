// components/leftBack/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        top: 0,
        statusBarHeight: 0,
    },
    ready: function() {
        this.setData({
            top: app.globalData.statusBar +
                (app.globalData.navigationBar - 30) / 2 +
                'px',
            statusBarHeight: app.globalData.statusBar + 2,
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        goBack() {
            wx.navigateBack(-1)
        },
        goHome() {
            wx.switchTab({
                url: '/pages/work/index',
            })
        },
    },
})