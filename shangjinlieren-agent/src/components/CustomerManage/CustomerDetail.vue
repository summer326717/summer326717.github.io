<template>
    <div class="manage-content">
        <div class="m-header">
            <p>
              <span v-if='type==1'>代理人管理 > 添加客户</span>
              <span v-if='type==2'>代理人管理 > 查看客户</span>
              <span v-if='type==3'>代理人管理 > 修改客户</span>
              <button class="btn-gray" @click="back()">返回</button></p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="detail-content" v-if='type==1||type==3'>
                <div class="item">
                    <span class="left-span">*账户</span>
                    <input class="ipt-normal" type="text" v-model="account" placeholder="请输入账户">
                </div>
                <div class="item">
                    <span class="left-span">*姓名</span>
                    <input class="ipt-normal" type="text" v-model="name" placeholder="请输入姓名">
                </div>
                <div class="item">
                    <span class="left-span">*手机号码</span>
                    <input class="ipt-normal" type="text" placeholder="请输入手机号码" v-model="mobile">
                </div>
                <div class="item">
                    <span class="left-span">*性别</span>
                    <el-radio v-model="sex" label="1">男</el-radio>
                    <el-radio v-model="sex" label="2">女</el-radio>
                </div>
                <div class="item">
                    <span class="left-span">&nbsp;</span>
                    <button class="save-btn" @click="SaveAgent">保存</button>
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
      account: '',
      name: '',
      mobile: '',
      sex: '1',
      type: 1, // 1.添加2.查看3.修改
      userDetail: '',
      agentId: ''
    }
  },
  created () {
    this.type = this.$route.query.type
    this.agentId = localStorage.getItem('agentId')
    this.userBaseId = this.$route.query.userBaseId
    if (this.type === 2 || this.type === 3) {
      this.ViewUserInfo(this.userBaseId)
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    checkAgent () {
      if (!utils.checkNull(this.account)) {
        this.$message('账号不能为空')
        return false
      }
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(this.account)) {
        this.$message('账号必须为大于4个字符，小于16个字符的数字和字母')
        return
      }
      if (!utils.checkNull(this.name)) {
        this.$message('姓名不能为空')
        return false
      }
      if (this.name.length < 2) {
        this.$message('姓名不能小于两个字')
        return false
      }
      if (this.name.length > 50) {
        this.$message('姓名不能大于50个字')
        return false
      }
      if (!utils.checkNull(this.mobile)) {
        this.$message('手机号码不能为空')
        return false
      }
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile)) {
        this.$message('请输入正确手机号')
        return false
      }
      return true
    },
    addAgent () {
      if (!this.checkAgent()) {
        return
      }
      let json = {
        agentId: this.agentId,
        account: this.account,
        nickName: this.name,
        mobile: this.mobile,
        sex: this.sex // 0保密1男2女，默认保密
      }
      this.$axiosPost('/back/saveUserInfoByAgent', json).then((res) => {
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
    },
    SaveAgent () {
      if (this.type === 1) {
        this.addAgent()
      }
      if (this.type === 3) {
        this.EditUserInfo()
      }
    },
    ViewUserInfo (userId) {
      let json = {
        userId: userId
      }
      this.$axiosPost('/back/queryUserInfoDetail', json).then((res) => {
        if (res.code === 0) {
          this.userDetail = res.data
          this.account = res.data.account
          this.sex = res.data.sex.toString()
          this.mobile = res.data.mobile
          this.idNumber = res.data.idNumber
          this.name = res.data.nickName
        } else {
          this.$message(res.message)
        }
      })
    },
    EditUserInfo () {
      if (!this.checkAgent()) {
        return
      }
      let json = {
        agentId: this.agentId,
        userBaseId: this.userBaseId,
        account: this.account,
        nickName: this.name,
        mobile: this.mobile,
        sex: this.sex // 0保密1男2女，默认保密
      }
      this.$axiosPost('/back/updateUserInfoByAgent', json).then((res) => {
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
