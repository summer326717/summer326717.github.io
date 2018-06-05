import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/wsxz-web/api'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode === 2) {
      alert('错误')
    }
    if (response.status === 404) {
      alert('服务出错，请稍后再试')
    }
    if (response.status === 304) {
      alert('系统故障，请反馈给客服')
    }
    if (response.status === 400) {
      alert('服务不稳定，请稍后再试')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export function axiosGet (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(response => {
      resolve(response.data)
    }).catch(err => {
      console.log(err)
      console.log(err.message)
      reject(err)
    })
  })
}

export function axiosPost (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
