var base = require('../../../../utils/common/base')
const util = require('../../../../utils/util.js')
var wxcharts = require('../../../../utils/common/wxcharts-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonth: '',
    selectMonth: '',
    EquipmentList: [{ posName: '全部设备', posCode: '' }], // 设备列表
    eindex: 0,
    dataList: [],
    pageNo: 1,
    isNoData: false,
    posCode: '',
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentMonth = options.y.split('-')[0] + '-' + options.id
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
      "posCode": this.data.posCode,
      "yearMonthDay": this.data.currentMonth
    }
    base.http_post(json, '/outPaperCountList', (res) => {
      if (res.code == 0) {
        if (this.data.pageNo == 1) {
          this.setData({
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
  getEquimentList: function () {
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