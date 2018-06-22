<template>
  <form action="">
    <div class="y-input">
      <input v-model="username" :required='required' type="text" :placeholder="emptyText" >
    </div>
    <button type="button" @click="submit">提交</button>
  </form>
</template>

<script>
import validateReg from '../../assets/utils/validateReg'
export default {
  data() {
    return {
      rules: {'required': true, emptyText: "请输入手机号11", vType: "tel", errorText: '手机号有误'},
      username: '',
      emptyText: '',
      vType: '',
      required: false,
      errorText: ''
    }
  },
  props: {
    //rules: Array
  },
  created() {
    this.emptyText = this.rules.emptyText;
    this.vType = this.rules.vType;
    this.required = this.rules.required;
    this.errorText = this.rules.errorText;
  },
  methods: {
    submit() {
      if (validateReg(this.vType,this.username,this.emptyText,this.errorText)) {
        console.log('请输入用户名');
        return;
      }
    }
  }
}
</script>

<style>
.y-input{
  width: 100%;
  height: 40px;
}
.y-input input{
  width: calc(100% - 15px);
  border: 1px solid #dedede;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  padding-left: 15px;
}
</style>
