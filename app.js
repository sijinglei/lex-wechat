// app.js
const QQMapWX = require('./libs/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js')
let qqmapsdk = null
App({
    onLaunch() {
        // 展示本地存储能力
        wx.getSystemInfo({
            success: res => {
                // console.log('设备品牌:', res.brand)
                // console.log('设备型号:', res.model)
                // console.log('设备像素比:', res.pixelRatio)
                // console.log('屏幕宽度:', res.windowWidth)
                // console.log('屏幕高度:', res.windowHeight)
                // console.log('屏幕高度2:', res.screenHeight)
                // console.log('状态栏的高度:', res.statusBarHeight)
                // console.log('微信设置的语言:', res.language)
                // console.log('微信版本号:', res.version)
                // console.log('操作系统及版本:', res.system)
                // console.log('客户端平台:', res.platform)
                // console.log('用户字体大小:', res.fontSizeSetting)
                // console.log('客户端基础库版本 :', res.SDKVersion)
                // console.log('设备性能等级:', res.benchmarkLevel)
                this.globalData.windowHeight = res.windowHeight // 内容高度
                this.globalData.statusBar = res.statusBarHeight // 状态拦高度

                let menu = wx.getMenuButtonBoundingClientRect()
                    //获取胶囊信息
                let navigationBar = (menu.top - res.statusBarHeight) * 2 + menu.height //胶囊高度
                this.globalData.navigationBar = navigationBar
                this.globalData.customBar = res.statusBarHeight + 47 // 状态栏高度 + 导航栏高度
                let locationEnabled = res.locationEnabled //判断手机定位服务是否开启
                let locationAuthorized = res.locationAuthorized //判断定位服务是否允许微信授权
                let that = this
                if (!locationEnabled || !locationAuthorized) {
                    //手机定位服务（GPS）未授权
                    wx.showToast({
                        title: '请打开手机GPS',
                    })
                    return
                } else {
                    qqmapsdk = new QQMapWX({
                            key: that.globalData.mapSDKKey, //腾讯位置服务key
                        })
                        // 获取选择位置的缓存数据
                    let _latitude = wx.getStorageSync('lex_latitude') || ''
                    let _longitude = wx.getStorageSync('lex_longitude') || ''
                    console.log('获取定位', _latitude, _longitude)
                    if (_latitude && _longitude) {
                        that.getAddress({ latitude: _latitude, longitude: _longitude })
                    } else {
                        wx.getLocation({
                            isHighAccuracy: true,
                            type: 'gcj02',
                            success(res) {
                                console.log('获取当前位置', res)
                                const latitude = res.latitude
                                const longitude = res.longitude
                                wx.setStorageSync('lex_latitude', latitude)
                                wx.setStorageSync('lex_longitude', longitude)
                                that.globalData.latitude = latitude
                                that.globalData.longitude = longitude
                                that.getAddress({ latitude, longitude })
                            },
                        })
                    }
                }
            },
        })
    },
    getAddress(location, callback) {
        let that = this
        qqmapsdk.reverseGeocoder({
            location: location,
            coord_type: 1,
            sig: that.globalData.mapSDKKey,
            success(res) {
                if (res.status == 0) {
                    let data = res.result
                    if (callback) {
                        callback(data)
                    } else {
                        that.globalData.currentAddress = data.address_component.district
                    }
                } else {
                    console.log('获取失败')
                }
            },
        })
    },
    globalData: {
        statusBar: 0,
        customBar: 0,
        windowHeight: 0,
        navigationBar: 0,
        userInfo: null,
        currentAddress: '',
        latitude: '',
        longitude: '',
        appId: 'wxe6e66f26705dd745',
        mapSDKKey: 'NCQBZ-GWGRM-D5L6S-6W73R-JOCMV-OTBR7', //地图SDKkey
    },
})