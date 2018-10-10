var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posCode: '',
    transferToAccount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posCode: options.posCode
    })
  },
  /**
   * 更新文本框值
   */
  bindKeyInput: function (e) {
    this.setData({
      transferToAccount: e.detail.value
    })
  },
  /**
   * 转让账户
   */
  zrzhMethod: function () {
    if (!this.data.transferToAccount) {
      return
    }
    let json = {
      posCode: this.data.posCode,
      transferToAccount: this.data.transferToAccount
    }
    base.http_post(json, '/equipmentTransfer', (res) => {
      if (res.code == 0) {
        wx.navigateBack({
          delta: 2
        })
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