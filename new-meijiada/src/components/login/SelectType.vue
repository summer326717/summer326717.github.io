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