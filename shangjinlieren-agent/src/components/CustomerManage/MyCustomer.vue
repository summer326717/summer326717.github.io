<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>我的客户</span><button class="btn-gray" @click="reloadAgent()">刷新</button></p>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="addCustomer()">添加</button>
                <button class="btn-normal" @click="getData()">查询</button>
            </div>
            <div class="ptb20">
                <span>姓名：</span>
                <input class="ipt-normal" type="text" v-model="name">
                <span>手机号码：</span>
                <input class="ipt-normal" type="text" v-model="mobile">
            </div>
        </div>
        <div class="m-table">
            <div class="m-title">
                <span>数据列表</span>
                <span class="drop-menu right">
                    <el-dropdown trigger="click" @command="changeSort">
                        <span class="el-dropdown-link">
                            排序方式<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">正序</el-dropdown-item>
                            <el-dropdown-item command="2">倒序</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <span class="drop-menu right">
                    <el-dropdown trigger="click" @command="changePageSize">
                        <span class="el-dropdown-link">
                            显示条数<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="10">10条</el-dropdown-item>
                            <el-dropdown-item command="20">20条</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </div>
            <div class="m-t-content">
                <table>
                    <tr>
                        <th>用户ID</th>
                        <th>姓名</th>
                        <th>手机号码</th>
                        <th>账户余额（元）</th>
                        <th>分润收益（元）</th>
                        <th>上次登录时间</th>
                        <th>启用状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>{{item.userBaseId}}</td>
                        <td>{{item.nickName}}<i v-if='item.sex==2' class="female"></i><i v-if='item.sex==1' class="male"></i></td>
                        <td>{{item.mobile}}</td>
                        <td>{{(calc.div(item.balance, 100)).toFixed(2)}}</td>
                        <td>{{(calc.div(item.totalEarnMoney, 100)).toFixed(2)}}</td>
                        <td>{{$changeTime(item.lastLoginTime)}}</td>
                        <td>
                            <span v-if='item.state==0'>启用</span>
                            <span v-if='item.state==1'>停用</span>
                        <td>
                            <router-link class="edit-btn" :to='{path: "/CustomerDetail", query: { type: 3, userBaseId : item.userBaseId }}'>修改</router-link>
                        </td>
                    </tr>
                </table>
                <div class="no-data" v-if='resultList.length==0'>
                    <img src="../../assets/no-data.png">
                </div>
                <pagenation v-if='resultList.length>0' :cur='pageNo' :all='totalPages' @getpage='getPage'></pagenation>
            </div>
        </div>
    </div>
</template>

<script>
import pagenation from '../Common/Pagenation'
export default {
  data () {
    return {
      agentId: '',
      mobile: '',
      name: '',
      pageNo: 1,
      pageSize: 10,
      sortType: 2, // 排序方式
      totalPages: 1,
      resultList: []
    }
  },
  components: {
    pagenation
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.mobile) {
        if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile)) {
          this.$message('请输入正确手机号')
          return false
        }
      }
      let json = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        mobile: this.mobile,
        nickName: this.name,
        sortType: this.sortType
      }
      this.$axiosPost('/back/queryAgentCustomerList', json).then((res) => {
        if (res.code === 0) {
          this.resultList = res.data.resultList
          this.totalPages = res.data.pageTotal
        } else {
          this.resultList = []
          this.totalPages = 1
        }
      })
    },
    addCustomer () {
      this.$router.push({'path': '/CustomerDetail', query: { type: 1 }})
    },
    getPage (e) {
      this.pageNo = e
      this.getData()
    },
    changePageSize (e) {
      this.pageNo = 1
      this.pageSize = e
      this.getData()
    },
    changeSort (e) {
      this.sortType = e
      this.getData()
    },
    reloadAgent () {
      this.pageNo = 1
      this.pageSize = 10
      this.sortType = 0
      this.mobile = ''
      this.name = ''
      this.mobile = ''
      this.getData()
    }
  }
}
</script>
