<template>
  <div id="app" class="wrap">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@rem: 100rem;
body {
  background: #ffffff;
}
input,
button {
  border: none;
  font-family: PingFang SC Medium, Arial, Helvetica, sans-serif;
}
.header {
  height: 88/@rem;
  line-height: 88/@rem;
  padding: 0 30/@rem;
  text-align: right;
  font-size: 36/@rem;
  .left {
    float: left;
    width: 36/@rem;
    height: 88/@rem;
  }
  .hclose {
    background: url("./assets/images/02.png") no-repeat 50% 50%;
    background-size: contain;
  }
  .right {
    color: #ff2a00;
  }
}
.ptb20 {
  padding: 20/@rem 0;
}
.c_orange {
  color: #ff2a00;
}
.mt42 {
  margin-top: 42/@rem;
}
.mt80{
  margin-top: 80/@rem;
}
.w-btn {
  color: #ffffff;
  font-size: 32/@rem;
  height: 98/@rem;
  line-height: 98/@rem;
  text-align: center;
  border-radius: 98/@rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 10/@rem;
  background: #ff2a00;
}
.s-btn {
  color: #ffffff;
  font-size: 28/@rem;
  height: 68/@rem;
  line-height: 68/@rem;
  text-align: center;
  border-radius: 68/@rem;
  width: 180/@rem;
  background: #ff2a00;
}
.wi-btn {
  font-size: 32/@rem;
  height: 98/@rem;
  line-height: 98/@rem;
  text-align: center;
  width: 100%;
  color: #ff2a00;
}
.login {
  color: #333333;
  padding: 0 30/@rem;
  line-height: 60/@rem;
  .bold_tit {
    font-size: 54/@rem;
    padding: 40/@rem 0 20/@rem 0;
  }
  .wel_tit {
    font-size: 32/@rem;
  }
  p {
    position: relative;
  }
  .ipt {
    width: 100%;
    padding: 20/@rem 0;
    margin-top: 30/@rem;
    font-size: 32/@rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .close {
    position: absolute;
    top: 50/@rem;
    right: 0;
    width: 32/@rem;
    height: 32/@rem;
    display: block;
    background: url("./assets/images/03.png") no-repeat 50% 50%;
    background-size: contain;
  }
  .s-btn{
    position: absolute;
    right: -200/@rem;
    bottom: 0;
  }
  .ipt-code{
    width: 70%;
  }
  .remember {
    color: #999999;
  }
  .forgetpwd {
    float: right;
    color: #ff2a00;
  }
}
</style>
