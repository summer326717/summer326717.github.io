<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>我的账户</span><button class="btn-gray" @click="reloadAgent()">刷新</button></p>
        </div>
        <div class="ul">
            <ul>
                <li>
                    <p>账户余额</p>
                    <p>￥{{accountBalance.toFixed(2)}}</p>
                    <div><el-button type="warning" size="medium" plain @click="toCash">提现</el-button></div>
                </li>
                <li>
                    <p>总收益</p>
                    <p>￥{{totalProfit.toFixed(2)}}</p>
                </li>
                <li>
                    <p>客户收益</p>
                    <p>￥{{customerProfit.toFixed(2)}}</p>
                </li>
                <li>
                    <p>代理收益</p>
                    <p>￥{{agentProfit.toFixed(2)}}</p>
                </li>
            </ul>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="getData()">查询</button>
            </div>
            <div class="ptb20">
                <span>分类：</span>
                <span>
                    <el-select v-model="profitType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span>创建日期：</span>
                <el-date-picker
                    v-model="arrTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
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
                        <th>编号</th>
                        <th>分类</th>
                        <th>来源</th>
                        <th>余额（元）</th>
                        <th>创建时间</th>
                        <th>备注</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>{{item.flowingWaterId}}</td>
                        <td>
                            <span v-if='item.profitType==0'>客户收益</span>
                            <span v-if='item.profitType==1'>代理人受益</span>
                            <span v-if='item.profitType==2'>提现</span>
                        </td>
                        <td>{{item.profitFrom}}</td>
                        <td>{{calc.div(item.mny, 100).toFixed(2)}}</td>
                        <td>{{$changeTime(item.createTime)}}</td>
                        <td>{{item.remark}}</td>
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
      pageNo: 1,
      pageSize: 10,
      sortType: 2, // 排序方式
      totalPages: 1,
      resultList: [],
      arrTime: '',
      endTime: '',
      startTime: '',
      profitType: '', // 0是从客户收益，1是从代理人收益，2是提现
      accountBalance: 0,
      totalProfit: 0,
      customerProfit: 0,
      agentProfit: 0,
      options: [
        {
          value: '0',
          label: '客户收益'
        },
        {
          value: '1',
          label: '代理收益'
        },
        {
          value: '2',
          label: '提现'
        }
      ]
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
        endTime: this.arrTime[1],
        startTime: this.arrTime[0],
        profitType: parseInt(this.profitType), // 0是从客户收益，1是从代理人收益，2是提现
        sortType: this.sortType
      }
      this.$axiosPost('/back/queryAgentAccountInfo', json).then((res) => {
        if (res.code === 0) {
          this.accountBalance = res.data.accountInfo.accountBalance
          this.totalProfit = res.data.accountInfo.totalProfit
          this.customerProfit = res.data.accountInfo.customerProfit
          this.agentProfit = res.data.accountInfo.agentProfit
          if (res.data.resultList) {
            this.resultList = res.data.resultList
            this.totalPages = res.data.pageTotal
          } else {
            this.resultList = []
            this.totalPages = res.data.pageTotal
          }
        } else {
          this.resultList = []
          this.totalPages = 1
        }
      })
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
      this.profitType = ''
      this.arrTime = ''
      this.getData()
    },
    toCash () {
      this.$router.push({'path': '/toCash', 'query': {accountBalance: this.accountBalance}})
    }
  }
}
</script>
