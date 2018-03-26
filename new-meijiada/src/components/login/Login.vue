<template>
  <div>
      <div class="header"><span class="left hclose" @click="goHistory"></span><span class="right" @click="toRegister">去注册</span></div>
      <div class="login">
        <p class="bold_tit">登陆</p>
        <p>欢迎来到美佳达</p>
        <p><input class="ipt" v-model="username" type="text" placeholder="请输入手机号/邮箱"><span class="close"></span></p>
        <p class="ipt-code"><input class="ipt" type="text" placeholder="请输入验证码"><span class="close"></span><button class="s-btn">获取验证码</button></p>
        <p class="mt80"><button class="w-btn" @click="nowLogin">立即登录</button></p>
        <p><button class="wi-btn" @click="pwdLogin">密码登陆</button></p>
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
    goHistory() {
      this.$router.go(-1);
    },
    toRegister() {
      this.$router.push({ path: "./Register" });
    },
    pwdLogin() {
      this.$router.push({ path: "./PwdLogin" });
    }
  }
};
</script>