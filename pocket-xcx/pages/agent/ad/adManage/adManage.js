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
    dataList: [],
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.dataList.forEach(function (v, i) {
    if (v.isTouchMove)//只操作为true的
      v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      dataList: this.data.dataList
    })
    },
    //滑动事件处理
    touchmove: function (e) {
    
    var that = this,
    
    index = e.currentTarget.dataset.index,//当前索引
    
    startX = that.data.startX,//开始X坐标
    
    startY = that.data.startY,//开始Y坐标
    
    touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
    
    touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
    
    //获取滑动角度
    
    angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    
    that.data.dataList.forEach(function (v, i) {
    
    v.isTouchMove = false
    
    //滑动超过30度角 return
    
    if (Math.abs(angle) > 30) return;
    
    if (i == index) {
    
    if (touchMoveX > startX) //右滑
    
    v.isTouchMove = false
    
    else //左滑
    
    v.isTouchMove = true
    
    }
    
    })
    //更新数据
    that.setData({
      dataList: that.data.dataList
    })
    },
    
    /**
    
    * 计算滑动角度
    
    * @param {Object} start 起点坐标
    
    * @param {Object} end 终点坐标
    
    */
    
    angle: function (start, end) {
    
    var _X = end.X - start.X,
    
    _Y = end.Y - start.Y
    
    //返回角度 /Math.atan()返回数字的反正切值
    
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    
    },
    
    //删除事件
    
    del: function (e) {
      this.data.dataList.splice(e.currentTarget.dataset.index, 1)
      this.setData({
        dataList: this.data.dataList
      })
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
        res.data.resultList.map((v,i)=>{
          v.isTouchMove = false
        })
        let finalResult = util.concattArr(result, res.data.resultList)
        this.setData({
          dataList: finalResult,
          isNoData: false
        })
        if (res.data.resultList.length < this.data.pageSize) {
          this.setData({
            isToBottom: true
          })
        } else {
          this.setData({
            isToBottom: false
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