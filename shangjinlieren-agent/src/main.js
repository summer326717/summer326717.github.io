// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { axiosGet, axiosPost } from './assets/serviceApi'
import { changeTime } from './utils/common'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from 'cookies-js'

Vue.prototype.$axiosGet = axiosGet
Vue.prototype.$axiosPost = axiosPost
Vue.prototype.$axios = axios
Vue.prototype.$changeTime = changeTime
Vue.config.productionTip = false

NProgress.configure({ showSpinner: true })

// 路由结束后，如果不是登录页面就请求获取代理人列表，并本地储存，如果已存在就不用再次请求
router.beforeEach((to, from, next) => {
  if (to.path === '/Login' || to.path === '/') {
    let token = Cookies.get('token')
    if (token) {
      next('/MyCustomer')
    } else {
      NProgress.start()
      next()
    }
  } else {
    NProgress.start()
    next()
  }
})

router.afterEach(transition => {
  NProgress.done()
})
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
