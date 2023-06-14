// components/noData/noData.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: '暂无数据',
        },
        url: {
            type: String,
            value: '',
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
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
        toPublish(e) {
            if (!this.isLogin()) {
                return
            }
            wx.navigateTo({
                url: this.properties.url,
            })
        },
    },
})