// components/comItem.js
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
      wx.navigateTo({
        url: "/pages/details/details?id=" + id,
      });
    },
  },
});
