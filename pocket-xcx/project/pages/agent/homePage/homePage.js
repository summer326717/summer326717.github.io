// pages/agent/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
      {
        menuName: '出纸统计',
        menuImg: 'http://localhost/imgs/index_01.png',
        menuUrl: '/pages/agent/paper/paperStatistics/paperStatistics'
      },
      {
        menuName: '设备管理',
        menuImg: 'http://localhost/imgs/index_02.png',
        menuUrl: '/pages/agent/equipment/equipmentManage/equipmentManage'
      },
      {
        menuName: '缺纸设备',
        menuImg: 'http://localhost/imgs/index_03.png',
        menuUrl: '/pages/agent/equipment/lackPaper/lackPaper'
      },
      {
        menuName: '故障设备',
        menuImg: 'http://localhost/imgs/index_04.png',
        menuUrl: '/pages/agent/equipment/faultyEquipment/faultyEquipment'
      },
      {
        menuName: '广告平台',
        menuImg: 'http://localhost/imgs/index_05.png',
        menuUrl: ''
      },
      {
        menuName: '广告管理',
        menuImg: 'http://localhost/imgs/index_06.png',
        menuUrl: '/pages/agent/ad/adManage/adManage'
      },
      {
        menuName: '运营人员',
        menuImg: 'http://localhost/imgs/index_07.png',
        menuUrl: '/pages/agent/staff/staffManage/staffManage'
      },
      {
        menuName: '吸粉管理',
        menuImg: 'http://localhost/imgs/index_08.png',
        menuUrl: ''
      }
    ],
    avatarUrl: '', // 头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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