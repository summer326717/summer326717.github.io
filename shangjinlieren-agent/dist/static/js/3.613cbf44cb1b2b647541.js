webpackJsonp([3],{P2Nb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:function(){return{agentId:"",mobile:"",name:"",pageNo:1,pageSize:10,sortType:2,totalPages:1,resultList:[]}},components:{pagenation:a("CZMH").a},created:function(){this.getData()},methods:{getData:function(){var t=this;if(this.mobile&&!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile))return this.$message("请输入正确手机号"),!1;var e={pageNo:this.pageNo,pageSize:this.pageSize,agentId:this.agentId,mobile:this.mobile,name:this.name,allData:"N",sortType:this.sortType};this.$axiosPost("/back/demo",e).then(function(e){0===e.code?(t.resultList=e.data.resultList,t.totalPages=e.data.pageTotal):(t.resultList=[],t.totalPages=1)})},addAgent:function(){this.$router.push({path:"/CustomerDetail",query:{type:1}})},getPage:function(t){this.pageNo=t,this.getData()},changePageSize:function(t){this.pageNo=1,this.pageSize=t,this.getData()},changeSort:function(t){this.sortType=t,this.getData()},reloadAgent:function(){this.pageNo=1,this.pageSize=10,this.sortType=0,this.mobile="",this.name="",this.mobile="",this.getData()}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"manage-content"},[s("div",{staticClass:"m-header"},[s("p",[s("span",[t._v("我的客户")]),s("button",{staticClass:"btn-gray",on:{click:function(e){t.reloadAgent()}}},[t._v("刷新")])])]),t._v(" "),s("div",{staticClass:"m-limit"},[s("div",{staticClass:"m-title"},[s("span",[t._v("筛选条件")]),t._v(" "),s("button",{staticClass:"btn-normal",on:{click:function(e){t.addAgent()}}},[t._v("添加")]),t._v(" "),s("button",{staticClass:"btn-normal",on:{click:function(e){t.getData()}}},[t._v("查询")])]),t._v(" "),s("div",{staticClass:"ptb20"},[s("span",[t._v("姓名：")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"ipt-normal",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),s("span",[t._v("手机号码：")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.mobile,expression:"mobile"}],staticClass:"ipt-normal",attrs:{type:"text"},domProps:{value:t.mobile},on:{input:function(e){e.target.composing||(t.mobile=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"m-table"},[s("div",{staticClass:"m-title"},[s("span",[t._v("数据列表")]),t._v(" "),s("span",{staticClass:"drop-menu right"},[s("el-dropdown",{attrs:{trigger:"click"},on:{command:t.changeSort}},[s("span",{staticClass:"el-dropdown-link"},[t._v("\n                        排序方式"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"1"}},[t._v("正序")]),t._v(" "),s("el-dropdown-item",{attrs:{command:"2"}},[t._v("倒叙")])],1)],1)],1),t._v(" "),s("span",{staticClass:"drop-menu right"},[s("el-dropdown",{attrs:{trigger:"click"},on:{command:t.changePageSize}},[s("span",{staticClass:"el-dropdown-link"},[t._v("\n                        显示条数"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"10"}},[t._v("10条")]),t._v(" "),s("el-dropdown-item",{attrs:{command:"20"}},[t._v("20条")])],1)],1)],1)]),t._v(" "),s("div",{staticClass:"m-t-content"},[s("table",[t._m(0),t._v(" "),t._l(t.resultList,function(e,a){return s("tr",{key:a},[s("td",[t._v(t._s(e.agentId))]),t._v(" "),s("td",[t._v(t._s(e.name)),2==e.sex?s("i",{staticClass:"female"}):t._e(),1==e.sex?s("i",{staticClass:"male"}):t._e()]),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td"),t._v(" "),s("td",[s("router-link",{staticClass:"edit-btn",attrs:{to:{path:"/CustomerDetail",query:{type:3,userBaseId:e.userBaseId}}}},[t._v("修改")])],1)])})],2),t._v(" "),0==t.resultList.length?s("div",{staticClass:"no-data"},[s("img",{attrs:{src:a("P7fI")}})]):t._e(),t._v(" "),t.resultList.length>0?s("pagenation",{attrs:{cur:t.pageNo,all:t.totalPages},on:{getpage:t.getPage}}):t._e()],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("用户ID")]),t._v(" "),a("th",[t._v("姓名")]),t._v(" "),a("th",[t._v("手机号码")]),t._v(" "),a("th",[t._v("账户余额（元）")]),t._v(" "),a("th",[t._v("分润收益（元）")]),t._v(" "),a("th",[t._v("上次登录时间")]),t._v(" "),a("th",[t._v("启用状态")]),t._v(" "),a("th",[t._v("操作")])])}]},i=a("vSla")(s,n,!1,null,null,null);e.default=i.exports}});
//# sourceMappingURL=3.613cbf44cb1b2b647541.js.map