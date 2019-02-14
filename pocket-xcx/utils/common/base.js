var MD5 = require('../common/md5.js');

export function http_post(json, url, completion) {console.log(json)
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var time = Date.parse(new Date());
  var hash = MD5.hex_md5(time + "BAOMO");
  var token = wx.getStorageSync('token')
  wx.request({
    method: "POST",
    //url: 'https://wxapi.boonmo.com/scavengingpaper/api/baomo' + url,
    url: 'https://test.boonmo.com/scavengingpaper/api/baomo' + url,
    data: json,
    header: {
      "Timestamp": time,
      "SignInfo": hash,
      "token": token,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8"
    },
    success: function (res) {
      wx.hideLoading()
      if (res.error) {
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: res.status + res.error
        })
      } else if (res.data.code == 101) {
        wx.setStorageSync('token', '')
        wx.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        console.log(res)
        completion(res.data);
      }
    },
    fail: function (err) {
      wx.hideLoading()
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: err.errMsg
      })
    }
  })
}

export function uploadImg(url, completion) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var time = Date.parse(new Date());
  var hash = MD5.hex_md5(time + "BAOMO");
  var token = wx.getStorageSync('token')
  wx.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log(res)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      wx.getImageInfo({
        src: tempFilePaths[0],
        success(res) {
          /*if (type == 1) {//全屏
            if (res.width != '1080' || res.height != '1920') {
              wx.hideLoading()
              wx.showModal({
                showCancel: false,
                title: '提示',
                content: '请使用1080*1920尺寸照片上传'
              })
              return
            }
          }
          if (type == 2) {//上半屏
            if (res.width != '1080' || res.height != '610') {
              wx.hideLoading()
              wx.showModal({
                showCancel: false,
                title: '提示',
                content: '请使用1080*610尺寸照片上传'
              })
              return
            }
          }
          if (type == 3) {//视频图片
            if (res.width != '1080' || res.height != '1310') {
              wx.hideLoading()
              wx.showModal({
                showCancel: false,
                title: '提示',
                content: '请使用1080*1310尺寸照片上传'
              })
              return
            }
          }*/
          wx.uploadFile({
            //url: 'https://wxapi.boonmo.com/scavengingpaper/api/baomo/' + url,
            url: 'https://test.boonmo.com/scavengingpaper/api/baomo/' + url,
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'token': token,
              'Timestamp': time,
              'SignInfo': hash,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest'
            },
            success: res => {
              wx.hideLoading()
              completion(res)
            },
            fail: res => {
              wx.hideLoading()
              console.log('upload error')
            }
          })
        }
      })
    },
    fail: function (res) {
      wx.hideLoading()
    }
  })
}
export function uploadVideo(url, completion) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  var time = Date.parse(new Date());
  var hash = MD5.hex_md5(time + "BAOMO");
  var token = wx.getStorageSync('token')
  wx.chooseVideo({
    sourceType: ['album', 'camera'],
    maxDuration: 60,
    camera: 'back',
    success(res) {
      console.log(res)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePath = res.tempFilePath;
      wx.uploadFile({
        //url: 'https://wxapi.boonmo.com/scavengingpaper/api/baomo/' + url,
        url: 'https://test.boonmo.com/scavengingpaper/api/baomo/' + url,
        filePath: tempFilePath,
        name: 'file',
        header: {
          'token': token,
          'Timestamp': time,
          'SignInfo': hash,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        },
        success: res => {
          wx.hideLoading()
          completion(res)
        },
        fail: res => {
          wx.hideLoading()
          console.log('upload error')
        }
      })
    },
    fail: function (res) {
      wx.hideLoading()
    }
  })
}
export function toast(type, message) {
  if (type == 'succ') {
    wx.showToast({
      title: message,
      icon: 'success',
    })
  } else if (type == 'load') {
    wx.showToast({
      title: message,
      icon: 'loading',
    })
  } else if (message == undefined) {
    wx.showToast({
      title: type,
      icon: 'none',
    })
  } else {
    wx.showToast({
      title: message,
      icon: 'none',
    })
  }
}
export function transTime(t, type) {
  var d = t.replace(/T/g,' ').split('.')[0]
  d = new Date(Date.parse(d.replace(/-/g, "/")))
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var dd = d.getDate();
  var h = d.getHours();
  var mm = d.getMinutes();
  var s = d.getSeconds();
  if (type == 1) {
    return y + '-' + e(m) + '-' + e(dd)
  } else if (type == 2) {
    return e(m) + '-' + e(dd);
  } else if (type == 3) {
    return e(h) + ':' + e(mm);
  } else if (type == 4) {
    return y + '年' + e(m) + '月' + e(dd) + ' ' + e(h) + ':' + e(mm);
  } else if (type == 5) {
    return y + '-' + e(m) + '-' + e(dd);
  } else {
    return y + '-' + e(m) + '-' + e(dd) + ' ' + e(h) + ':' + e(mm) + ':' + e(s);
  }
}

function e(t) {
  return t > 9 ? t : '0' + t;
}

export function concattArr(olist, nlist) {
  return olist.concat(nlist);
}

export function check_share() {
  if (getCurrentPages()[0].route == 'pages/index/index') {
    wx.hideShareMenu();
  } else {
    wx.showShareMenu();
  }
}