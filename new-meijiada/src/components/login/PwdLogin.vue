<template>
  <div>
      <div class="header"><span class="left hclose" @click="goHistory"></span><span class="right" @click="toRegister">去注册</span></div>
      <div class="login">
        <p class="bold_tit">登陆</p>
        <p>欢迎来到美佳达</p>
        <p><input class="ipt" v-model="username" type="text" placeholder="请输入手机号/邮箱"><span class="close"></span></p>
        <p><input class="ipt" v-model="password" type="text" placeholder="请输入登陆密码"><span class="close"></span></p>
        <p class="ptb20"><span class="remember">记住密码</span><router-link class="forgetpwd" to="./forgetPwd">忘记密码?</router-link></p>
        <p class="ptb20"><button class="w-btn" @click="nowLogin">立即登录</button></p>
        <p><button class="wi-btn" @click="codeLogin">验证码登陆</button></p>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    nowLogin() {
      if (this.password) {
        return;
      }
      let json = {
        username: this.username,
        password: this.password
      };
    },
    goHistory(){
      this.$router.go(-1);
    },
    toRegister() {
      this.$router.push({ path: "./Register" });
    },
    codeLogin() {
      this.$router.push({ path: "./Login" });
    }
  }
};
</script>