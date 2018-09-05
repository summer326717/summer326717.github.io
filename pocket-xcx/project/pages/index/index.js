
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){ // 页面有授权按钮，如果为false，就需要升级微信app
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      debugger
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let encryptedData = '5JyDDGypwa5nhv2g5EXdDdQxnirP8LUqI043WS8/5K3hSKMO+aIi3VF6NpRkiSgNq8efAfdJuvlBxTwCuZkr8PNHrMl0bb3udym23Sc0ZzId8sLEi79G8GVzRbxootseBHY5oLiNjGhilWqfmsS9njRpjmp1eZpMM3lv+2Fk/K05fCr62xOOCfl2q3O08bTnQm3ZmJ8kECRKCWVXdxHYbA=='
    encryptedData = Crypto.util.base64ToBytes(encryptedData)
    var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7)
    /* var key = Crypto.util.base64ToBytes(this.sessionKey);
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes:true,
      iv: iv,
      mode: mode
    })
    var decryptResult = JSON.parse(bytes)
    console.log(decryptResult)*/
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber: function(e) {
    if (e.detail.errMsg.indexOf('ok') > 1) {
      // 获取手机号成功
    } else {
      // 用户不同意获取手机号
    }
    console.log(e)
		console.log(e.detail.errMsg)
		console.log(e.detail.iv)
		console.log(e.detail.encryptedData)
	} 
})
