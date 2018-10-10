var base = require('../../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spec_num: 1, //选择规格的数量
    posCode: '',
    canBuzhi: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posCode: options.id,
      canBuzhi: options.num
    })
  },
  buzhi() {
    if (!this.data.spec_num) {
      base.toast('', '请输入补纸数量');
      return
    }
    if (isNaN(this.data.spec_num)) {
      base.toast('', '请输入正确补纸数量');
      return
    }
    if (0 >= parseInt(this.data.spec_num)) {
      base.toast('', '补纸数量大于0');
      return
    }
    if (parseInt(this.data.canBuzhi) < parseInt(this.data.spec_num)) {
      base.toast('', '补纸数量必须小于' + this.data.canBuzhi);
      return
    }
    let json = {
      paperNum: this.data.spec_num,
      posCode: this.data.posCode
    }
    base.http_post(json, '/fillPaperRecord', (res) => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateBack()
      } else {
        base.toast('', res.message);
      }
    })
  },
  bindNum: function (e) {
    this.setData({
      spec_num: e.detail.value
    })
  },
  jia() {
    if (this.data.spec_num == this.data.stockAmount) {
      return;
    }
    this.setData({
      spec_num: this.data.spec_num + 1
    })
  },
  jian() {
    if (this.data.spec_num == 1) {
      return;
    }
    this.setData({
      spec_num: this.data.spec_num - 1
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