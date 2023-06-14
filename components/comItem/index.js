var app = getApp()
import { getDistance } from '../../utils/getDistance.js'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
        },
        type: {
            type: Number,
            value: 1,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        detail: '',
    },
    lifetimes: {
        attached() {
            let { latitude, longitude } = this.properties.item
            let latitude1 = wx.getStorageSync('lex_latitude') || ''
            let longitude1 = wx.getStorageSync('lex_longitude') || ''
            let _latitude = Number(Number(latitude).toFixed(5))
            let _longitude = Number(Number(longitude).toFixed(5))
            this.properties.item.juli = getDistance(
                latitude1,
                longitude1,
                _latitude,
                _longitude
            )
            this.setData({
                detail: this.properties.item,
            })
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toDetail(id) {
            console.log('跳转详情', this.data.detail)
            wx.navigateTo({
                url: '/pages/details/details?item=' + JSON.stringify(this.data.detail),
            })
        },
    },
})