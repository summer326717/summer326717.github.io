var base = require('../../../../utils/common/base')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateList: ['全部', '通过', '待审核'],
    typeList: ['全部', '视频', '图片'],
    selectList: ['图片', '视频'],
    selectIndex: 3,
    stateIndex: 0,
    typeIndex: 0,
    advertState: 3, // 0是未通过，1是通过，2是拒绝，3是全部
    advertStyle: 2, // 0是图片，1是视频，2是全部
    pageNo: 1,
    pageSize: 10,
    isToBottom: false,
    isShowAddMenu: false,
    clientX: '',
    clientY: '',
    delBtnWidth: 60, // 删除按钮宽度
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
    let advertState = 3
    if (e.detail.value == 0) {
      advertState = 3
    } else if (e.detail.value == 1) {
      advertState = 1
    } else {
      advertState = 0
    }
    this.setData({
      advertState: advertState,
      stateIndex: e.detail.value
    })
    this.advertisementQryList()
  },
  /**
   * 选择类型
   */
  pickerType: function (e) {
    let advertStyle = 0
    if (e.detail.value == 0) {
      advertStyle = 2
    } else if (e.detail.value == 1) {
      advertStyle = 1
    } else {
      advertStyle = 0
    }
    this.setData({
      typeIndex: e.detail.value,
      advertStyle: advertStyle
    })
    this.advertisementQryList()
  },
  /*pickerSelect: function (e) {
    if (e.detail.value == 0) {
      wx.navigateTo({
        url: '/pages/agent/ad/pictureAd/pictureAd'
      })
    }
    if (e.detail.value == 1) {
      wx.navigateTo({
        url: '/pages/agent/ad/videoAd/videoAd'
      })
    }
  },*/
  editAd(e) {
    if (e.target.dataset.type == 0) {
      wx.navigateTo({
        url: '/pages/agent/ad/adTotal/adTotal?advertId=' + e.target.dataset.id
      })
    }
    if (e.target.dataset.type == 1) {
      wx.navigateTo({
        url: '/pages/agent/ad/adHalf/adHalf?advertId=' + e.target.dataset.id
      })
    }
  },
  fenpeiAd(e) {
    wx.navigateTo({
      url: '/pages/agent/ad/selectAd/selectAd?advertId=' + e.target.dataset.id
    })
  },
  advertisementQryList: function () {
    let json = {
      advertState: this.data.advertState,
      advertStyle: this.data.advertStyle,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    base.http_post(json, '/advertisementQryList', (res) => {
      if (res.code == 0) {
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
      } else if (res.code == 8) {
        this.setData({
          isNoData: true
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  checkShowAddMenu() {
    this.setData({
      isShowAddMenu: !this.data.isShowAddMenu
    })
  },
  totalPing() {
    //视频
    wx.navigateTo({
      url: '/pages/agent/ad/adTotal/adTotal?advertStyle=1'
    })
  },
  halfPing() {
    wx.navigateTo({
      url: '/pages/agent/ad/adTotal/adTotal?advertStyle=0'
    })
    /*wx.navigateTo({
      url: '/pages/agent/ad/adHalf/adHalf'
    })*/
  },
  deleteTouchStart(e) {
    this.setData({
      clientX: e.changedTouches[0].clientX
    })
  },
  deleteTouchmove(e) {
    let disWidth = this.data.clientX - e.changedTouches[0].clientX
    let delBtnWidth = this.data.delBtnWidth
    if (disWidth > 0) {
      var right = disWidth > delBtnWidth ? 0 : -(60 - disWidth)
    } else {
      var right = -disWidth > delBtnWidth ? -60 : disWidth
    }
    var index = e.currentTarget.dataset.index
    var list = this.data.dataList
    list[index].right = right
    this.setData({
      dataList: list
    })
  },
  deleteTouchEnd(e) {
  },
  removeAd(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除该广告？',
      success: res => {
        if (res.confirm) {
          let json = {
            advertId: e.target.dataset.id
          }
          base.http_post(json, '/delAdvertInfo', (res) => {
            if (res.code == 0) {
              base.toast('succ', res.message)
              this.advertisementQryList()
            } else {
              base.toast('warn', res.message)
            }
          })
        }
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
    this.setData({
      isShowAddMenu: false
    })
    this.advertisementQryList()
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
    this.advertisementQryList();
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
      this.advertisementQryList();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})