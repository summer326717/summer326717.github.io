var base = require('../../../utils/common/base')
const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: '', // 头像
    agentName: '',
    sameDayProfit: 0,
    sameMonthProfit: 0,
    totalProfit: 0,
    pageSize: 10,
    faultPosNum: 0,
    lackPosNum: 0,
    pageNo: 1,
    isShowMenu: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userType = wx.getStorageSync('userType')
    if (userType == 2) {
      this.setData({
        isShowMenu: true
      })
    }
    this.operatorUserHomePage()
  },
  operatorUserHomePage() {
    let json = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    base.http_post(json, '/operatorUserHomePage', (res) => {
      if (res.code == 0) {
        let result = []
        if (this.data.pageNo > 1) {
          result = this.data.dataList
        }
        res.data.data.fillPaperRecordVOS.map((v, i) => {
          if (v.createTime) {
            v.createTime = base.transTime(v.createTime)
          }
        })
        let finalResult = util.concattArr(result, res.data.data.fillPaperRecordVOS)
        this.setData({
          headImg: res.data.data.headImg, // 头像
          sameDayProfit: res.data.data.sameDayFillPaperNum,
          sameMonthProfit: res.data.data.sameMonthFillPaperNum,
          totalProfit: res.data.data.totalFillPaperNum,
          faultPosNum: res.data.data.faultPosNum,
          lackPosNum: res.data.data.lackPosNum,
          dataList: finalResult,
          isNoData: false
        })
        if (res.data.data.fillPaperRecordVOS.length < this.data.pageSize) {
          this.setData({
            isToBottom: true
          })
        }
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  toOperator() {
    wx.navigateBack()
  },
  /***
   * 扫码绑定设备
   */
  scanCodeBindingPos() {
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
                url: '/pages/agent/equipment/updateEquipment/updateEquipment?posCode=' + res.result
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
  saoyisao() {
    this.scanCodeBindingPos()
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
    this.setData({
      pageNo: 1,
      isToBottom: false
    })
    this.operatorUserHomePage();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isToBottom) {
      wx.showNavigationBarLoading();
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      this.operatorUserHomePage();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})