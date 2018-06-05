// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {axiosPost, axiosGet} from './assets/utils/serverApi'

Vue.config.productionTip = false
// 定义全局变量
Vue.prototype.$axiosPost = axiosPost
Vue.prototype.$axiosGet = axiosGet
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})