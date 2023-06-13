const util = require('../../utils/util')
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        formData: {
            mobile: '',
            password: '',
        },
        showPassword: true,
        isDd: false,
    },
    onChangeArgeen({ detail }) {
        this.setData({
            checked: detail,
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
    showToast(msg) {
        Toast({ message: msg, selector: '#msg-toast' })
        return
    },
    /**
     * 用户授权
     * @param {*} e
     */
    author(e) {
        if (!this.data.checked) {
            this.setData({
                isDd: true,
            })
            setTimeout(() => {
                this.setData({
                    isDd: false,
                })
            }, 2000)
            return
        }
        if (e.detail.errMsg === 'getPhoneNumber:ok') {
            console.log('允许', e)
            this.login(e)
        }
    },
    /**
     * 用户登录 -获取手机号码登陆
     */
    login(e) {
        let that = this // 微信获取登录code
        wx.login({
            success(res1) {
                if (res1.code) {
                    wx.setStorageSync('code', res1.code) // 后台获取用户openid
                    let openid = app.globalData.appId
                    wx.setStorageSync('openid', openid)
                        // wx.setStorageSync('session_key', res2.data.session_key) // 后台小程序自动登录
                    util
                        .post('/app/member/loginByCode', { code: res1.code })
                        .then(res2 => {
                            console.log('res2', res2)
                        })
                        // app.api.user
                        //   .autologin({ openid: res2.data.openid, code: res1.code })
                        //   .then(res3 => {
                        //     if (res3.code === 2000) {
                        //       // 至此登录完成
                        //       wx.setStorageSync('access_token', res3.data.access_token) // 查询用户是否绑定过手机号
                        //       app.api.user.info().then(res4 => {
                        //         if (res4.code === 2000) {
                        //           if (res4.data.bind === 2) {
                        //             app.toast('登录成功', 'none')
                        //             that.goBack()
                        //           } else {
                        //             // 未绑定手机号，去绑定
                        //             that.getPhoneNumber(e)
                        //           }
                        //         } else {
                        //           app.toast(res4.msg, 'none')
                        //         }
                        //       })
                        //     } else {
                        //       app.toast(res3.msg, 'none')
                        //     }
                        //   })
                } else {
                    app.toast('登录失败！' + res1.errMsg)
                }
            },
        })
    },
    loginPhone(e) {
        wx.navigateTo({
            url: '/pages/phoneLogin/phoneLogin',
        })
    },
    loginCode() {
        var that = this
        wx.login({
            success: function(res) {
                //请求自己后台获取用户openid
                console.log(res.code)
                let wxCode = res.code
                util
                    .post('/app/member/loginByCode', {
                        code: wxCode,
                    })
                    .then(res => {
                        console.log('登陆成功', res)
                    })
                    // wx.request({
                    //     url: '开发者后台接口',
                    //     data: {
                    //         appid: '自己的微信公众号获取',
                    //         secret: '自己的微信公众号获取',
                    //         code: res.code,
                    //     },
                    //     success: function(response) {
                    //         var openid = response.data.openid
                    //         console.log('请求获取openid:' + openid) //可以把openid存到本地，方便以后调用
                    //         wx.setStorageSync('openid', openid)
                    //         that.setData({
                    //             openid: '获取到的openid：' + openid,
                    //         })
                    //     },
                    // })
            },
        })
    },
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