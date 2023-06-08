Component({
    /**
     * 组件的属性列表
     */
    properties: {
        size: {
            type: String, // large / default /small
            value: 'default',
        },
        signalStrength: {
            type: Number,
        }, // 信号值 0~100, 信号等级：4个 (0~24, 25~49, 50~74, 75~100)
    },

    /**
     * 组件的初始数据
     */
    data: {
        containerStyle: '',
        sizeStyle: '',
        sizeStyle1: '',
        sizeStyle2: '',
        sizeStyle3: '',
        sizeStyle4: '',
    },
    ready() {
        this.initStyle()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        initStyle() {
            let sizeVal = 0 // 组件尺寸(宽,高)
            let b = 0 // 信号值厚度
            let w = 0 // 信号值之间间隔距离
            let cw = 0 // 容器宽度
            let ch = 0 // 容器高度
            if (this.properties.size == 'large') {
                sizeVal = 70
                b = 4
                w = 5
                cw = 52
                ch = 40
            }
            if (this.properties.size == 'default') {
                sizeVal = 50
                b = 3
                w = 4
                cw = 40
                ch = 30
            }
            if (this.properties.size == 'small') {
                sizeVal = 48
                b = 3
                w = 4
                cw = 36
                ch = 28
            }

            let strStyle = `width: ${cw}rpx; height: ${ch}rpx; overflow: hidden;` // border: solid 1px #ff0000;
            let str = `width:${sizeVal + 4}rpx; height:${sizeVal + 4}rpx;`
            let str1 = `padding:${w}rpx;width:${sizeVal}rpx; height:${sizeVal}rpx;`
            let str2 = `padding:${w}rpx; border:solid ${b}rpx #fff;`
            let str3 = `padding:${w}rpx; border:solid ${b}rpx #fff;`
            let str4 = `padding:${w}rpx; border:solid ${b}rpx #fff;`
            this.setData({
                containerStyle: strStyle,
                sizeStyle: str,
                sizeStyle1: str1,
                sizeStyle2: str2,
                sizeStyle3: str3,
                sizeStyle4: str4,
            })
        },
    },
})