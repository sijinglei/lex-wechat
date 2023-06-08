// pages/work/index.js
const app = getApp();
import utils from "../../utils/util.js";
var QQMapWX = require("../../libs/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js");
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showFilter: false,
    keywords: "", //搜索关键字
    currentId: 1,
    currentAddress: "",
    filters: [
      {
        id: 1,
        text: "推荐",
        api: "/app/job/recommend",
        queryParams: {
          areaId: "",
        },
      },
      {
        id: 2,
        text: "附近",
        api: "/app/job/nearby",
        queryParams: {
          areaId: "",
          latitude: "",
          longitude: "",
        },
      },
      {
        id: 3,
        text: "急招",
        api: "/app/job/urgent",
        queryParams: {
          areaId: "",
        },
      },
    ],
    settlementMethods: [
      {
        name: "日结",
        value: 1,
        checked: false,
      },
      {
        name: "周结",
        value: 2,
        checked: false,
      },
      {
        name: "月结",
        value: 3,
        checked: false,
      },
      {
        name: "完工结",
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
    latitude: "",
    longitude: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        let headerH = wx.getMenuButtonBoundingClientRect();
        that.setData({
          statusBarHeight: res.statusBarHeight, //状态栏高度
          wHeight: res.windowHeight,
          titleBarHeight:
            headerH.bottom + headerH.top - res.statusBarHeight * 2 + 20,
        });
      },
    });
    console.log("app.globalData", app.globalData);
    // 创建动画实例
    that.setData({
      statusBar: app.globalData.statusBar,
      customBar: app.globalData.customBar,
    });
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapSDKKey, //腾讯位置服务key
    });

    const getAddress = (location) => {
      qqmapsdk.reverseGeocoder({
        location: location,
        coord_type: 1,
        sig: app.globalData.mapSDKKey,
        success(res) {
          if (res.status == 0) {
            let data = res.result;
            console.log(data);
            that.setData({
              currentAddress: data.address_component.district,
            });
          } else {
            console.log("获取失败");
          }
        },
      });
    };
    let address = wx.getStorageSync("address");
    if (!address) {
      wx.getLocation({
        type: "wgs84",
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          // const speed = res.speed
          // const accuracy = res.accuracy
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          });
          getAddress({ latitude, longitude });
        },
      });
    }
    // 生生模拟数据
    // let rows = that.initData(20)
    // that.setData({
    //   list: rows,
    // })
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let _animation = wx.createAnimation({
      timingFunction: "ease",
      duration: 120,
    });
    this.setData({
      animation: _animation,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  openFilter() {
    this.data.showFilter = true;
  },
  closeFilter() {
    this.data.showFilter = false;
  },
  checkSettle(item) {
    this.data.settlementMethods.forEach((d) => {
      d.checked = d.value == item.value;
    });
  },
  initData(n) {
    let arr = new Array(n).fill(0).map((d, i) => {
      let min = Math.ceil(1);
      let max = Math.floor(3);
      let type = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        id: i + 1,
        type: type,
        title: `餐厅服务员${type}`,
      };
    });
    return arr;
  },
  tabClick(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    this.setData({
      currentId: id,
      isLeft: id > this.data.currentId,
    });
    this.getList();
  },
  touchStart(e) {
    console.log(e);
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX,
      });
    }
  },

  touchEnd(e) {
    console.log(e);
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      let diff = endX - this.data.startX;
      let ani = this.data.animation;
      console.log("ani", ani);
      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          //左滑
          console.log("1111");
          if (this.data.currentId == 1) {
            this.setData({
              currentId: 3,
            });
          } else {
            this.setData({
              currentId: this.data.currentId--,
            });
          }
          // 动画：右出左进
          ani
            .translateX("100%")
            .step() //先横向向右移至100%，即整块移没
            .opacity(0)
            .step({
              duration: 10,
            }) // 再使题目部分透明
            .translateX("-100%")
            .step({
              duration: 10,
            }) // 然后趁透明横向向左移至-100%
            .translateX(0)
            .opacity(1)
            .step(); //接着横向向右移动至初始位置并恢复透明度
        } else {
          console.log("22222");
          //右滑
          if (this.data.currentId == 3) {
            this.setData({
              currentId: 1,
            });
          } else {
            this.setData({
              currentId: this.data.currentId++,
            });
          }
          // 动画：左出右进
          ani
            .translateX("-100%")
            .step()
            .opacity(0)
            .step({
              duration: 10,
            })
            .translateX("100%")
            .step({
              duration: 10,
            })
            .translateX(0)
            .opacity(1)
            .step();
        }

        this.setData({
          animationData: ani.export(),
        });
        setTimeout(() => {
          this.setData({
            animationData: {},
          });
        }, 250);
        this.getList();
      }
    }
  },
  /**
   * 右移，向左滑动操作
   * */
  move2left() {
    let status = Number(this.data.currentId);
    if (status === 3) {
      //最右，不移动
      return;
    }
    this.getList();
    //....移动成功，执行方法
  },
  /**
   * 左移，向右滑动操作
   * */
  move2right() {
    let status = Number(this.data.currentId);
    if (status === 1) {
      //最左，不移动
      return;
    }
    this.getList();
    //....移动成功，执行方法
  },
  getList() {
    wx.showLoading();
    let obj = this.data.filters.find((d) => d.id == this.data.currentId);
    let queryParams = obj.queryParams;
    let api = obj.api;
    // queryParams.areaId = ""; // 获取当前区域id
    if (this.data.currentId == 2) {
      // 附近特殊处理
      queryParams["latitude"] = this.data.latitude;
      queryParams["longitude"] = this.data.longitude;
    }
    let query = {
      ...queryParams,
      ...this.data.pageParams,
    };
    utils.get(api, query).then((res) => {
      console.log("请求返回数据", res);
    });
    // this.list = this.rowData.filter(d => d.type == this.currentId)
    wx.hideLoading();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("上拉加载更多。。。");
    if (this.data.rowData.length >= this.data.total)
      return wx.showToast("数据加载完毕");
    if (this.data.isloading) return;
    // setTimeout(() => {
    //   this.rowData = [...this.rowData, ...this.initData(10)];
    //   this.getList();
    // }, 1000);
  },
  onPageScroll(e) {
    this.setData({
      isFixed: e.scrollTop >= this.data.customBar,
    });
  },
  toSearch() {
    wx.navigateTo({
      url: "/pages/search/search?type=1",
    });
  },
  toAddress() {
    wx.navigateTo({
      url: "/pages/chooseAddress/chooseAddress?address=" + "南山区",
    });
  },
  clickLogin() {
    let postData = {
      username: "111",
      password: "22222",
    };
    this.login(postData).then((res) => {
      console.log("登录成功", res);
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});