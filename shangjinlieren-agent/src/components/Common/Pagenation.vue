<template>
    <div class="ypagenation">
        <span v-if="currentpage==1">&lt;</span>
        <span v-if="currentpage>1" @click="beforePage">&lt;</span>
        <span v-for="i in indexs" :key="i" :class="{'active':i==currentpage}" @click="toPage(i)">{{i}}</span>
        <span v-if="currentpage!=totalpage" @click="nextPage">&gt;</span>
        <span v-if="currentpage==totalpage">&gt;</span>
        <!--<span>总共{{totalpage}}页</span>-->
        <input v-model="iptpage" type="text">
        <button @click="searchPage">查询</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      iptpage: '',
      currentpage: 1,
      totalpage: 1
    }
  },
  props: {
    cur: Number,
    all: Number
  },
  created () {
    this.currentpage = this.cur
    this.totalpage = this.all
  },
  methods: {
    beforePage () {
      this.currentpage--
      this.iptpage = ''
    },
    toPage (i) {
      this.currentpage = i
      this.iptpage = ''
    },
    nextPage () {
      this.currentpage++
      this.iptpage = ''
    },
    searchPage () {
      if (this.iptpage.trim() === '') {
        this.$message('请输入页码数')
        return
      }
      if (isNaN(this.iptpage)) {
        this.$message('请输入正确的页码数')
        return
      }
      if (parseInt(this.iptpage) > this.totalpage) {
        this.$message('输入的页码数不能大于总的页码数')
        return
      }
      this.currentpage = parseInt(this.iptpage)
    }
  },
  watch: {
    currentpage (val, old) {
      this.$emit('getpage', val)
    },
    cur (val) {
      this.currentpage = val
    },
    all (val) {
      this.totalpage = val
    }
  },
  computed: {
    indexs () {
      var left = 1
      var right = this.totalpage
      var ar = []
      if (this.totalpage >= 5) {
        if (this.currentpage > 3 && this.currentpage < this.totalpage - 2) {
          left = this.currentpage - 2
          right = this.currentpage + 2
        } else {
          if (this.currentpage <= 3) {
            left = 1
            right = 5
          } else {
            right = this.totalpage
            left = this.totalpage - 4
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  }
}
</script>

<style scoped>
.ypagenation{
    font-size: 0;
    padding: 20px;
    text-align: right;
    user-select: none;
    color: #393F4F;
}
.ypagenation span {
    width: 35px;
    text-align: center;
    height: 35px;
    line-height: 35px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    margin-right: 13px;
    background: #F1F1F1;
}
.ypagenation .active {
  background: #F1CE02;
}
.ypagenation input{
    width: 54px;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
    border: 1px solid #EAEAEA;
    vertical-align: top;
    background: #F1F1F1;
    border-radius: 6px 0 0 6px;
}
.ypagenation button{
    color: #393F4F;
    cursor: pointer;
    text-align: center;
    width: 54px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    vertical-align: top;
    background: #F1F1F1;
    border: 1px solid #EAEAEA;
    border-radius: 0 6px 6px 0;
}
</style>
