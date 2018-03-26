import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import SelectType from '@/components/login/SelectType'
import Login from '@/components/login/Login'
import PwdLogin from '@/components/login/PwdLogin'
import Register from '@/components/login/Register'
import forgetPwd from '@/components/login/forgetPwd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SelectType',
      component: SelectType
    },
    {
      path: '/SelectType',
      name: 'SelectType',
      component: SelectType
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/PwdLogin',
      name: 'PwdLogin',
      component: PwdLogin
    },
    {
      path: '/Register',
      name: Register,
      component: Register
    },
    {
      path: '/forgetPwd',
      name: forgetPwd,
      component: forgetPwd
    }
  ]
})
