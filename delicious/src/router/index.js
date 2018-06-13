import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/Login'], resolve) //异步加载组件
    },
    {
      path: '/Home/:id',
      name: 'Home',
      component: resolve => require(['../components/Home'], resolve),
      children: [
        {
          path: '/DemoPage',
          name: 'DemoPage',
          component: resolve => require(['../components/pages/DemoPage'], resolve)
        },
        {
          path: '/HomePage',
          name: 'HomePage',
          component: resolve => require(['../components/pages/HomePage'], resolve)
        },
        {
          path: '/AgentManage',
          name: 'AgentManage',
          component: resolve => require(['../components/pages/agent/AgentManage'], resolve)
        },
        {
          path: '/FinanceManage',
          name: 'FinanceManage',
          component: resolve => require(['../components/pages/finance/FinanceManage'], resolve)
        },
        {
          path: '/SystemManage',
          name: 'SystemManage',
          component: resolve => require(['../components/pages/system/SystemManage'], resolve)
        },
        {
          path: '/UserManage',
          name: 'UserManage',
          component: resolve => require(['../components/pages/user/UserManage'], resolve)
        }
      ]
    },
    {
      path: '/Login',
      component: resolve => require(['../components/Login'], resolve)
    },
  ]
})
