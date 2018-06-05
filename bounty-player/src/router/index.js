import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/UserLogin',
      component: resolve => require(['../components/login/UserLogin'], resolve) // 异步加载组件
    },
    {
      path: '/HomePage',
      component: resolve => require(['../components/index/HomePage'], resolve)
    },
    {
      path: '/SplashPage',
      component: resolve => require(['../components/index/SplashPage'], resolve)
    },
    {
      path: '/CodeLogin',
      component: resolve => require(['../components/login/CodeLogin'], resolve)
    },
    {
      path: '/UpdatePhone',
      component: resolve => require(['../components/login/UpdatePhone'], resolve)
    },
    {
      path: '/UpdatePwd',
      component: resolve => require(['../components/login/UpdatePwd'], resolve)
    },
    {
      path: '/TaskList',
      component: resolve => require(['../components/task/TaskList'], resolve)
    },
    {
      path: '/ConfirmCash',
      component: resolve => require(['../components/cash/ConfirmCash'], resolve)
    },
    {
      path: '/ReturnCash',
      component: resolve => require(['../components/cash/ReturnCash'], resolve)
    },
    {
      path: '/AccountDetail',
      component: resolve => require(['../components/account/AccountDetail'], resolve)
    },
    {
      path: '/Setting',
      component: resolve => require(['../components/account/Setting'], resolve)
    }
  ]
})
