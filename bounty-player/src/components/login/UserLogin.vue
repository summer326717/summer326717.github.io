<template>
  <div>
    <h1>登录</h1>
    <p><input type="text" placeholder="请输入用户名" v-model="usertel"><i @click="contactServicer">?</i></p>
    <p><input type="password" placeholder="请输入密码" v-model="userpwd"><i @click="changeInput"></i></p>
    <p><button @click="codeLogin">验证码登录</button></p>
    <p><button @click="userLogin">登录</button></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usertel: '',
      userpwd: ''
    }
  },
  methods: {
    userLogin () {
      this.$axiosGet('/baseCode/get/baseCode2CombSelect/XJ_DM_PZ_QTDZZL').then((response) => {
        console.log(response)
        this.$router.push({path: 'HomePage'})
      })
    },
    contactServicer () {
      //
    },
    changeInput () {
      //
    },
    codeLogin () {
      //
    }
  }
}
</script>
