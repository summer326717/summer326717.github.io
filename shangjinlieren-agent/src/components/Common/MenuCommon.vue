<template>
    <div class="container">
        <div class="left-menu">
            <p class="menu-title">赏金猎人</p>
            <el-menu router
              :default-active="$route.path"
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
                <i class="el-icon-menu"></i>
                <span slot="title">我的账户</span>
              </el-menu-item>
            </el-menu>
            <div class="sign-out">
              <p @click="dialogVisible = true"><img src="../../assets/header.png"></p>
              <p @click="dialogVisible = true">{{nickName}}</p>
              <p @click="signOut"><img src="../../assets/img-13.png"></p>
            </div>
        </div>
        <div class="right-content">
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition>
            <footer>&copy; 2018 杭州音聚网络科技有限公司 版权所有</footer>
        </div>
        <el-dialog
          title="修改密码"
          :visible.sync="dialogVisible"
          width="500px">
          <div class="updatepwd">
            <div>
              <span class="t-left">手机号码：</span>
              <span>{{replaceString(mobileNo)}}</span>
              <span class="right"><el-button type="warning" size="medium" @click="getCode">获取验证码</el-button></span>
            </div>
            <div>
              <span class="t-left">验证码：</span>
              <span class="t-right"><el-input v-model="telcode" placeholder="请输入验证码"></el-input></span>
            </div>
            <div>
              <span class="t-left">新密码：</span>
              <span class="t-right"><el-input v-model="newpwd" placeholder="请输入新密码"></el-input></span>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="dialogVisible=false">取 消</el-button>
            <el-button size="medium" type="warning" @click="changePwd">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import Cookies from 'cookies-js'
let utils = require('../../utils/common')
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
      ],
      dialogVisible: false,
      telcode: '',
      newpwd: '',
      nickName: '',
      mobileNo: ''
    }
  },
  created () {
    this.nickName = Cookies.get('nickName')
    this.mobileNo = Cookies.get('mobile')
  },
  methods: {
    signOut () {
      Cookies.set('token', '')
      Cookies.set('agentId', '')
      this.$router.push({path: '/'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    replaceString (str) {
      let str1 = str.substr(3, 4)
      let str2 = str.replace(str1, '****')
      return str2
    },
    changePwd () {
      if (!utils.checkNull(this.telcode)) {
        this.$message('手机验证码不能为空')
        return
      }
      if (this.telcode.length < 4) {
        this.$message('请输入正确验证码')
        return
      }
      if (!utils.checkNull(this.newpwd)) {
        this.$message('新密码不能为空')
        return
      }
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(this.newpwd)) {
        this.$message('密码必须为大于4个字符，小于16个字符的数字和字母的组合')
        return
      }
      let json = {
        code: this.telcode,
        mobileNo: this.mobileNo,
        newPassword: this.newpwd
      }
      this.$axiosPost('/backAgentUpdatePassword', json).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogVisible = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getCode () {
      let json = {
        mobileNo: this.mobileNo
      }
      this.$axiosPost('/sms/sendSmsVerificationCode', json).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
      })
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
.container .left-menu .sign-out p {
  color: #ffffff;
  height: 46px;
  cursor: pointer;
}
.container .right-content {
    padding-left: 180px;
}
.right-content footer {
    font-size: 14px;
    padding: 15px 0;
    text-align: center;
}
.updatepwd .t-left {
  width: 30%;
  padding: 10px 0;
  margin-bottom: 15px;
  text-align: right;
  display: inline-block;
}
.updatepwd .t-right {
  width: 69%;
  display: inline-block;
  vertical-align: middle;
}
</style>
