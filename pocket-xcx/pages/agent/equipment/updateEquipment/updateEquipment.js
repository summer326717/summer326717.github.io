const util = require('../../../../utils/util.js')
var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capacity: 0,
    operatorQryList: [{ operatorName: '请选择' }],
    eindex: 0,
    operatorName: '',
    equipmentDetail: '',
    pageSize: 10,
    pageNo: 1,
    distributeState: 'O',
    nameOrMobile: '',
    //region: ['请选择'],
    customItem: '请选择',
    cityCode: '',
    areaCode: '',
    areaName: '',
    cityName: '',
    detailAddress: '',
    operateManId: '',//运营人员id
    operateManName: '',
    posCode: '',
    posName: '',
    latitude: 0,
    longitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.posCode) {
      this.operatorQryList(options.posCode)
    } else {
      this.operatorQryList('tianjia')
    }
  },
  /*bindRegionChange: function (e) {
    if (e.detail.code.length != 3) {
      return
    }
    this.setData({
      region: e.detail.value,
      areaCode: e.detail.code[2],
      cityCode: e.detail.code[1],
      areaName: e.detail.value[2],
      cityName: e.detail.value[1],
      provinceCode: e.detail.code[0],
      provinceName: e.detail.value[0]
    })
  },*/
  getData: function (posCode) {
    let json = {
      posCode: posCode
    }
    base.http_post(json, '/equipmentDetail', (res) => {
      if (res.code == 0) {
        let eindex = 0
        this.data.operatorQryList.map((v, i) => {
          if (v.operatorCode == res.data.operateManId) {
            eindex = i
          }
        })
        this.setData({
          volume: res.data.volume,
          posCode: res.data.posCode,
          operatorName: res.data.operateManName,
          operatorCode: res.data.operateManId,
          posName: res.data.posName ? res.data.posName : '',
          areaCode: res.data.areaCode,
          areaName: res.data.areaName ? res.data.areaName : '',
          cityCode: res.data.cityCode,
          cityName: res.data.cityName ? res.data.cityName : '',
          provinceCode: res.data.provinceCode,
          provinceName: res.data.provinceName ? res.data.provinceName : '',
          eindex: eindex,
          detailAddress: res.data.detailAddress,
          capacity: res.data.capacity
        })
        /*if (!!this.data.provinceName && !!this.data.cityName && !!this.data.areaName) {
          this.setData({
            region: [this.data.provinceName, this.data.cityName, this.data.areaName]
          })
        }*/
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  equipmentInfoEdit: function () {
    if (!this.data.posName) {
      base.toast('warn', '请输入设备名称');
      return
    }
    if (!this.data.areaName || !this.data.cityName || !this.data.provinceName) {
      base.toast('warn', '请选择省市区');
      return
    }
    if (!this.data.detailAddress) {
      base.toast('warn', '请输入详细地址');
      return
    }
    if (!this.data.capacity) {
      base.toast('warn', '请输入最大纸量');
      return
    }
    if (!this.data.operatorName || !this.data.operatorCode) {
      base.toast('warn', '请选择运营人员');
      return
    }
    let json = {
      "areaCode": this.data.areaCode,
      "areaName": this.data.areaName,
      "capacity": this.data.capacity,
      "cityCode": this.data.cityCode,
      "cityName": this.data.cityName,
      "detailAddress": this.data.detailAddress,
      "latitude": this.data.latitude,
      "longitude": this.data.longitude,
      "operateManId": this.data.operatorCode,//运营人员id
      "operateManName": this.data.operatorName,
      "posCode": this.data.posCode,
      "posName": this.data.posName,
      "provinceCode": this.data.provinceCode,
      "provinceName": this.data.provinceName,
      "volume": this.data.volume
    }
    base.http_post(json, '/equipmentInfoEdit', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateBack()
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  operatorQryList: function (type) {
    base.http_post('', '/operatorNameAndCodeQryList', (res) => {
      if (res.code == 0) {
        if (type != 'tianjia') {
          res.data.unshift({ operatorName: '请选择' })
        } else {
          res.data
        }
        this.setData({
          operatorQryList: res.data
        })
        if (type != 'tianjia') {
          this.getData(type)
        }
      }
    })
  },
  pickerList: function (e) {
    let index = parseInt(e.detail.value)
    this.setData({
      eindex: index,
      operatorName: this.data.operatorQryList[index].operatorName,
      operatorCode: this.data.operatorQryList[index].operatorCode
    })
  },
  openMap: function () {
    wx.chooseLocation({
      success: res => {
        console.log(res)
      }
    })
  },
  bindSbmc: function (e) {
    this.setData({
      posName: e.detail.value
    })
  },
  bindXxdz: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },
  bindZdzl: function (e) {
    this.setData({
      capacity: e.detail.value
    })
  },
  bindSbyl: function (e) {
    this.setData({
      volume: e.detail.value
    })
  },
  openLocation: function () {
    if (this.data.posCode) {
      wx.getLocation({
        success: (res) => {
          console.log(res)
          if (res.errMsg.indexOf('ok') > 1) {
            wx.chooseLocation({
              success: (cres) => {
                console.log(cres)
                if (res.errMsg.indexOf('ok') > 1) {
                  if (cres.address) {
                    let txt = cres.address.split('省')
                    let provinceName = txt[0]
                    txt = txt[1].split('市')
                    let cityName = txt[0]
                    txt = txt[1].split('区')
                    let areaName = txt[0]
                    let detailAddress = txt[1]
                    this.setData({
                      latitude: cres.latitude,
                      longitude: cres.longitude,
                      detailAddress: detailAddress,
                      provinceName: provinceName + '省',
                      cityName: cityName + '市',
                      areaName: areaName + '区',
                      provinceCode: '',
                      cityCode: '',
                      areaCode: '',
                      //region: [provinceName + '省', cityName + '市', areaName + '区']
                    })
                  } else {
                    base.toast('warn', '您没有选择地址');
                  }
                }
              }
            })
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
            content: '您未授权获取地址'
          })
        }
      })
    } else {
      wx.openLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        success: (res) => {
          if (res.errMsg.indexOf('ok') > 1) {
            wx.chooseLocation({
              success: (cres) => {
                if (res.errMsg.indexOf('ok') > 1) {
                  debugger
                }
              },
              fail: () => {
                debugger
              }
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
    }
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