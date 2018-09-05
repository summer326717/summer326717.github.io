// pages/agent/ad/adManage/adManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateList: ['全部', '通过', '待审核'],
    typeList: ['全部' ,'视频', '图片'],
    stateIndex: 0,
    typeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 选择状态
   */
  pickerState: function (e) {
    this.setData({
      stateIndex: e.detail.value
    })
  },
  /**
   * 选择类型
   */
  pickerType: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  }
})