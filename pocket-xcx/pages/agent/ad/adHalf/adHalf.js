var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['图片', '视频'],
    advertName: '',
    advertHold: '',
    playVideo: false,
    videoContext: '',
    advertUrls: [],
    additionalUrls: []
  },
  bindAdvertName: function (e) {
    this.setData({
      advertName: e.detail.value
    })
  },
  bindAdvertHold: function (e) {
    this.setData({
      advertHold: parseInt(e.detail.value)
    })
  },
  uploadImg: function (e) {
    if (e.currentTarget.dataset.type == 1) {//图片
      base.uploadImg('advertImgUploadSave', res => {
        if (res.errMsg.indexOf('ok') > 1) {
          let data = JSON.parse(res.data)
          if (data.code == 0) {
            let additionalUrls = this.data.additionalUrls
            additionalUrls.push(data.data)
            this.setData({
              additionalUrls: additionalUrls
            })
          } else {
            base.toast('warn', data.message);
          }
        } else {
          base.toast('warn', res.errMsg);
        }
      })
    } else {
      //视频
      base.uploadVideo('advertVideoUploadSave', res => {
        if (res.errMsg.indexOf('ok') > 1) {
          let data = JSON.parse(res.data)
          if (data.code == 0) {
            this.setData({
              advertUrls: [data.data]
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
  submit() {
    if (this.data.advertId) {
      this.updateAdvertInfo()
    } else {
      this.saveAdvertInfo()
    }
  },
  /**
   * 添加广告
   */
  saveAdvertInfo: function () {
    if (!this.data.advertName) {
      base.toast('warn', '请输入广告名称');
      return
    }
    if (this.data.advertUrls.length == 0) {
      base.toast('warn', '请上传视频');
      return
    }
    if (!this.data.advertHold) {
      base.toast('warn', '请输入停留时间');
      return
    }
    let json = {
      advertCost: 0,
      advertHold: this.data.advertHold,
      advertName: this.data.advertName,
      advertSize: 1,//分屏
      advertStyle: 1, // 0是图片，1是视频 
      advertType: 1,//代理人
      advertUrls: this.data.advertUrls,
      additionalUrls: this.data.additionalUrls
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
  queryAdvertInfoDetail: function (advertId) {
    let json = {
      advertId: advertId
    }
    base.http_post(json, '/queryAdvertInfoDetail', (res) => {
      if (res.code == 0) {
        this.setData({
          advertHold: res.data.advertHold,
          advertUrls: res.data.advertUrls,
          advertName: res.data.advertName,
          additionalUrls: res.data.additionalUrls?res.data.additionalUrls:[]
        })
        console.log(this)
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
    if (!this.data.advertHold) {
      base.toast('warn', '请输入停留时间');
      return
    }
    if (this.data.advertUrls.length == 0) {
      base.toast('warn', '请上传视频');
      return
    }
    let json = {
      advertCost: 0,
      advertSize: 1,//分屏
      advertType: 1,//代理人
      advertStyle: 1,//0图片1视频
      advertHold: this.data.advertHold,
      advertId: this.data.advertId,
      advertName: this.data.advertName,
      advertUrls: this.data.advertUrls,
      additionalUrls: this.data.additionalUrls
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
  previewImage(e) {
    wx.previewImage({
      urls: this.data.additionalUrls,
      current: this.data.additionalUrls[e.currentTarget.dataset.index],
      success: () => {
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
  bindplay() {
    //触发播放时全屏播放
    this.videoContext.requestFullScreen()
  },
  bindended() {
    //结束时退出全屏
    this.videoContext.exitFullScreen()
  },
  deleteImg(e) {
    let additionalUrls = this.data.additionalUrls
    additionalUrls.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      additionalUrls: additionalUrls
    })
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