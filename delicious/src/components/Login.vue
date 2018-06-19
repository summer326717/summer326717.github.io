<template>
  <div class="denglu">
    <svg class="editorial" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none">
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0
      58-18 88-18s
      58 18 88 18
      58-18 88-18
      58 18 88 18
      v44h-352z">
    </path>
    </defs>
    <g class="parallax">
      <use xlink:href="#gentle-wave" x="50" y="0" fill="rgba(190,190,220,.5)"></use>
      <use xlink:href="#gentle-wave" x="50" y="3" fill="rgba(190,190,220,.5)"></use>
      <use xlink:href="#gentle-wave" x="50" y="6" fill="rgba(190,190,220,.5)"></use>
    </g>
    </svg>
    <div class="dlnr">
      <p><input type="text" v-model="username" placeholder="请输入用户名"/></p>
      <p><input type="password" v-model="password" placeholder="请输入密码"/></p>
      <p>
        <button @click="dlLogin">登录</button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Denglu",
    data() {
      return {
        username: 'admin',
        password: 'admin'
      }
    },
    methods: {
      dlLogin() {        
        if (this.username.trim() == '' || this.username.trim().length < 5) {
          alert('用户名不能为空且用户名至少6个字符');
          return;
        }
        if (this.password.trim() == '' || this.username.trim().length < 5) {
          alert('密码不能为空且密码至少6个字符');
          return;
        }
        let json = {
          username: this.username,
          password: this.password
        }
        this.$axiosPost('/login',json).then((res) => {
          console.time("测试 fn 速度: ")
          try {
              if (res.state === 0) {
                this.$router.push({path: 'HomePage'})
              } else {
                alert(res.message);
              }
            } catch (error) {
            alert(error.message)
          }
          console.timeEnd("测试 fn 速度: ") //1471.47900390625ms
        })
      }
    }
  }
</script>

<style scoped>
  .denglu {
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    background: url("http://demo.cssmoban.com/cssthemes4/azds_login-forms/form-1/assets/img/backgrounds/1.jpg") no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .denglu .dlnr {
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -150px;
    margin-left: -200px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 50px;
  }

  .denglu .dlnr input {
    font-size: 16px;
    color: #555a79;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: transparent;
    border-bottom: 1px solid #555a79;
    margin-top: 20px;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #555a79;
    font-size: 16px;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #555a79;
    font-size: 16px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #555a79;
    font-size: 16px;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #555a79;
    font-size: 16px;
  }

  .denglu .dlnr button {
    background: #7f81a0;
    width: 100%;
    margin-top: 30px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transition: background 0.4s ease-in-out;
  }

  .denglu .dlnr button:hover {
    background: #a9abcc;
  }

  .editorial{
    position: fixed;
    bottom: 0;
  }

  .parallax>use {
    animation: move-forever 12s linear infinite
  }

  .parallax>use:nth-child(1) {
      animation-delay: -2s
  }

  .parallax>use:nth-child(2) {
      animation-delay: -2s;
      animation-duration: 5s
  }

  .parallax>use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 3s
  }
  @keyframes move-forever {
    0% {
        transform: translate(-90px,0)
    }

    100% {
        transform: translate(85px,0)
    }
}
</style>
