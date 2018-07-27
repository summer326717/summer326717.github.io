import Vue from 'vue'
import Router from 'vue-router'
import TaskList from '@/components/TaskList'
import AboutUs from '@/components/AboutUs'
import Advertising from '@/components/Advertising'
import Description from '@/components/Description'
import NewUser from '@/components/NewUser'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/Advertising',
      name: 'Advertising',
      component: Advertising
    },
    {
      path: '/Description',
      name: 'Description',
      component: Description
    },
    {
      path: '/NewUser',
      name: 'NewUser',
      component: NewUser
    },
    {
      path: '/Question',
      name: 'Question',
      component: Question
    }
  ]
})
