<template>
  <div class="page-login">
    <div class="login-bg">
      <div class="large-title">赏金猎人</div>
      <div class="login-box">
        <div class="login-title">欢迎登陆</div>
        <div>
          <input class="ipt" type="text" v-model="account" placeholder="请输入手机号码">
        </div>
        <div>
          <input class="ipt" type="password" v-model="password" placeholder="请输入登录密码">
        </div>
        <div class="check-btn">
          <el-checkbox v-model="checked">记住密码</el-checkbox><router-link class="f-right" to='/ForgetPwd'>忘记密码</router-link>
        </div>
        <div><button class="login-btn" @click="LoginMethod">登陆</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      checked: false,
      account: '',
      password: ''
    }
  },
  methods: {
    LoginMethod () {
      if (this.account === '' || this.account === null || this.account === undefined) {
        alert('手机号码不能为空')
        return
      }
      if (this.password === '' || this.account === null || this.account === undefined) {
        alert('密码不能为空')
        return
      }
      let json = {
        account: this.account,
        password: this.password
      }
      this.$axiosPost('/backAgentLogin', json).then((res) => {
        if (res.code === 0) {
          this.$router.push({path: '/MyCustomer'})
          if (this.checked) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('agentId', res.data.userInfo.agentId)
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
          } else {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
          }
        } else {
          alert(res.message)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-login {
  height: 100%;
}
.page-login .login-bg {
  height: 100%;
  background: url('../assets/img_01.png') no-repeat 0 0;
  background-size: contain
}
.page-login .login-bg .large-title {
  font-size: 46px;
  text-align: center;
  font-weight: bold;
  padding: 70px 0 40px 0;
}
.page-login .login-bg .login-box {
  width: 415px;
  height: 384px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 20px #666;
  box-sizing: border-box;
  text-align: center;
}
.page-login .login-bg .login-title {
  color: #f2ce00;
  font-size: 24px;
  padding: 35px 0;
}
.page-login .login-bg .login-box .ipt {
  width: 300px;
  height: 38px;
  padding-left: 38px;
  margin: 15px 0;
  border: 1px solid #CCCCCC
}
.page-login .login-bg .login-box input:focus {
  outline: none;
  border: 1px solid #FFCD69
}
.page-login .login-bg .login-box .check-btn {
  text-align: left;
  padding: 0 38px;
  margin: 5px 0 20px 0;
  font-size: 12px;
}
.page-login .login-bg .login-box .check-btn input {
  vertical-align: middle;
}
.page-login .login-bg .login-box .check-btn .f-right {
  color: #ffc34c;
  float: right;
}
.page-login .login-bg .login-box .login-btn {
  color: #ffffff;
  width: 340px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  background: #f2ce00;
  border: none;
  border-radius: 5px;
  outline: none;
}
</style>
