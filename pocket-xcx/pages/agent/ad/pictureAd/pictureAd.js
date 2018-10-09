var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    advertStyle: 0,
    advertInfoDetail: {},
    advertSize: 2,
    isTotalPing: false,
    isNotTotalPing: false,
    isHasImg: false,
    TopimgSrc: '',
    BottomimgSrc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.advertId) {
      this.setData({
        advertId: options.advertId
      })
      this.queryAdvertInfoDetail(options.advertId)
    }
  },
  /**
   * 添加广告
   */
  saveAdvertInfo: function () {
    let additionalUrl = ''
    let advertUrl = ''
    if (!this.data.advertName) {
      base.toast('warn', '请填写广告名称');
      return
    }
    if (this.data.advertSize == 2) {
      base.toast('warn', '请选择广告大小');
      return
    }
    if (!this.data.advertHold) {
      base.toast('warn', '请填写广告时间');
      return
    }
    if (this.data.advertSize == 0) {
      //全屏
      if (!this.data.imgSrc) {
        base.toast('warn', '请上传图片');
        return
      }
      advertUrl = this.data.imgSrc
    }
    if (this.data.advertSize == 1) {
      //分屏
      if (!this.data.TopimgSrc) {
        base.toast('warn', '请上传上屏图片');
        return
      }
      advertUrl = this.data.TopimgSrc
      additionalUrl = this.data.BottomimgSrc
    }
    let json = {
      advertCost: 0,
      advertHold: this.data.advertHold,
      advertName: this.data.advertName,
      advertSize: this.data.advertSize,
      advertStyle: this.data.advertStyle, // 0是图片，1是视频
      advertType: 1,
      advertUrl: advertUrl,
      additionalUrl: additionalUrl
    }
    base.http_post(json, '/saveAdvertInfo', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateBack()
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  /**
   * 查询广告
   */
  queryAdvertInfoDetail: function (advertId) {
    let json = {
      advertId: advertId
    }
    base.http_post(json, '/queryAdvertInfoDetail', (res) => {
      if (res.code == 0) {
        let isTotalPing = false
        let isNotTotalPing = false
        let isHasImg = false
        let isHasImgTop = false
        let isHasImgBottom = false
        let imgSrc = ''
        let TopimgSrc = ''
        let BottomimgSrc = ''
        if (res.data.advertSize == 0) {
          isTotalPing = true
          isHasImg = true
          imgSrc = res.data.advertUrl
        } else {
          isNotTotalPing = true
          isHasImgTop = true
          TopimgSrc = res.data.advertUrl
          if (res.data.additionalUrl) {
            isHasImgBottom = true
            BottomimgSrc = res.data.additionalUrl
          }
        }
        this.setData({
          advertInfoDetail: res.data,
          advertHold: res.data.advertHold,
          imgSrc: imgSrc,
          advertName: res.data.advertName,
          advertSize: res.data.advertSize,
          isNotTotalPing: isNotTotalPing,
          isTotalPing: isTotalPing,
          TopimgSrc: TopimgSrc,
          BottomimgSrc: BottomimgSrc,
          isHasImg: isHasImg,
          isHasImgBottom: isHasImgBottom,
          isHasImgTop: isHasImgTop
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  /**
   * 编辑广告
   */
  updateAdvertInfo: function () {
    if (!this.data.advertName) {
      base.toast('warn', '请填写广告名称');
      return
    }
    if (this.data.advertSize == 2) {
      base.toast('warn', '请选择广告大小');
      return
    }
    if (!this.data.advertHold) {
      base.toast('warn', '请填写广告时间');
      return
    }
    let additionalUrl = ''
    let advertUrl = ''
    if (this.data.advertSize == 0) {
      //全屏
      if (!this.data.imgSrc) {
        base.toast('warn', '请上传图片');
        return
      }
      advertUrl = this.data.imgSrc
    }
    if (this.data.advertSize == 1) {
      //分屏
      if (!this.data.TopimgSrc) {
        base.toast('warn', '请上传上屏图片');
        return
      }
      advertUrl = this.data.TopimgSrc
      additionalUrl = this.data.BottomimgSrc
    }
    let json = {
      advertCost: 0,
      advertSize: this.data.advertSize,
      advertType: 1,
      advertStyle: 0,
      advertId: parseInt(this.data.advertId),
      advertName: this.data.advertName,
      advertUrl: advertUrl,
      advertHold: this.data.advertHold,
      additionalUrl: additionalUrl
    }
    base.http_post(json, '/updateAdvertInfo', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateBack()
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  /**
   * 点击提交按钮
   */
  submit: function () {
    if (this.data.advertId) {
      this.updateAdvertInfo()
    } else {
      this.saveAdvertInfo()
    }
  },
  bindAdvertName: function (e) {
    this.setData({
      advertName: e.detail.value
    })
  },
  bindAdvertHold: function (e) {
    this.setData({
      advertHold: e.detail.value
    })
  },
  bindadvertCost: function (e) {
    this.setData({
      advertCost: e.detail.value
    })
  },
  uploadImg: function (e) {
    if (this.data.advertStyle == 0) {
      if (e.target.dataset.type == 0) {//全屏
        base.uploadImg('advertImgUploadSave', '1', res => {
          if (res.errMsg.indexOf('ok') > 1) {
            let data = JSON.parse(res.data)
            if (data.code == 0) {
              this.setData({
                imgSrc: data.data,
                isHasImg: true
              })
            } else {
              base.toast('warn', data.message);
            }
          } else {
            base.toast('warn', res.errMsg);
          }
        })
      }
      if (e.target.dataset.type == 1) {//上半屏
        base.uploadImg('advertImgUploadSave', '2', res => {
          if (res.errMsg.indexOf('ok') > 1) {
            let data = JSON.parse(res.data)
            if (data.code == 0) {
              this.setData({
                TopimgSrc: data.data,
                isHasImgTop: true
              })
            } else {
              base.toast('warn', data.message);
            }
          } else {
            base.toast('warn', res.errMsg);
          }
        })
      }
      if (e.target.dataset.type == 2) {//下半屏
        base.uploadImg('advertImgUploadSave', '3', res => {
          if (res.errMsg.indexOf('ok') > 1) {
            let data = JSON.parse(res.data)
            if (data.code == 0) {
              this.setData({
                BottomimgSrc: data.data,
                isHasImgBottom: true
              })
            } else {
              base.toast('warn', data.message);
            }
          } else {
            base.toast('warn', res.errMsg);
          }
        })
      }
    }
    if (this.data.advertStyle == 1) {
      base.uploadImg('advertVideoUploadSave', res => {
        if (res.errMsg.indexOf('ok') > 1) {
          let data = JSON.parse(res.data)
          if (data.code == 0) {
            this.setData({
              imgSrc: data.data
            })
          } else {
            base.toast('warn', data.message);
          }
        } else {
          base.toast('warn', res.errMsg);
        }
      })
    }
  },
  previewImage: function () {
    wx.previewImage({
      urls: [this.data.imgSrc],
      current: '',
      success: () => {
      }
    })
  },
  previewTopImage: function () {
    wx.previewImage({
      urls: [this.data.TopimgSrc],
      current: '',
      success: () => {
      }
    })
  },
  previewBottomImage: function () {
    wx.previewImage({
      urls: [this.data.BottomimgSrc],
      current: '',
      success: () => {
      }
    })
  },
  bindAdvertSize: function (e) {
    this.setData({
      advertSize: parseInt(e.detail.value)
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