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
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        toDetail(id) {
            let latitude1 = wx.getStorageSync('latitude') || ''
            let longitude1 = wx.getStorageSync('longitude') || ''
            this.properties.item.latitude1 = latitude1
            this.properties.item.longitude1 = longitude1
            wx.navigateTo({
                url: '/pages/details/details?item=' + JSON.stringify(this.properties.item),
            })
        },
    },
})