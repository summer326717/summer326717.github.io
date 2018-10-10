var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertStyle: 1,
    typeList: ['图片', '视频'],
    advertName: '',
    advertHold: '',
    playVideo: false,
    videoContext: '',
    imgSrc: []
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
  pickerType: function (e) {
    this.setData({
      advertStyle: parseInt(e.detail.value),
      imgSrc: []
    })
  },
  uploadImg: function (e) {
    if (this.data.advertStyle == 0) {//图片
      base.uploadImg('advertImgUploadSave', res => {
        if (res.errMsg.indexOf('ok') > 1) {
          let data = JSON.parse(res.data)
          if (data.code == 0) {
            let imgSrc = this.data.imgSrc
            imgSrc.push(data.data)
            this.setData({
              imgSrc: imgSrc
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
              imgSrc: [data.data]
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
    let advertHold = 0
    if (!this.data.advertName) {
      base.toast('warn', '请输入广告名称');
      return
    }
    if (this.data.advertStyle == 0) {
      if (!this.data.advertHold) {
        base.toast('warn', '请输入停留时间');
        return
      }
      advertHold = this.data.advertHold
    }
    if (this.data.imgSrc.length == 0) {
      if (this.data.advertStyle == 1) {
        base.toast('warn', '请上传视频');
        return
      } else {
        base.toast('warn', '请上传图片');
        return
      }
    }
    let json = {
      advertCost: 0,
      advertHold: advertHold,
      advertName: this.data.advertName,
      advertSize: 0,//全屏
      advertStyle: this.data.advertStyle, // 0是图片，1是视频 
      advertType: 1,//代理人
      advertUrl: this.data.imgSrc,
      additionalUrl: ''
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
          advertInfoDetail: res.data,
          advertHold: res.data.advertHold,
          imgSrc: res.data.advertUrl,
          advertName: res.data.advertName,
          additionalUrl: res.data.additionalUrl,
          advertSize: res.data.advertSize
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
    let advertHold = ''
    if (!this.data.advertName) {
      base.toast('warn', '请填写广告名称');
      return
    }
    if (this.data.advertStyle == 0) {
      if (!this.data.advertHold) {
        base.toast('warn', '请输入停留时间');
        return
      }
      advertHold = this.data.advertHold
    }
    if (this.data.imgSrc.length == 0) {
      if (this.data.advertStyle == 1) {
        base.toast('warn', '请上传上屏视频');
        return
      } else {
        base.toast('warn', '请上传图片');
        return
      }
    }
    let json = {
      advertCost: 0,
      advertSize: 0,//全屏
      advertType: 1,//代理人
      advertStyle: this.data.advertStyle,//0图片1视频
      advertHold: advertHold,
      advertId: this.data.advertId,
      advertName: this.data.advertName,
      advertUrl: this.data.imgSrc,
      additionalUrl: ''
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
      urls: this.data.imgSrc,
      current: this.data.imgSrc[e.currentTarget.dataset.index],
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
    let imgSrc = this.data.imgSrc
    imgSrc.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      imgSrc: imgSrc
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