//app.js
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    //监听向微信后台请求检查更新结果事件。微信在小程序冷启动时自动检查更新，不需由开发者主动触发。
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        console.log(res.hasUpdate)
      }
    })
    //监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            //重启小程序
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })
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