const util = require('../../../../utils/util.js')
var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonth: '', // 默认年月
    selectMonth: '', // 选择的年月
    monthTotal: 0, // 本月累计数
    EquipmentList: [], // 设备列表
    eindex: 0,
    pageNo: 1,
    pageSize: 10,
    dataList: [],
    isNoData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentMonth = util.formatMonth(new Date())
    this.setData({
      currentMonth: currentMonth,
      selectMonth: currentMonth,
      operatorCode: options.id
    })
    this.getData()
  },
  getData: function () {
    let json = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      yearMonth: this.data.selectMonth,
      operatorCode: this.data.operatorCode
    }
    base.http_post(json, '/operatorFillPaperCount', (res) => {
      if (res.code == 0) {
        let result = []
        if (this.data.pageNo > 1) {
          result = this.data.dataList
        }
        let finalResult = util.concattArr(result, res.data)
        this.setData({
          dataList: finalResult,
          isNoData: false
        })
        if (res.data.length < this.data.pageSize) {
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
    this.getData();
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
      this.getData();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 选择年月
   */
  pickerMonth: function (e) {
    console.log(e)
    this.setData({
      selectMonth: e.detail.value
    })
    this.getData()
  }
})