import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'Login',
      component: resolve => require(['../components/Login'], resolve) // 异步加载组件
    },
    {
      path: '/MenuCommon/:id',
      name: 'MenuCommon',
      component: resolve => require(['../components/Common/MenuCommon'], resolve),
      children: [
        {
          path: '/MyAgent',
          name: 'MyAgent',
          component: resolve => require(['../components/AgentManage/MyAgent'], resolve) // 异步加载组件
        },
        {
          path: '/MyCustomer',
          name: 'MyCustomer',
          component: resolve => require(['../components/CustomerManage/MyCustomer'], resolve) // 异步加载组件
        },
        {
          path: '/MyAccount',
          name: 'MyAccount',
          component: resolve => require(['../components/AccountManage/MyAccount'], resolve)
        },
        {
          path: '/toCash',
          name: 'toCash',
          component: resolve => require(['../components/AccountManage/toCash'], resolve)
        },
        {
          path: '/CustomerDetail',
          name: 'CustomerDetail',
          component: resolve => require(['../components/CustomerManage/CustomerDetail'], resolve)
        },
        {
          path: '/AgentDetail',
          name: 'AgentDetail',
          component: resolve => require(['../components/AgentManage/AgentDetail'], resolve)
        }
      ]
    }
  ]
})
