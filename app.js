// app.js
const QQMapWX = require('../libs/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js')
const qqmapsdk = null
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
        this.globalData.customBar = res.statusBarHeight + 45 // 状态栏高度 + 导航栏高度

        //获取胶囊信息
        let menu = wx.getMenuButtonBoundingClientRect()
        this.globalData.navigationBar =
          (menu.top - res.statusBarHeight) * 2 + menu.height //胶囊高度
        let locationEnabled = res.locationEnabled //判断手机定位服务是否开启
        let locationAuthorized = res.locationAuthorized //判断定位服务是否允许微信授权
        if (!locationEnabled || !locationAuthorized) {
          //手机定位服务（GPS）未授权
          wx.showToast({
            title: '请打开手机GPS',
          })
          return
        } else {
          qqmapsdk = new QQMapWX({
            key: this.globalData.mapSDKKey, //腾讯位置服务key
          })
          const getAddress = location => {
            qqmapsdk.reverseGeocoder({
              location: location,
              coord_type: 1,
              sig: this.globalData.mapSDKKey,
              success(res) {
                if (res.status == 0) {
                  let data = res.result
                  wx.setStorageSync(
                    'address',
                    data.address_component.districtta
                  )
                } else {
                  console.log('获取失败')
                }
              },
            })
          }
          let address = wx.getStorageSync('address') || ''
          if (address) {
            this.globalData.currentAddress = address
          } else {
            wx.getLocation({
              type: 'wgs84',
              success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                this.globalData.latitude = res.latitude
                this.globalData.longitude = res.longitude
                getAddress({ latitude, longitude })
              },
            })
          }
        }
      },
    })
  },

  globalData: {
    appId: 'wxe6e66f26705dd745',
    statusBar: 0,
    customBar: 0,
    windowHeight: 0,
    navigationBar: 0,
    userInfo: null,
    mapSDKKey: 'NCQBZ-GWGRM-D5L6S-6W73R-JOCMV-OTBR7', //地图SDKkey
  },
})
