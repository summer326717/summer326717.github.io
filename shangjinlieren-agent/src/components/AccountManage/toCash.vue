<template>
    <div class="manage-content">
        <div class="m-header">
            <p>
              <span>代理人管理 > 提现</span>
              <button class="btn-gray" @click="back()">返回</button></p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="detail-content">
                <div class="item">
                    <span class="left-span">当前金额</span>
                    <span>￥{{currentMoney}}（今日上限为{{calc.div(upRangeMoney, 1).toFixed(2)}}元，今日剩余上限{{calc.div(toCashMoney, 1).toFixed(2)}}元）</span>
                </div>
                <div class="item">
                    <span class="left-span">*提现金额</span>
                    <input class="ipt-normal" type="number" v-model="iptMoney" placeholder="请输入提现金额">
                </div>
                <div class="item">
                    <span class="left-span">*支付宝账户</span>
                    <input class="ipt-normal" type="text" placeholder="支付宝账户是手机号码或邮箱地址" v-model="zhifubao">
                </div>
                <div class="item">
                    <span class="left-span">*确认账户</span>
                    <input class="ipt-normal" type="text" placeholder="支付宝账户是手机号码或邮箱地址" v-model="czhifubao">
                </div>
                <div class="cash-description">
                    <p>提现说明</p>
                    <p>1.提现时请务必<span class="redfont">填写正确的支付宝账户</span>，如因个人原因，支付宝账号填写错误，造成的损失将由个人承担</p>
                    <p>2.提现申请将在<span class="redfont">24小时</span>内到账；如遇高峰期或节假日，可能延迟到账，请耐心等待。</p>
                    <p>3.每次提现将会收取2%的手续费，最低2元起</p>
                </div>
                <div class="item">
                    <span class="left-span">&nbsp;</span>
                    <button class="save-btn" @click="toCash">立即提现</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let utils = require('../../utils/common')
export default {
  data () {
    return {
      currentMoney: 0,
      upRangeMoney: 0,
      toCashMoney: 0,
      iptMoney: '',
      zhifubao: '',
      czhifubao: ''
    }
  },
  created () {
    this.currentMoney = this.$route.query.accountBalance
    this.getData()
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    getData () {
      this.$axiosPost('/back/agentWithdrawLimitBalance', '').then((res) => {
        if (res.code === 0) {
          this.upRangeMoney = res.data.dayUpperLimitMny
          this.toCashMoney = this.calc.sub(res.data.dayUpperLimitMny, res.data.dayHasWithdrawMny)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    toCash () {
      if (!utils.checkNull(this.iptMoney)) {
        this.$message('提现金额不能为空')
        return
      }
      if (!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.iptMoney))) {
        this.$message('提现金额必须为正数，且小数点后，最多2位小数')
        return
      }
      if (parseFloat(this.iptMoney) >= 50) {
        this.$message('提现金额必须大于等于50')
        return
      }
      if (!utils.checkNull(this.zhifubao)) {
        this.$message('支付宝号不能为空')
        return
      }
      if (!(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this.zhifubao)) && !(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.zhifubao))) {
        this.$message('请输入正确支付宝号')
        return
      }
      if (!utils.checkNull(this.czhifubao)) {
        this.$message('请再次输入支付宝号')
        return
      }
      if (this.zhifubao !== this.czhifubao) {
        this.$message('两次输入的支付宝账号不一致')
        return
      }
      let json = {
        alipay: this.zhifubao,
        sureAlipay: this.czhifubao,
        withdrawNum: parseFloat(this.iptMoney)
      }
      this.$axiosPost('/back/agentWithdrawApply', json).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.back(-1)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style>
.cash-description {
    width: 500px;
    margin: 0 auto;
    background: #eeeeee;
    border-radius: 10px;
    padding: 30px;
    font-size: 12px;
    line-height: 25px;
}
</style>
