const util = require('../../utils/util')
import Toast from '@vant/weapp/toast/toast'
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
            area: '', // 招聘区域
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
    onShow() {
        let area = wx.getStorageSync('ZP_AREA') || ''
        let areaName = wx.getStorageSync('ZP_AREA_NAME') || ''
        if (area) {
            this.setData({
                'formData.area': area,
                areaName: areaName,
            })
        }
    },
    onChange({ detail }) {
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
    showErrMsg(msg) {
        Toast({ message: msg, selector: '#msg-toast' })
        return
    },
    formSubmit(e) {
        console.log('form', e)
        console.log('formData', this.data.formData)
        let formData = this.data.formData
        let values = e.detail.value
        let d = Object.assign(formData, values)

        if (d.title == '') {
            this.showErrMsg('标题不能为空')
            return
        }
        if (d.age == '') {
            this.showErrMsg('年龄不能为空')
            return
        }
        if (d.content == '') {
            this.showErrMsg('工作内容不能为空')
            return
        }
        if (d.jobTime == '') {
            this.showErrMsg('工作时间不能为空')
            return
        }
        if (d.mobile == '') {
            this.showErrMsg('手机号不能为空')
            return
        }
        if (!/^1[3456789]\d{9}$/.test(d.mobile)) {
            this.showErrMsg('手机号码格式错误')
            return
        }
        if (d.address == '') {
            this.showErrMsg('详细地址不能为空')
            return
        }
        if (d.salary == '') {
            this.showErrMsg('薪酬说明不能为空')
            return
        }
        if (d.welfare == '') {
            this.showErrMsg('福利说明不能为空')
            return
        }
        if (d.latitude == '') {
            this.showErrMsg('工作地点不能为空')
            return
        }
        if (d.area == '') {
            this.showErrMsg('招聘区域不能为空')
            return
        }
        console.log('dddd=', d)
        util.post('/app/job', d).then(res => {
            console.log('')
            Toast.success('发布成功')
            wx.redirectTo({
                url: '/pages/success/success',
            })
        })
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
            success: function(res) {
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
            url: '/pages/chooseAddress/chooseAddress?type=2&address=' +
                this.data.formData.area,
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