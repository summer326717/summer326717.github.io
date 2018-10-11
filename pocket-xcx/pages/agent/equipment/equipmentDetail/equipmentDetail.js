const util = require('../../../../utils/util.js')
var base = require('../../../../utils/common/base')
var QRCode = require('../../../../utils/common/qrcode.js')
var qrcode = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentDetail: {},
    isShowQRCode: false,
    posCode: '',
    itemList: ['编辑', '解绑', '转让']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let posCode = options.posCode
    this.setData({
      posCode: posCode
    })
    qrcode = new QRCode('canvas', {
      usingIn: this,
      text: "http://weixin.qq.com/r/ailyalvE_gaFrR8J93x4?posCode=" + this.data.equipmentDetail.posCode,
      image: '',
      width: 200,
      height: 200,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  checkShowQRCode() {
    this.setData({
      isShowQRCode: !this.data.isShowQRCode
    })
  },
  saveImg() {
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },
  getData: function (posCode) {
    let json = {
      posCode: posCode
    }
    base.http_post(json, '/equipmentDetail', (res) => {
      if (res.code == 0) {
        res.data.appVersion = res.data.appVersion ? res.data.appVersion : ''
        res.data.lastOnlineTime = res.data.lastOnlineTime ? base.transTime(res.data.lastOnlineTime) : ''
        this.setData({
          equipmentDetail: res.data
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  /**
   * 补纸
   */
  buzhi: function () {
    let buzhinum = this.data.equipmentDetail.capacity - this.data.equipmentDetail.restNum
    wx.navigateTo({
      url: '/pages/agent/equipment/addPaper/addPaper?id=' + this.data.posCode + '&num=' + buzhinum
    })
  },
  /**
   * 测试
   */
  ceshi: function () {
    wx.showModal({
      title: '提示',
      content: '是否确认测试出纸功能？',
      success: res => {
        if (res.confirm) {
          let json = {
            posCode: this.data.posCode
          }
          //发出检测，10秒后查询检测结果
          base.http_post(json, '/spitPaperCheck', (res) => {
            if (res.code == 0) {
              wx.showLoading({
                title: '加载中...',
                mask: true
              })
              setTimeout(() => {
                base.http_post(json, '/spitPaperCheckQryResult', (res) => {
                  if (res.code == 0) {
                    wx.hideLoading()
                    base.toast('succ', res.message);
                  } else {
                    wx.hideLoading()
                    base.toast('warn', res.message);
                  }
                })
              }, 10000);
            } else {
              base.toast('warn', res.message);
            }
          })
        }
      }
    })
  },
  /**
   * 点击维护
   */
  weihu: function () {
    wx.showActionSheet({
      itemList: this.data.itemList,
      success: res => {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/agent/equipment/updateEquipment/updateEquipment?posCode=' + this.data.posCode
          })
        } else if (res.tapIndex === 1) {
          this.jiebang()
        } else {
          wx.navigateTo({
            url: '/pages/agent/equipment/transferEquipment/transferEquipment?posCode=' + this.data.posCode
          })
        }
      }
    })
  },
  /**
   * 解绑
   */
  jiebang: function () {
    wx.showModal({
      title: '提示',
      content: '您确定解绑该机器？',
      success: res => {
        if (res.confirm) {
          let json = {
            posCode: this.data.posCode
          }
          base.http_post(json, '/backUntiePosEquipmentInfo', (res) => {
            if (res.code == 0) {
              base.toast('succ', res.message);
              wx.navigateBack()
            } else {
              base.toast('warn', res.message);
            }
          })
        }
      },
    })
  },
  /**
   * 重启暂不做2018-09-15 18:32
   */
  chongqi: function () {
    let json = {
      posCode: this.data.posCode
    }
    base.http_post(json, '/', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  openLocation: function () {
    wx.openLocation({
      latitude: this.data.equipmentDetail.latitude,
      longitude: this.data.equipmentDetail.longitude,
      name: this.data.equipmentDetail.posName,
      address: this.data.equipmentDetail.provinceName + this.data.equipmentDetail.cityName + this.data.equipmentDetail.areaName + this.data.equipmentDetail.detailAddress,
      success: (res) => {
        if (res.errMsg.indexOf('ok') > 1) {
        } else {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: res.errMsg
          })
        }
      },
      fail: (res) => {
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: res.errMsg
        })
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
    this.getData(this.data.posCode)
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