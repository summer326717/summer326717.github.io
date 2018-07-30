webpackJsonp([6],{D0qj:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("3cXf"),i=s.n(a),n=s("X2Oc"),o=s("X2Oc"),l={data:function(){return{account:"",name:"",mobile:"",sex:"1",idNumber:"",type:1,userDetail:"",agentId:""}},created:function(){this.type=this.$route.query.type,this.agentId=this.$route.query.agentId,2!==this.type&&3!==this.type||this.ViewUserInfo(this.agentId)},methods:{back:function(){this.$router.back(-1)},checkAgent:function(){return o.checkNull(this.account)?/^[a-zA-Z0-9_-]{4,16}$/.test(this.account)?o.checkNull(this.name)?this.name.length<2?(this.$message("姓名不能小于两个字"),!1):this.name.length>50?(this.$message("姓名不能大于50个字"),!1):o.checkNull(this.mobile)?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile)?o.checkNull(this.idNumber)?!!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idNumber)||(this.$message("请输入正确的身份证号码"),!1):(this.$message("身份证号不能为空"),!1):(this.$message("请输入正确手机号"),!1):(this.$message("手机号码不能为空"),!1):(this.$message("姓名不能为空"),!1):void this.$message("账号必须为大于4个字符，小于16个字符的数字和字母"):(this.$message("账号不能为空"),!1)},addAgent:function(){var e=this;if(this.checkAgent()){var t={account:this.account,name:this.name,mobile:this.mobile,sex:this.sex,idNumber:this.idNumber};this.$axiosPost("/back/saveAgentInfo",t).then(function(t){0===t.code?e.queryList():e.$message.error(t.message)})}},queryList:function(){var e=this;Object(n.getAgentList)().then(function(t){if(t.data){var s=[];t.data.resultList.map(function(e,t){s.push({value:e.name,name:e.agentId})}),sessionStorage.setItem("agentList",i()(s)),e.$message({message:t.message,type:"success"}),e.$router.back(-1)}else e.$message(t.message)})},SaveAgent:function(){1===this.type&&this.addAgent(),3===this.type&&this.EditUserInfo()},ViewUserInfo:function(e){var t=this,s={agentId:e};this.$axiosPost("/back/queryAgentInfoDetail",s).then(function(e){0===e.code?(t.userDetail=e.data,t.account=e.data.account,t.sex=e.data.sex.toString(),t.mobile=e.data.mobile,t.idNumber=e.data.idNumber,t.name=e.data.name):t.$message(e.message)})},EditUserInfo:function(){var e=this;if(this.checkAgent()){var t={agentId:this.agentId,account:this.account,name:this.name,mobile:this.mobile,sex:this.sex,idNumber:this.idNumber};this.$axiosPost("/back/updateAgentInfo",t).then(function(t){0===t.code?e.queryList():e.$message.error(t.message)})}},uploadImg:function(){document.getElementById("tea_cate_img").click()},uploadMethod:function(){var e=document.getElementById("tea_cate_img").files,t=new FormData;t.append("file",e[0]);this.$axios.post("/fileUploadSave",t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"manage-content"},[s("div",{staticClass:"m-header"},[s("p",[1==e.type?s("span",[e._v("代理人管理 > 添加代理人")]):e._e(),e._v(" "),2==e.type?s("span",[e._v("代理人管理 > 查看代理人")]):e._e(),e._v(" "),3==e.type?s("span",[e._v("代理人管理 > 修改代理人")]):e._e(),e._v(" "),s("button",{staticClass:"btn-gray",on:{click:function(t){e.back()}}},[e._v("返回")])])]),e._v(" "),s("div",{staticClass:"manage-detail"},[e._m(0),e._v(" "),1==e.type||3==e.type?s("div",{staticClass:"detail-content"},[s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*账户")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.account,expression:"account"}],staticClass:"ipt-normal",attrs:{type:"text",placeholder:"请输入账户"},domProps:{value:e.account},on:{input:function(t){t.target.composing||(e.account=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*姓名")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"ipt-normal",attrs:{type:"text",placeholder:"请输入姓名"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*手机号码")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"ipt-normal",attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*性别")]),e._v(" "),s("el-radio",{attrs:{label:"1"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[e._v("男")]),e._v(" "),s("el-radio",{attrs:{label:"2"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[e._v("女")])],1),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*身份证号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"ipt-normal",attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*分润（%）")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"ipt-normal",attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v("*开设代理权限")]),e._v(" "),s("el-radio",{attrs:{label:"1"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[e._v("不开通")]),e._v(" "),s("el-radio",{attrs:{label:"2"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[e._v("开通")])],1),e._v(" "),s("div",{staticClass:"item"},[s("span",{staticClass:"left-span"},[e._v(" ")]),e._v(" "),s("button",{staticClass:"save-btn",on:{click:e.SaveAgent}},[e._v("保存")])])]):e._e()])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info-title"},[t("span",[this._v("基本信息")])])}]},m=s("vSla")(l,c,!1,null,null,null);t.default=m.exports}});
//# sourceMappingURL=6.0003c55a1e827a441a61.js.map