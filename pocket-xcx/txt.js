/**
 * 1、判断用户登录状态是否失效，如果失效则wx.login()。
 */
wx.checkSession()
/**
 * 2、调用接口获取登录凭证code。
 */
wx.login()
/**
 * code2accessToken
 * wx.login()获取临时登录凭证code后。
 * 使用appid、secret（appSecret）、js_code（code）、grant_type（authorization_code）。
 * 服务端get方式调用https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
 * 返回openid(用户唯一标识)、session_key(会话秘钥)、uinionid(用户在开放平台的唯一标识符)
 */
/**
 * 3、获取用户的当前设置，返回值为小程序已经向用户请求过的接口
 */
wx.getSetting({
    success: res => {
        if (res.authSetting['scope.userInfo']) {
            //已授权获取用户信息的接口
        }
    }
})
/**
 * 4、提前向用户发起授权请求。
 * 调用后会立即弹出询问用户是否同意授权小程序使用某项功能，但不会实际调用对应接口。
 * 如果用户同意授权，则之后调用接口不会弹框，会直接返回成功。
 * 
 */
wx.authorize()
/**
 * 5、调用客户端设置界面，返回用户设置的操作结果
 * 设置界面只会出现，已经向用户请求过的结果
 * <button></button>来使用此功能
 */
wx.openSetting()

/**
 * 获取用户信息
 */
wx.getUserInfo({
    success: function (res) {
        var userInfo = res.userInfo
        console.log(res)
        console.log(userInfo)
    }
})
/**
 * 获取手机号
 */