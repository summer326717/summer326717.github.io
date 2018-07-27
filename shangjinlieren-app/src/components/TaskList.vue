<template>
  <div class="page">
    <mu-load-more @refresh="onRefresh" :refreshing="refreshing" :loading="loading" @load="onInfinite" :loaded-all='loadedAll'>
      <mu-list textline="three-line">
        <div v-for="(item, i) in dataList" :key="i" @click.native="onItemClick(index)">
          <mu-list-item avatar :ripple="false" button :href='item.articleUrl+"?articleId="+item.articleId+"&articleState="+item.articleState'>
            <mu-list-item-action>
              <mu-avatar size='50'>
                <img :src="item.articleIcon">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-sub-title>
                {{item.articleName}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
        <p v-if='loadedAll&&pageNo!=1' style="text-align:center;padding:14px 0;">已经到底啦~~~</p>
      </mu-list>
      <div class="no-data" v-if='loadedAll&&pageNo==1'>
        <img src="../assets/no-data.png"/>
      </div>
    </mu-load-more>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      refreshing: false,
      dataList: [],
      pageNo: 1,
      pageSize: 10,
      loadedAll: false,
      infiniteCount: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData (type) {
      let json = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      this.$axiosPost('/queryReadArticleTaskList', json).then((res) => {
        if (res.code === 0) {
          if (this.pageNo === 1) {
            this.dataList = res.data
          } else {
            this.dataList = this.dataList.concat(res.data)
          }
        } else if (res.code === 2) {
          if (this.pageNo === 1) {
            this.dataList = []
          }
          this.loadedAll = true
        } else {
          console.log(res.message)
        }
        if (type === 1) {
          this.refreshing = false
          this.loadedAll = false
        }
        if (type === 2) {
          this.loading = false
        }
      })
    },
    onRefresh () {
      this.refreshing = true
      setTimeout(() => {
        this.pageNo = 1
        this.getData(1)
      }, 2500)
    },
    onInfinite () {
      this.loading = true
      setTimeout(() => {
        this.pageNo++
        console.log(this.pageNo)
        this.getData(2)
      }, 2500)
    },
    onItemClick (index) {
      console.log(index)
    }
  }
}
</script>
