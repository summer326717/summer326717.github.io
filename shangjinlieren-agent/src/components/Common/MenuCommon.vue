<template>
    <div class="container">
        <div class="left-menu">
            <p class="menu-title">赏金猎人</p>
            <el-menu router
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#14191E"
              text-color="#787878"
              active-text-color="#F1CE02">
              <el-menu-item index="/MyCustomer">
                <i class="el-icon-tickets"></i>
                <span slot="title">我的客户</span>
              </el-menu-item>
              <el-menu-item index="/MyAgent">
                <i class="el-icon-document"></i>
                <span slot="title">我的代理人</span>
              </el-menu-item>
              <el-menu-item index="/MyAccount">
                <i class="el-icon-document"></i>
                <span slot="title">我的账户</span>
              </el-menu-item>
            </el-menu>
            <p class="sign-out" @click="signOut"><img src="../../assets/img-13.png"></p>
        </div>
        <div class="right-content">
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition>
            <footer>&copy; 2018 杭州音聚网络科技有限公司 版权所有</footer>
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      menuList: [
        {
          menuName: '代理人管理',
          menuLink: '/AgentManage',
          menuItem: []
        },
        {
          menuName: '用户管理',
          menuLink: '/UserManage',
          menuItem: []
        },
        {
          menuName: '财务管理',
          menuItem: [
            {
              menuName: '提现审核',
              menuLink: '/MoneyCheck'
            },
            {
              menuName: '提现操作',
              menuLink: '/MoneyDone'
            },
            {
              menuName: '平台账户',
              menuLink: '/PlatAccount'
            }
          ]
        }
        /* {
          menuName: '系统设置',
          menuItem: [
            {
              menuName: '汇率管理',
              menuLink: '/RateManage'
            },
            {
              menuName: '奖励管理',
              menuLink: '/RewordSetting'
            }
          ]
        } */
      ]
    }
  },
  methods: {
    signOut () {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      this.$router.push({path: '/'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    // 当前路由名称
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style>
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.container .left-menu {
    position: fixed;
    width: 180px;
    height: 100%;
    top: 0;
    left: 0;
    background: #14191E;
}
.container .left-menu .menu-title{
    text-align: center;
    color: #ffffff;
    padding: 38px 0 50px 0;
    background: #14191E;
    font-size: 24px;
}
.container .left-menu ul {
    overflow-y: scroll;
    height: calc(100% - 187px);
}
.container .left-menu ul::-webkit-scrollbar{
    display: none;
}
.container .left-menu ul::-webkit-scrollbar-track{
    display: none;
}
.container .left-menu ul::-webkit-scrollbar-thumb{
    display: none;
}
.container .left-menu .sign-out {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid #484848;
}
.container .right-content {
    padding-left: 180px;
}
.right-content footer {
    font-size: 14px;
    padding: 15px 0;
    text-align: center;
}
</style>
