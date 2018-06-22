import Vue from 'vue'
import App from './App'
import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {axiosPost, axiosGet} from './assets/utils/serverApi'
require('./assets/utils/mockServer')

//var fundebug = require("fundebug-javascript")
//fundebug.apikey = "92b735ae3c80543c96664ca5e1c836de301111d2e338decef1ac6c2d7e231c5d"

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

/*window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
    var info = "错误信息：" + errorMessage + "，" +
      "出错文件：" + scriptURI + "，" +
      "出错行号：" + lineNumber + "，" +
      "出错列号：" + columnNumber + "，" +
      "错误详情：" + errorObj + "，";
    console.log(info);
    alert(info + '如影响使用请联系客服。');
    return true
}*/