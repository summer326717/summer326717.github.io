<template>
  <div class="wrap">
    <h1>任务任务任务任务任务</h1>
    <div v-for="(item,i) in dataList" :key="i">
      <img src="" alt="">
      <p>任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      isLoaded: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      console.log('1')
    }
  }
}
</script>

<style>
.wrap img {
  width: 300px;
}
.wrap p {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
