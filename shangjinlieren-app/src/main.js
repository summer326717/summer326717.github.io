// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { axiosGet, axiosPost } from './assets/serviceApi'
import 'muse-ui/lib/styles/base.less'
import {
  Alert,
  AppBar,
  AutoComplete,
  Avatar,
  Badge,
  BottomNav,
  BottomSheet,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  DateInput,
  DataTable,
  Dialog,
  Divider,
  Drawer,
  ExpansionPanel,
  Form,
  Grid,
  GridList,
  Helpers,
  Icon,
  List,
  LoadMore,
  Menu,
  Pagination,
  Paper,
  Picker,
  Popover,
  Progress,
  Radio,
  Select,
  SlidePicker,
  Slider,
  Snackbar,
  Stepper,
  SubHeader,
  Switch,
  Tabs,
  TextField,
  Tooltip
} from 'muse-ui'
import 'muse-ui/lib/styles/theme.less'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
let Cookies = require('cookies-js')
Vue.use(Alert)
Vue.use(AppBar)
Vue.use(AutoComplete)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(BottomNav)
Vue.use(BottomSheet)
Vue.use(Breadcrumbs)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Chip)
Vue.use(DateInput)
Vue.use(DataTable)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(ExpansionPanel)
Vue.use(Form)
Vue.use(Grid)
Vue.use(GridList)
Vue.use(Helpers)
Vue.use(Icon)
Vue.use(List)
Vue.use(LoadMore)
Vue.use(Menu)
Vue.use(Pagination)
Vue.use(Paper)
Vue.use(Picker)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Select)
Vue.use(SlidePicker)
Vue.use(Slider)
Vue.use(Snackbar)
Vue.use(Stepper)
Vue.use(SubHeader)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TextField)
Vue.use(Tooltip)

Vue.prototype.$axiosPost = axiosPost
Vue.prototype.$axiosGet = axiosGet
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = to.query.token
  if (token) {
    console.log(token)
    localStorage.setItem('token', token)
  }
  let token2 = Cookies.get('token')
  if (token2) {
    console.log(token2)
    localStorage.setItem('token', token2)
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
