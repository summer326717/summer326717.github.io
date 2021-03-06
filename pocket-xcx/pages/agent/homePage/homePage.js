var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
      {
        menuName: '出纸统计',
        menuImg: 'http://activity.boonmo.com/imgs/index_01.png',
        menuUrl: '/pages/agent/paper/paperStatistics/paperStatistics'
      },
      {
        menuName: '设备管理',
        menuImg: 'http://activity.boonmo.com/imgs/index_02.png',
        menuUrl: '/pages/agent/equipment/equipmentManage/equipmentManage'
      },
      {
        menuName: '缺纸设备',
        menuImg: 'http://activity.boonmo.com/imgs/index_03.png',
        menuUrl: '/pages/agent/equipment/lackPaper/lackPaper'
      },
      {
        menuName: '故障设备',
        menuImg: 'http://activity.boonmo.com/imgs/index_04.png',
        menuUrl: '/pages/agent/equipment/faultyEquipment/faultyEquipment'
      },
      {
        menuName: '广告平台',
        menuImg: 'http://activity.boonmo.com/imgs/index_05.png',
        menuUrl: ''
      },
      {
        menuName: '广告管理',
        menuImg: 'http://activity.boonmo.com/imgs/index_06.png',
        menuUrl: '/pages/agent/ad/adManage/adManage'
      },
      {
        menuName: '运营人员',
        menuImg: 'http://activity.boonmo.com/imgs/index_07.png',
        menuUrl: '/pages/agent/staff/staffManage/staffManage'
      },
      {
        menuName: '吸粉管理',
        menuImg: 'http://activity.boonmo.com/imgs/index_08.png',
        menuUrl: '' // /pages/agent/fan/fanManage/fanManage
      }
    ],
    headImg: '', // 头像
    agentName: '',
    sameDayProfit: 0,
    sameMonthProfit: 0,
    totalProfit: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.agentUserHomePage()
  },
  agentUserHomePage() {
    base.http_post('', '/agentUserHomePage', (res) => {
      if (res.code == 0) {
        if (res.data) {
          this.setData({
            headImg: res.data.headImg, // 头像
            agentName: res.data.agentName,
            sameDayProfit: res.data.sameDayProfit,
            sameMonthProfit: res.data.sameMonthProfit,
            totalProfit: res.data.totalProfit
          })
        }
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  toOperator() {
    wx.navigateTo({
      url: '/pages/operator/operator/operator'
    })
  },
  isToCreate() {
    wx.showToast({
      title: '开发中...',
      icon: 'none'
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