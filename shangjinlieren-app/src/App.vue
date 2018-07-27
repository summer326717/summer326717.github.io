<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
html,body,#app {
  height: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #eeeeee;
}
p{
  margin: 0;
}
.list-text {
  padding: 30px;
  line-height: 30px;
  p {
    text-indent: 2em;
  }
}
.no-data {
  text-align: center;
  padding-top: 30%;
  img {
    width: 50%;
  }
}
.mu-avatar img {
  object-fit: cover;
}
.mu-list-three-line .mu-item-action .mu-avatar {
  margin-top: inherit;
}
.mu-list {
  background: #eeeeee;
  li{
    background: #ffffff;
  }
}
.demo-loadmore-wrap {
  background: #eeeeee;
}
</style>
