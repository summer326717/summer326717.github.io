var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    advertStyle: 1,
    advertInfoDetail: {},
    isHasVideo: false,
    advertId: '',
    additionalUrl: '',
    advertSize: 2,
    isHasVideo: false,
    isTotalPing: false,
    isNotTotalPing: false,
    videoContext: '',
    playVideo: false,
    imgSrcTop: ''
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
    if (!this.data.advertName) {
      if (!this.data.advertHold) {
        base.toast('warn', '请输入广告名称');
        return
      }
    }
    if (!this.data.imgSrc) {
      base.toast('warn', '请上传图片');
      return
    }
    /*if (!this.data.advertHold) {
      base.toast('warn', '请输入停留时间');
      return
    }*/
    let json = {
      advertCost: 0,
      advertHold: 0,
      advertName: this.data.advertName,
      advertSize: this.data.advertSize,
      advertStyle: 1, // 0是图片，1是视频 
      advertType: 1,
      advertUrl: this.data.imgSrc,
      additionalUrl: this.data.additionalUrl
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
        let isNotTotalPing = ''
        let isTotalPing = ''
        let isHasImg = false
        let imgSrcTop = ''
        if (res.data.advertSize == 0) {
          isTotalPing = true
        } else {
          isNotTotalPing = true
          imgSrcTop = res.data.advertUrl
          if (res.data.additionalUrl) {
            isHasImg = true
          }
        }
        this.setData({
          advertInfoDetail: res.data,
          advertHold: res.data.advertHold,
          imgSrc: res.data.advertUrl,
          advertName: res.data.advertName,
          additionalUrl: res.data.additionalUrl,
          advertSize: res.data.advertSize,
          isTotalPing: isTotalPing,
          isNotTotalPing: isNotTotalPing,
          imgSrcTop: imgSrcTop,
          isHasVideo: true,
          isHasImg: isHasImg
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
    let additionalUrl = ''
    if (!this.data.advertName) {
      base.toast('warn', '请填写广告名称');
      return
    }
    if (this.data.advertSize == 2) {
      base.toast('warn', '请选择广告大小');
      return
    }
    if (this.data.advertSize == 0) {
      if (!this.data.imgSrc) {
        base.toast('warn', '请上传视频');
        return
      }
    }
    if (this.data.advertSize == 1) {
      if (!this.data.imgSrc) {
        base.toast('warn', '请上传上屏视频');
        return
      }
      if (!this.data.additionalUrl) {
        base.toast('warn', '请上传下屏图片');
        return
      }
      additionalUrl = this.data.additionalUrl
    }
    let json = {
      advertCost: 0,
      advertSize: this.data.advertSize,
      advertType: 1,
      advertStyle: 1,
      advertHold: null,
      advertId: this.data.advertId,
      advertName: this.data.advertName,
      advertUrl: this.data.imgSrc,
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
  bindAdvertSize: function (e) {
    this.setData({
      advertSize: e.detail.value
    })
  },
  uploadVideo: function () {
    base.uploadVideo('advertVideoUploadSave', res => {
      if (res.errMsg.indexOf('ok') > 1) {
        let data = JSON.parse(res.data)
        if (data.code == 0) {
          if (this.data.advertSize == 1) {
            this.setData({
              imgSrcTop: data.data,
              isHasVideo: true
            })
          } else {
            this.setData({
              imgSrc: data.data,
              isHasVideo: true
            })
          }
        } else {
          base.toast('warn', data.message);
        }
      } else {
        base.toast('warn', res.errMsg);
      }
    })
  },
  uploadImg: function () {
    base.uploadImg('advertImgUploadSave', '3', res => {
      if (res.errMsg.indexOf('ok') > 1) {
        let data = JSON.parse(res.data)
        if (data.code == 0) {
          this.setData({
            additionalUrl: data.data,
            isHasImg: true
          })
        } else {
          base.toast('warn', data.message);
        }
      } else {
        base.toast('warn', res.errMsg);
      }
    })
  },
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  },
  previewImage: function () {
    wx.previewImage({
      urls: [this.data.BottomimgSrc],
      current: '',
      success: () => {
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('prew_video');
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