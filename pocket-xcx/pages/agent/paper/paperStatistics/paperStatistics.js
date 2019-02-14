const util = require('../../../../utils/util.js')
var base = require('../../../../utils/common/base')
var wxCharts = require('../../../../utils/common/wxcharts-min.js')
var lineChart = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonth: '', // 默认年月
    selectMonth: '', // 选择的年月
    monthTotal: 0, // 本月累计数
    EquipmentList: [], // 设备列表
    eindex: 0,
    pageNo: 1,
    posCode: '',
    pageSize: 10,
    dataList: [],
    isNoData: false,
    isToBottom: false,
    loadTime: 1,
    chartData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentMonth = util.formatMonth(new Date())
    this.setData({
      currentMonth: currentMonth,
      selectMonth: currentMonth
    })
    this.getData(() => {
      /**
       * 折线图显示
       */
      if (this.data.chartData.categories) {
        this.createWxCharts()
      }
    })
    this.getEquimentList()
  },
  createWxCharts () {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: this.data.chartData.categories, // 横坐标数据
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '出纸数',
        data: this.data.chartData.data, // 纵坐标数据
        format: function (val, name) {
          return val + '包';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '出纸数 (包)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 180,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  getData: function (complete) {
    let json = {
      "pageNo": this.data.pageNo,
      "pageSize": this.data.pageSize,
      "posCode": this.data.posCode,
      "yearMonth": this.data.selectMonth
    }
    base.http_post(json, '/outPaperCountList', (res) => {
      if (res.code == 0) {
        let result = []
        if (this.data.pageNo > 1) {
          result = this.data.dataList
        }
        let finalResult = util.concattArr(result, res.data.resultList)
        let data = []
        let categories = []
        finalResult.map((v, i) => {
          data.push(v.countTotal)
          categories.push(v.monthDay)
        })
        this.setData({
          dataList: finalResult,
          monthTotal: res.data.fillPaperNum,
          isNoData: false,
          chartData: {
            data: data,
            categories: categories
          }
        })
        if (this.data.loadTime != 1) {
          this.updateData()
        } else {
          this.createWxCharts()
        }
        this.setData({
          loadTime: this.data.loadTime + 1
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
        base.toast(res.message);
      }
      complete(true)
    })
  },
  getEquimentList: function () {
    base.http_post('', '/equipmentCodeAndNameAllByAgent', (res) => {
      if (res.code == 0) {
        if (res.data.length > 0) {
          let EquipmentList = res.data
          EquipmentList.unshift({ posCode: '', posName: '全部设备' })
          this.setData({
            EquipmentList: EquipmentList,
          })
        }
      } else {
        base.toast(res.message);
      }
    })
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  updateData: function () {
    var series = [{
      name: '出纸数（包）',
      data: this.data.chartData.data,
      format: function (val, name) {
        return val + '包';
      }
    }];
    lineChart.updateData({
      categories: this.data.chartData.categories,
      series: series
    });
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
    this.setData({
      pageNo: 1,
      isToBottom: false
    })
    this.getData(() => { });
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
      this.getData(() => { });
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 选择设备
   */
  pickerEquipment: function (e) {
    console.log(e)
    let index = parseInt(e.detail.value)
    this.setData({
      eindex: index,
      posCode: this.data.EquipmentList[index].posCode
    })
    this.getData(() => { })
  },

  /**
   * 选择年月
   */
  pickerMonth: function (e) {
    console.log(e)
    this.setData({
      selectMonth: e.detail.value
    })
    this.getData(() => { })
  }
})