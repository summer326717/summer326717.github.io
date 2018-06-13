import Vue from 'vue'
import App from './App'
import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {axiosPost, axiosGet} from './assets/utils/serverApi'
require('./assets/utils/mockServer')

// 定义全局变量
Vue.prototype.$axiosPost = axiosPost
Vue.prototype.$axiosGet = axiosGet
Vue.config.productionTip = false

NProgress.configure({ showSpinner: true });

router.beforeEach((to, from, next) => {
    if (to.path == '/Login') {
        next()
    } else {
        NProgress.start();
        next()
    }
})

router.afterEach(transition => {
    NProgress.done();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
