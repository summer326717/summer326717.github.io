<template>
<div>
  <div class="header"><span class="left hclose" @click="goHistory"></span></div>
  <div class="login">
      <p class="bold_tit">注册</p>
      <p><input class="ipt" type="text" placeholder="请输入手机号/邮箱"></p>
      <p class="ipt-code"><input class="ipt" type="text" placeholder="请输入验证码"><span class="close"></span><button class="s-btn">获取验证码</button></p>
      <p><input class="ipt" type="text" placeholder="请设置6-20位登录密码"><span class="close"></span></p>
      <p><input class="ipt" type="text" placeholder="请输入真实姓名"></p>
      <p><button class="w-btn mt42">完成</button></p>
      <p>点击-完成即代表您同意<router-link to='/login' class="c_orange">《注册服务协议》</router-link></p>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    goHistory() {
      this.$router.go(-1);
    }
  }
};
</script>
