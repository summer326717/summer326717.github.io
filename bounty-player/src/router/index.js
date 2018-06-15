import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: resolve => require(['../components/index/HomePage'], resolve)
    },
    {
      path: '/HomePage',
      component: resolve => require(['../components/index/HomePage'], resolve)
    },
    {
      path: '/TaskList',
      component: resolve => require(['../components/task/TaskList'], resolve)
    },
    {
      path: '/Teach',
      component: resolve => require(['../components/account/Teach'], resolve)
    },
    {
      path: '/Question',
      component: resolve => require(['../components/account/Question'], resolve)
    },
    {
      path: '/About',
      component: resolve => require(['../components/account/About'], resolve)
    },
    {
      path: '/Advertising',
      component: resolve => require(['../components/account/Advertising'], resolve)
    }
  ]
})
