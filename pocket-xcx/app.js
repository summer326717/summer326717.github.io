//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
        this.getUser()
      },
      error: err => {
        console.log(err)
      }
    })
  },
  getUser: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              this.globalData.userInfoEncryptedData = res.encryptedData
              this.globalData.userInfoIv = res.iv
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('没有授权获取用户信息')
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: '',
    userInfoEncryptedData: '',
    userInfoIv: ''
  }
})