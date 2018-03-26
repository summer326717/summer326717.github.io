<template>
  <div class="selecttype">
      <p><img class="logo" src="../../assets/images/01.png" alt=""></p>
      <p>
          <router-link class="se_btn" to="./Login?type=1">销售员</router-link>
      </p>
      <p>
          <router-link class="se_btn mt42" to="./Login?type=2">客户</router-link>
      </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less">
@rem: 100rem;
.bgorange {
  background: #ff2a00;
}
.selecttype {
  text-align: center;
  padding: 0 90/@rem;
  color: #666666;
  .logo {
    width: 234/@rem;
    margin: 150/@rem;
  }
  .se_btn {
    width: 100%;
    display: block;
    font-size: 36/@rem;
    height: 96/@rem;
    line-height: 96/@rem;
    border-radius: 96/@rem;
    border: 1px solid #d0d0d0;

    &:active {
      color: #ffffff;
      .bgorange();
      border: 1px solid #ff2a00;
      box-shadow: rgba(0, 0, 0, 0.3) 0 0 20/@rem;
    }
  }
}
</style>
