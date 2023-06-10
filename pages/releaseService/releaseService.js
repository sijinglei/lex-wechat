const util = require('../../utils/util')

// pages/release/release.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showGw: false,
    currentJobItem: null,
    currentJobName: '',
    formData: {
      id: '',
      urgent: 1,
      type: 1,
      age: '',
      sex: 3,
      quantity: 1,
      settlement: 1,
      title: '',
      content: '',
      jobTime: '',
      salary: '',
      welfare: '',
      mobile: '',
      weixin: '',
      address: '',
      longitude: '', // 经度
      latitude: '', //纬度
    },
    gwList: [],
    currentChooseAddr: '',
    publishingArea: '',
    showSettle: false,
    settlementName: '', //结算方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let type = this.data.formData.settlement
    let name =
      type == 1 ? '月结' : type == 2 ? '周结' : type == 3 ? '日结' : '完工结'
    this.setData({
      settlementName: name,
    })
    this.getGwList() // 获取岗位列表
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  onChange({ detail }) {
    console.log(detail)
    // 需要手动对 checked 状态进行更新
    this.setData({
      'formData.urgent': detail,
    })
  },
  getGwList() {
    util.get('/app/dictionary/queryByType', { type: 'jobType' }).then(res => {
      this.setData({
        gwList: res.items,
      })
    })
  },
  ok(e) {
    let d = e.currentTarget.dataset.item
    this.setData({
      currentJobItem: d,
    })
  },
  openGw() {
    let code = this.data.formData.type ? this.data.formData.type : null
    if (code) {
      let item = this.data.gwList.find(d => d.code == code)
      this.setData({
        currentJobItem: item,
      })
    }
    this.setData({
      showGw: true,
    })
  },
  closeGw() {
    this.setData({
      showGw: false,
    })
  },
  sureGw() {
    this.setData({
      'formData.type': this.data.currentJobItem.code,
      currentJobName: this.data.currentJobItem.value,
      showGw: false,
    })
  },
  onChangeQuantity({ detail }) {
    console.log(detail)
    // 需要手动对 checked 状态进行更新
    this.setData({
      'formData.quantity': detail,
    })
  },
  onChangeSex({ detail }) {
    this.setData({
      'formData.sex': detail,
    })
  },
  onChangeSettlement(e) {
    let { detail } = e
    this.setSettlement(detail)
  },
  onClickSettlement(e) {
    let detail = e.currentTarget.dataset.name
    this.setSettlement(detail)
  },
  setSettlement(detail) {
    let type = detail || 1
    let name =
      type == 1 ? '月结' : type == 2 ? '周结' : type == 3 ? '日结' : '完工结'
    console.log('name', name)
    this.setData({
      'formData.settlement': type,
      settlementName: name,
      showSettle: false,
    })
  },
  formSubmit(e) {
    console.log('form', e)
    console.log('formData', this.data.formData)
  },
  showPopupSettle() {
    this.setData({
      showSettle: true,
    })
  },
  onCloseSettle() {
    this.setData({
      showSettle: false,
    })
  },
  chooseAddr() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log('位置名称：' + res.name)
        console.log('详细地址：' + res.address)
        console.log('纬度：' + res.latitude)
        console.log('经度：' + res.longitude)
        that.setData({
          currentChooseAddr: res.address,
          'formData.longitude': res.longitude,
          'formData.latitude': res.latitude,
          'formData.address': res.name,
        })
      },
    })
  },
  chooseArea() {
    wx.navigateTo({
      url: '/pages/chooseAddress/chooseAddress',
    })
  },
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
