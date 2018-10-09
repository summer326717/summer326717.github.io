var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobileNo: '',
    operatorName: '',
    operatorCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!!options.mobile && !!options.name && !!options.id) {
      this.setData({
        mobileNo: options.mobile,
        operatorName: options.name,
        operatorCode: options.id
      })
    }
  },
  operatorInfoEditOrSave() {
    if (!this.data.operatorName) {
      base.toast('warn', '请输入姓名');
      return
    }
    if (!this.data.mobileNo) {
      base.toast('warn', '请输入手机号码');
      return
    }
    let json = {
      operatorCode: this.data.operatorCode,
      mobileNo: this.data.mobileNo,
      operatorName: this.data.operatorName
    }
    base.http_post(json, '/operatorInfoEditOrSave', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateBack()
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  bindMobileNo: function (e) {
    this.setData({
      mobileNo: e.detail.value
    })
  },
  bindOperatorName: function (e) {
    this.setData({
      operatorName: e.detail.value
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