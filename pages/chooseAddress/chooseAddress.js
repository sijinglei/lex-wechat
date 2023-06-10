import utils from '../../utils/util.js'
let scrollDdirection = 0
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedSub: 0, // 选中的分类
    // list: [],
    // listCity: [], // 市
    // listCountry: [], //县
    toView: 'position0', // 滚动视图跳转的位置
    scrollTopLeft: 0, //  左边滚动位置随着右边分类而滚动
    provinces: [], //areaList.province_list,
    citys: [], //areaList.city_list,
    countys: [], // areaList.county_list,
    currentAddress: '',
    scrollHeight: 0,
    type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      scrollHeight: app.globalData.windowHeight,
      currentAddress: options.address || '',
    })
    wx.setNavigationBarTitle({
      title: '位置选择',
    })
    if (options.type && options.type == 2) {
      this.data.type = options.type
    }
    this.getData()
  },
  async getData() {
    let resProvinces = await utils.get('/app/province/getProvinces')
    console.log('resProvinces', resProvinces)
    let data = resProvinces.items
    this.setData({
      provinces: resProvinces.items,
    })
    this.getCitys(data[0].id)
  },
  /**
   * 跳转滚动条位置
   */
  toScrollView(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.getCitys(id)
    let _left = 0
    if (index > 3) {
      _left = (index - 3) * 50 // 左边侧栏item高度为50，可以根据自己的item高度设置
    }
    this.setData({
      selectedSub: index,
      scrollTopLeft: _left,
    })
  },
  async getCitys(id) {
    let resCitys = await utils.get('/app/city/getCitys', {
      provinceId: id,
    })
    let data = resCitys.items
    let promises = []
    data.forEach(item => {
      promises.push(
        utils.get('/app/area/getAreas', {
          cityId: item.id,
        })
      )
    })
    Promise.all(promises).then(res => {
      console.log('ressssss=', res)
      let newData = data.map((d, idx) => {
        d.areas = res[idx].items
        return d
      })
      this.setData({
        citys: newData,
      })
      setTimeout(() => {
        this.setData({
          toView: 'position0',
        })
      }, 100)
    })
  },
  itemHandleClick(e) {
    let { name, id } = e.currentTarget.dataset
    if (this.data.type == 2) {
      wx.setStorageSync('ZP_AREA', name)
    } else {
      wx.setStorageSync('address', name)
    }
    this.setData({
      currentAddress: name,
    })
    wx.navigateBack()
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
