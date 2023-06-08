// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    wx.getSystemInfo({
      success: res => {
        console.log('设备品牌:', res.brand)
        console.log('设备型号:', res.model)
        console.log('设备像素比:', res.pixelRatio)
        console.log('屏幕宽度:', res.windowWidth)
        console.log('屏幕高度:', res.windowHeight)
        console.log('屏幕高度2:', res.screenHeight)
        console.log('状态栏的高度:', res.statusBarHeight)
        console.log('微信设置的语言:', res.language)
        console.log('微信版本号:', res.version)
        console.log('操作系统及版本:', res.system)
        console.log('客户端平台:', res.platform)
        console.log('用户字体大小:', res.fontSizeSetting)
        console.log('客户端基础库版本 :', res.SDKVersion)
        console.log('设备性能等级:', res.benchmarkLevel)
        this.globalData.statusBar = res.statusBarHeight // 状态拦高度
        this.globalData.customBar = res.statusBarHeight + 45 // 状态栏高度 + 导航栏高度
        let locationEnabled = res.locationEnabled //判断手机定位服务是否开启
        let locationAuthorized = res.locationAuthorized //判断定位服务是否允许微信授权
        if (!locationEnabled || !locationAuthorized) {
          //手机定位服务（GPS）未授权
          wx.showToast({
            title: '请打开手机GPS',
          })
          return
        }
      },
    })
    // 登录
    // wx.login({
    //   success: (res) => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // });
  },
  globalData: {
    statusBar: 0,
    customBar: 0,
    userInfo: null,
    mapSDKKey: 'NCQBZ-GWGRM-D5L6S-6W73R-JOCMV-OTBR7', //地图SDKkey
  },
})