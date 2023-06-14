// index.js
// 获取应用实例
const app = getApp()
import Toast from '@vant/weapp/toast/toast'
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js')
var qqmapsdk
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') &&
            wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        wifiList: [],
        currentAddress: '',
        isIOS: false,
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs',
        })
    },
    onLoad() {
        let that = this
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true,
            })
        }
        wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.userLocation']) {
                        wx.authorize({
                            scope: 'scope.userLocation',
                            success(res) {
                                console.log('授权成功', res)
                            },
                        })
                    }
                },
            })
            // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: app.globalData.mapSDKKey, //腾讯位置服务key
        })

        const getAddress = location => {
            qqmapsdk.reverseGeocoder({
                location: location,
                coord_type: 1,
                sig: app.globalData.mapSDKKey,
                success(res) {
                    if (res.status == 0) {
                        let data = res.result
                        that.setData({
                            currentAddress: data.address_component.city +
                                data.formatted_addresses.recommend,
                        })
                    } else {
                        console.log('获取失败')
                    }
                },
            })
        }
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                getAddress({ latitude, longitude })
                that.getWifis()
            },
        })
    },
    onShow() {
        let that = this
        const platform = wx.getSystemInfoSync().platform
        const isIOS = platform === 'ios'
        this.setData({
            isIOS,
        })
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: res => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                })
            },
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        })
    },
    getWifis() {
        let that = this
        Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true,
        })
        const getWifiList = () => {
            wx.getWifiList({
                success: res => {
                    wx.onGetWifiList(res => {
                        console.log('wifilist===', res.wifiList)
                        const wifiList = res.wifiList
                            .sort((a, b) => b.signalStrength - a.signalStrength)
                            .map(wifi => {
                                const strength = this.data.isIOS ?
                                    Math.ceil(wifi.signalStrength * 4) :
                                    wifi.signalStrength
                                return Object.assign(wifi, { strength })
                            })
                            .filter(d => !!d.SSID)
                        this.setData({
                            wifiList,
                        })
                        Toast.clear()
                    })
                },
                fail(err) {
                    that.showErrMsg(err)
                },
            })
        }
        const startWifi = () => {
            wx.startWifi({
                success: getWifiList,
                fail(err) {
                    console.error(err)
                    that.showErrMsg(err)
                },
            })
        }
        wx.getSystemInfo({
            success(res) {
                const isIOS = res.platform === 'ios'
                if (isIOS) {
                    wx.showModal({
                        title: '提示',
                        content: '由于系统限制，iOS用户请手动进入系统WiFi页面，然后返回小程序。',
                        showCancel: false,
                        success() {
                            startWifi()
                        },
                    })
                    return
                }
                startWifi()
            },
        })
    },
    // 手动连接wifi
    onConnectWifi(e) {
        let that = this
        Toast.loading({
            duration: 0,
            message: '连接中...',
            forbidClick: true,
        })
        let item = e.currentTarget.dataset.item
        wx.connectWifi({
            SSID: item.SSID,
            password: '10242048',
            success(res) {
                Toast.success('连接成功')
                return
            },
            fail(err) {
                that.showErrMsg(err)
                return
            },
        })
    },
    showErrMsg(err) {
        let { errCode } = err
        console.log(err.errMsg)
        let errMsg = ''
        switch (errCode) {
            case 12001:
                errMsg = '当前系统不支持相关能力'
                break
            case 12002:
                errMsg = '密码错误'
                break
            case 12003:
                errMsg = '连接超时，请重试'
                break
            case 12004:
                errMsg = '重复连接 Wi-Fi'
                break
            case 12005:
                errMsg = '未打开Wi-Fi开关'
                break
            case 12006:
                errMsg = '未打开GPS'
                break
            case 12007:
                errMsg = '用户拒绝授权链接 Wi-Fi'
                break
            case 12008:
                errMsg = '无效账号（SSID）'
                break
            case 12009:
                errMsg = '系统运营商配置拒绝连接 Wi-Fi'
                break
            default:
                errMsg = '连接异常'
                break
        }
        Toast.fail(errMsg)
    },
    upper(e) {
        console.log(e)
    },

    lower(e) {
        console.log(e)
    },

    scroll(e) {
        console.log(e)
    },
    scrollToTop() {
        this.setAction({
            scrollTop: 0,
        })
    },
})