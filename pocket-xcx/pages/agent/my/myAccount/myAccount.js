var base = require('../../../../utils/common/base')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    pageSize: 10,
    isShouru: true,
    dataList: [],
    isToBottom: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.accountInComeFlowingWater()
  },
  /**
   * 收入
   */
  accountInComeFlowingWater() {
    let json = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    base.http_post(json, '/accountInComeFlowingWater', (res) => {
      if (res.code == 0) {
        let result = []
        if (this.data.pageNo > 1) {
          result = this.data.dataList
        }
        let finalResult = util.concattArr(result, res.data.resultList)
        this.setData({
          dataList: finalResult,
          isNoData: false
        })
        if (res.data.resultList.length < this.data.pageSize) {
          this.setData({
            isToBottom: true
          })
        }
      } else if (res.code == 8) {
        this.setData({
          isNoData: true
        })
      } else {
        base.toast(res.message);
      }
    })
  },
  zhichuClick() {
    this.setData({
      isShouru: false
    })
    this.accountWithdrawFlowingWater()
  },
  shouruClick() {
    this.setData({
      isShouru: true
    })
    this.accountInComeFlowingWater()
  },
  /**
   * 支出
   */
  accountWithdrawFlowingWater() {
    let json = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    base.http_post(json, '/accountWithdrawFlowingWater', (res) => {
      if (res.code == 0) {
        this.setData({
          dataList: res.data.resultList,
          isNoData: false
        })
      } else if (res.code == 8) {
        this.setData({
          isNoData: true
        })
      } else {
        base.toast(res.message);
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
    this.setData({
      pageNo: 1,
      isToBottom: false
    })
    this.accountInComeFlowingWater();
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
      this.accountInComeFlowingWater();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})