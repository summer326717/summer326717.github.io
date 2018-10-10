var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    faultReaSon: '',
    handleResult: '',
    posCode: '',
    posFaultId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posCode: options.posCode
    })
  },
  bindHandleResult(e) {
    this.setData({
      handleResult: e.detail.value
    })
  },
  equipmentHandleFault: function () {
    if (!this.data.handleResult) {
      base.toast('warn', '请输入处理结果');
      return
    }
    let json = {
      faultReaSon: this.data.faultReaSon,
      handleResult: this.data.handleResult,
      posCode: this.data.posCode,
      posFaultId: parseInt(this.data.posFaultId)
    }
    base.http_post(json, '/equipmentHandleFault', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.na
      } else {
        base.toast('warn', res.message);
      }
    })
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

  }
})