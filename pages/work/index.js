// pages/work/index.js
const app = getApp()
import utils from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showFilter: false,
    keywords: '', //搜索关键字
    currentId: 1,
    currentAddress: app.globalData.currentAddress || '',
    filters: [
      {
        id: 1,
        text: '推荐',
        api: '/app/job/recommend',
        queryParams: {
          areaId: '',
        },
      },
      {
        id: 2,
        text: '附近',
        api: '/app/job/nearby',
        queryParams: {
          areaId: '',
          latitude: '',
          longitude: '',
        },
      },
      {
        id: 3,
        text: '急招',
        api: '/app/job/urgent',
        queryParams: {
          areaId: '',
        },
      },
    ],
    settlementMethods: [
      {
        name: '日结',
        value: 1,
        checked: false,
      },
      {
        name: '周结',
        value: 2,
        checked: false,
      },
      {
        name: '月结',
        value: 3,
        checked: false,
      },
      {
        name: '完工结',
        value: 4,
        checked: false,
      },
    ],
    pageParams: {
      page: 1,
      pageSize: 30,
    },
    isLeft: true,
    animation: null,
    startX: 0,
    moveFlag: false,
    endX: 0,
    animationData: {},
    list: [],
    rowData: [],
    isloading: false,
    total: 30,
    isFixed: false,
    latitude: '',
    longitude: '',
    loadding: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    let _animation = wx.createAnimation({
      timingFunction: 'ease',
      duration: 120,
    })
    that.setData({
      animation: _animation,
    })

    console.log('app.globalData', app.globalData)
    let headerH = wx.getMenuButtonBoundingClientRect()
    let statusBar = app.globalData.statusBar
    that.setData({
      statusBarHeight: statusBar, //状态栏高度
      wHeight: app.globalData.windowHeight,
      titleBarHeight: headerH.bottom + headerH.top - statusBar * 2 + 20,
    })
    that.setData({
      statusBar: app.globalData.statusBar,
      customBar: app.globalData.customBar,
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
    console.log('app', app)
    // 延期获取一下
    setTimeout(() => {
      that.setData({
        currentAddress: app.globalData.currentAddress,
      })
      // this.getList()
    }, 200)
    // 生生模拟数据
    let rows = that.initData(20)
    setTimeout(() => {
      that.setData({
        list: rows,
        loadding: false,
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  openFilter() {
    this.setData({
      showFilter: true,
    })
  },
  closeFilter() {
    this.setData({
      showFilter: false,
    })
  },
  checkSettle(e) {
    let item = e.currentTarget.dataset.item
    let arr = this.data.settlementMethods
    arr.forEach((d, idx) => {
      d.checked = d.value == item.value
    })
    this.setData({
      settlementMethods: arr,
    })
  },
  initData(n) {
    let arr = new Array(n).fill(0).map((d, i) => {
      let min = Math.ceil(1)
      let max = Math.floor(3)
      let type = Math.floor(Math.random() * (max - min + 1)) + min
      return {
        id: i + 1,
        type: type,
        title: `餐厅服务员${type}`,
      }
    })
    return arr
  },
  tabClick(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    this.setData({
      currentId: id,
      isLeft: id > this.data.currentId,
    })
    this.getList()
  },
  touchStart(e) {
    console.log(e)
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX,
      })
    }
  },
  touchEnd(e) {
    console.log(e)
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX
      let diff = endX - this.data.startX
      let ani = this.data.animation
      console.log('ani', ani)
      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          //左滑
          console.log('1111', this.data.currentId)
          if (this.data.currentId == 1) {
            this.setData({
              currentId: 3,
            })
          } else {
            this.setData({
              currentId: this.data.currentId - 1,
            })
          }
          // 动画：右出左进
          ani
            .translateX('100%')
            .step() //先横向向右移至100%，即整块移没
            .opacity(0)
            .step({
              duration: 10,
            }) // 再使题目部分透明
            .translateX('-100%')
            .step({
              duration: 10,
            }) // 然后趁透明横向向左移至-100%
            .translateX(0)
            .opacity(1)
            .step() //接着横向向右移动至初始位置并恢复透明度
        } else {
          //右滑
          if (this.data.currentId == 3) {
            this.setData({
              currentId: 1,
            })
          } else {
            this.setData({
              currentId: this.data.currentId + 1,
            })
          }
          // 动画：左出右进
          ani
            .translateX('-100%')
            .step()
            .opacity(0)
            .step({
              duration: 10,
            })
            .translateX('100%')
            .step({
              duration: 10,
            })
            .translateX(0)
            .opacity(1)
            .step()
        }

        this.setData({
          animationData: ani.export(),
        })
        setTimeout(() => {
          this.setData({
            animationData: {},
          })
        }, 250)
        this.getList()
      }
    }
  },

  getList() {
    wx.showLoading()
    this.setData({
      loadding: true,
    })
    let obj = this.data.filters.find(d => d.id == this.data.currentId)
    let queryParams = obj.queryParams
    let api = obj.api
    // queryParams.areaId = ""; // 获取当前区域id
    if (this.data.currentId == 2) {
      // 附近特殊处理
      queryParams['latitude'] = this.data.latitude
      queryParams['longitude'] = this.data.longitude
    }
    let query = {
      ...queryParams,
      ...this.data.pageParams,
    }
    utils
      .get(api, query)
      .then(res => {
        console.log('请求返回数据', res)
        this.setData({
          loadding: false,
        })
        wx.hideLoading()
      })
      .catch(err => {
        wx.hideLoading()
      })
    // this.list = this.rowData.filter(d => d.type == this.currentId)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('上拉加载更多。。。')

    if (this.data.rowData.length >= this.data.total)
      return wx.showToast('数据加载完毕')
    if (this.data.isloading) return
    // setTimeout(() => {
    //   this.rowData = [...this.rowData, ...this.initData(10)];
    //   this.getList();
    // }, 1000);
  },
  onPageScroll(e) {
    this.setData({
      isFixed: e.scrollTop >= this.data.customBar,
    })
  },
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search?type=1',
    })
  },
  toAddress() {
    wx.navigateTo({
      url: '/pages/chooseAddress/chooseAddress?address=' + '南山区',
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
})
