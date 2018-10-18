var base = require('../../../../utils/common/base')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    advertId: '',
    pageNo: 1,
    pageSize: 10,
    isNoData: false,
    isSelectAll: false,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      advertId: options.advertId
    })
    this.qryAdvertDistributePosList()
  },
  qryAdvertDistributePosList() {
    let json = {
      operatorCode: this.data.advertId,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    base.http_post(json, '/queryEquipmentDistributeList', (res) => {
      if (res.code == 0) {
        let newArr = []
        res.data.resultList.map((v, i) => {
          if (v.distributeState == 1) {
            newArr.push(v.posCode)
          }
        })
        let totalNum = newArr.length
        this.setData({
          dataList: res.data.resultList,
          totalNum: totalNum,
          isNoData: false
        })
      } else if (res.code == 8) {
        this.setData({
          isNoData: true
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  checkboxChange(e) {
    let dataList = this.data.dataList
    let totalNum = 0
    if (e.detail.value.length > 0) {
      dataList.map((v, i) => {
        v.distributeState = 1
      })
      totalNum = dataList.length
    } else {
      dataList.map((v, i) => {
        v.distributeState = 0
      })
      totalNum = 0
    }
    this.setData({
      dataList: dataList,
      totalNum: totalNum
    })
  },
  toFenpei(e) {
    let dataList = this.data.dataList
    dataList[e.target.dataset.index].distributeState = 1
    this.setData({
      dataList: dataList,
      totalNum: this.data.totalNum + 1
    })
  },
  toNotFenpei(e) {
    this.operatorCancelDistribute(e.target.dataset.id, e.target.dataset.index)
  },
  advertisementDistribute(str) {
    let json = {
      operatorCode: this.data.advertId,
      listStr: str
    }
    base.http_post(json, '/operatorDistribute', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateBack()
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  selectAd() {
    let dataList = this.data.dataList
    let newArr = []
    dataList.map((v, i) => {
      if (v.distributeState == 1) {
        newArr.push(v.posCode)
      }
    })
    //let str = newArr.join(',')
    this.advertisementDistribute(newArr)
  },
  operatorCancelDistribute(posCode, index) {
    let json = {
      operatorCode: this.data.advertId,
      posCode: posCode
    }
    base.http_post(json, '/operatorCancelDistribute', (res) => {
      if (res.code == 0) {
        /*let dataList = this.data.dataList
        dataList[index].distributeState = 0
        this.setData({
          dataList: dataList,
          totalNum: this.data.totalNum - 1
        })*/
        this.qryAdvertDistributePosList()
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