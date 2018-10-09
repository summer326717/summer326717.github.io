var base = require('../../../../utils/common/base')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    headImg: '',
    mobileNo: '',
    nickName: '',
    unReadMessage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.agentMineInfo()
  },
  agentMineInfo: function () {
    base.http_post('', '/agentMineInfo', (res) => {
      if (res.code == 0) {
        this.setData({
          balance: res.data.balance,
          headImg: res.data.headImg,
          mobileNo: res.data.mobileNo,
          nickName: res.data.nickName,
          unReadMessage: res.data.unReadMessage
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  /**
   * 设备注册
   */
  sbzc() {
    wx.scanCode({
      success: res => {
        if (res.errMsg.indexOf('ok') > 1) {
          let result = res.result.split('=')[1]
          let json = {
            posCode: result
          }
          base.http_post(json, '/scanCodeBindingPos', (resp) => {
            if (resp.code == 0) {
              wx.navigateTo({
                url: '/pages/agent/equipment/updateEquipment/updateEquipment?posCode=' + result
              })
            } else {
              base.toast('warn', resp.message);
            }
          })
        } else {
          base.toast('warn', '请扫描正确的设备二维码');
        }
      }
    })
  },
  /**
   * 账户余额
   */
  zhye() {
    wx.navigateTo({
      url: '/pages/agent/my/myAccount/myAccount'
    })
  },
  toMessagePage() {
    wx.navigateTo({
      url: '/pages/agent/my/myMessage/myMessage'
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