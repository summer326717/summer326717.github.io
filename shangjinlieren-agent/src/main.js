// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { axiosGet, axiosPost } from './assets/serviceApi'
import { getAgentList, changeTime } from './utils/common'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.prototype.$axiosGet = axiosGet
Vue.prototype.$axiosPost = axiosPost
Vue.prototype.$axios = axios
Vue.prototype.$changeTime = changeTime
Vue.config.productionTip = false
// 路由结束后，如果不是登录页面就请求获取代理人列表，并本地储存，如果已存在就不用再次请求
router.afterEach((to, from, next) => {
  if (to.path !== '/Login' && to.path !== '/') {
    if (!sessionStorage.getItem('agentList')) {
      getAgentList().then((res) => {
        if (res.data) {
          let dataList = []
          res.data.resultList.map((v, i) => {
            dataList.push({value: v.name, name: v.agentId})
          })
          sessionStorage.setItem('agentList', JSON.stringify(dataList))
        }
      })
    }
  }
})
NProgress.configure({ showSpinner: true })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
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
