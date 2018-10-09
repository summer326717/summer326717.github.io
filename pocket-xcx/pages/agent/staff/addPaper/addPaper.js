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
      selectMonth: currentMonth
    })
    this.getData()
    this.getEquimentList()
  },
  getData: function () {
    let json = {
      "pageNo": this.data.pageNo,
      "pageSize": this.data.pageSize,
      "yearMonth": this.data.selectMonth
    }
    base.http_post(json, '/operatorFillPaperCount', (res) => {
      if (res.code == 0) {
        if (this.data.pageNo == 1) {
          this.setData({
            isNoData: false,
            dataList: res.data.resultList,
            isNoData: false
          })
        } else {
          let result = base.concattArr(this.data.dataList, res.data.resultList);
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
   * 选择设备
   */
  pickerEquipment: function (e) {
    console.log(e)
    let index = parseInt(e.detail.value)
    this.setData({
      eindex: index,
      posCode: this.data.EquipmentList[index].posCode
    })
    this.getData()
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