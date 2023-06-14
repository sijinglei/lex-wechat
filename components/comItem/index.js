var app = getApp()
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
            // let { latitude, longitude, address } = this.properties.item
            let latitude1 = wx.getStorageSync('latitude') || ''
            let longitude1 = wx.getStorageSync('longitude') || ''
            this.properties.item.latitude1 = latitude1
            this.properties.item.longitude1 = longitude1
            this.properties.item.latitude = Number(
                this.properties.item.latitude
            ).toFixed(5)
            this.properties.item.longitude = Number(
                this.properties.item.longitude
            ).toFixed(5)
            this.setData({
                detail: this.properties.item,
            })
            console.log('properties.item', this.properties.item)
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toDetail(id) {
            // let latitude1 = wx.getStorageSync('latitude') || ''
            // let longitude1 = wx.getStorageSync('longitude') || ''
            // this.properties.item.latitude1 = latitude1
            // this.properties.item.longitude1 = longitude1
            wx.navigateTo({
                url: '/pages/details/details?item=' + JSON.stringify(this.properties.item),
            })
        },
    },
})