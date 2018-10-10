var base = require('../../../../utils/common/base')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateList: ['全部', '已分配', '未分配'],
    stateIndex: 0,
    advertState: 3, // 0是未通过，1是通过，2是拒绝，3是全部
    advertStyle: 2, // 0是图片，1是视频，2是全部
    pageNo: 1,
    pageSize: 10,
    nameOrMobile: '',
    distributeState: 'O',
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 选择状态
   */
  pickerState: function (e) {
    let distributeState = 0
    if (e.detail.value == 0) {
      distributeState = 'O'
    } else if (e.detail.value == 1) {
      distributeState = 'Y'
    } else {
      distributeState = 'N'
    }
    this.setData({
      distributeState: distributeState,
      stateIndex: e.detail.value
    })
    this.operatorQryList()
  },
  toAddStaff: function (e) {
    wx.navigateTo({
      url: '/pages/agent/staff/editStaff/editStaff'
    })
  },
  editAd(e) {
    wx.navigateTo({
      url: '/pages/agent/staff/editStaff/editStaff?id=' + e.target.dataset.id + '&name=' + e.target.dataset.name + '&mobile=' + e.target.dataset.mobile
    })
  },
  fenpeiAd(e) {
    wx.navigateTo({
      url: '/pages/agent/staff/selectStaff/selectStaff?advertId=' + e.target.dataset.id
    })
  },
  bindName: function (e) {
    this.setData({
      nameOrMobile: e.detail.value
    })
  },
  operatorQryList() {
    let json = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      distributeState: this.data.distributeState,
      nameOrMobile: this.data.nameOrMobile
    }
    base.http_post(json, '/operatorQryList', (res) => {
      if (res.code == 0) {
        if (res.data) {
          this.setData({
            dataList: res.data.resultList,
            isNoData: false
          })
        }
      } else if (res.code == 8) {
        this.setData({
          isNoData: true
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  toAddPage(e) {
    wx.navigateTo({
      url: '/pages/agent/staff/addPaper/addPaper?id=' + e.target.dataset.id
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
    this.operatorQryList()
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