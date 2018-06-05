<template>
  <div>
    <h1>用户登录</h1>
    <p><input type="text" placeholder="请输入手机号" v-model="usertel"></p>
    <p><input type="text" placeholder="请输入密码" v-model="userpwd"></p>
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
    }
  }
}
</script>
