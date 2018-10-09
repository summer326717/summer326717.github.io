const util = require('../../../../utils/util.js')
var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sindex: 0,
    stateList: ['全部', '在线', '离线'],
    dataList: [],
    isNoData: false,
    pageNo: 1,
    pageSize: 10,
    posName: '',
    posCode: '',
    posState: 0,
    eindex: 0,
    EquipmentList: [],
    isToBottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.equipmentCodeAndNameAllByAgent()
  },
  /**
   * 获取设备列表
   */
  getEquimentList: function () {
    let json = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      posCode: this.data.posCode,
      posName: this.data.posName,
      posState: this.data.posState // Y是在线，N是离线，O是全部
    }
    base.http_post(json, '/equipmentListByAgent', (res) => {
      if (res.code == 0) {
        if (res.data) {
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
        } else {
          this.setData({
            isNoData: true
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
   * 选择设备
   */
  pickerEquipment: function (e) {
    console.log(e.detail.value)
    let state = e.detail.value
    if (state == 0) {
      this.setData({
        posState: 'O',
        sindex: 0
      })
    } else if (state == 1) {
      this.setData({
        posState: 'Y',
        sindex: 1
      })
    } else {
      this.setData({
        posState: 'N',
        sindex: 2
      })
    }
    this.getEquimentList()
  },
  equipmentCodeAndNameAllByAgent: function () {
    base.http_post('', '/equipmentCodeAndNameAllByAgent', (res) => {
      if (res.code == 0) {
        if (res.data.length > 0) {
          let EquipmentList = res.data
          EquipmentList.unshift({ posCode: '', posName: '全部设备' })
          this.setData({
            EquipmentList: EquipmentList
          })
        }
      } else {
        base.toast(res.message);
      }
    })
  },
  pickerEquipmentList: function (e) {
    let index = parseInt(e.detail.value)
    this.setData({
      eindex: index,
      posCode: this.data.EquipmentList[index].posCode,
      posName: this.data.EquipmentList[index].posName
    })
    this.getEquimentList()
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
    this.getEquimentList()
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
    this.getEquimentList();
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
      this.getEquimentList();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})