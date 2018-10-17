const util = require('../../utils/util.js')
var base = require('../../utils/common/base')
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 页面加载时判断有没有用户信息
   * 如果有用户说明已授权获取用户信息，不用显示获取用户信息的按钮
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let mobileNo = wx.getStorageSync('mobileNo')
    let userType = wx.getStorageSync('userType')
    let token = wx.getStorageSync('token')
    if (mobileNo && userType && token) {
      if (userType == 1) {
        wx.reLaunch({
          url: 'pages/operator/operator/operator'
        })
      } else {
        wx.reLaunch({
          url: '/pages/agent/homePage/homePage'
        })
      }
    }
  },
  /**
   * 点击获取用户信息的按钮
   * 获取信息成功后，隐藏按钮
   */
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.errMsg.indexOf('ok') > 1) {
      app.globalData.userInfoEncryptedData = e.detail.encryptedData
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.userInfoIv = e.detail.iv
      this.setData({
        hasUserInfo: true
      })
    } else {
      base.toast('', '由于您不同意授权，所以您不能使用该小程序');
    }
  },
  /**
   * 点击获取手机号按钮
   * 成功获取手机号后，跳转到首页
   */
  getPhoneNumber: function (e) {
    console.log(e)
    if (e.detail.errMsg.indexOf('ok') > 1) {
      // 获取手机号成功后调后台登录
      let json = {
        code: app.globalData.code,
        mobileEncryptedData: e.detail.encryptedData,
        userInfoEncryptedData: app.globalData.userInfoEncryptedData,
        phoneIv: e.detail.iv,
        userInfoIv: app.globalData.userInfoIv
      }
      base.http_post(json, '/userOperatorAndAgentLogin', (res) => {
        if (res.code == 0) {
          //var userType = wx.getStorageSync('userType')
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('userType', res.data.userType)
          wx.setStorageSync('mobileNo', res.data.userInfo.mobileNo)
          if (res.data.userType) {
            wx.reLaunch({
              url: '/pages/agent/homePage/homePage'
            })
          } else {
            wx.reLaunch({
              url: 'pages/operator/operator/operator'
            })
          }
        } else {
          app.onLaunch()
          base.toast('', res.message);
        }
      })
    } else {
      base.toast('', '由于您不同意授权，所以您不能使用该小程序');
    }
  }
})
