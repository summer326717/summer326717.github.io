webpackJsonp([9],{"3SGZ":function(e,t,n){"use strict";t.a=function(e,t){var n=this;return console.log(t),new r.a(function(a,o){i.a.get(e,{params:t}).then(function(e){console.log(e.data),9999===e.data.code&&n.$message.error(e.data.message),-1e7===e.data.code&&n.$message.error(e.data.message),100===e.data.code&&n.$router.push({path:"Login"}),501===e.data.code&&n.$message.error(e.data.message+"，请将电脑系统时间设置正确。"),a(e.data)}).catch(function(e){console.log(e),console.log(e.message),o(e)})})},t.b=function(e,t){var n=this;return console.log(t),new r.a(function(a,o){i.a.post(e,t).then(function(e){9999===e.data.code&&n.$message.error(e.data.message),-1e7===e.data.code&&n.$message.error(e.data.message),100===e.data.code&&n.$router.push({path:"Login"}),501===e.data.code&&n.$message.error(e.data.message+"，请将电脑系统时间设置正确。"),console.log(e.data),a(e.data)},function(e){console.log(e),console.log(e.message),n.$message.error("接口出错，请稍后再试")})})};var a,o=n("rVsN"),r=n.n(o),s=n("3cXf"),c=n.n(s),u=n("aozt"),i=n.n(u),l=n("Axgm"),p=(n.n(l),this),g=n("UWKP");i.a.defaults.timeout=5e3,i.a.defaults.baseURL="/advertisement/api/1",i.a.interceptors.request.use(function(e){a=l.Loading.service({lock:!0,text:"加载中...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.4)"});var t=localStorage.getItem("token"),n=sessionStorage.getItem("token");t||(t=""),n&&(t=n);var o=Date.parse(new Date),r=g(o+"IronMan");return e.data=c()(e.data),e.headers={"Access-Control-Allow-Origin":"*",Timestamp:o,SignInfo:r,"Content-Type":"application/json;charset=UTF-8",token:t},e},function(e){return r.a.reject(e)}),i.a.interceptors.response.use(function(e){return a.close(),2===e.data.errCode&&p.$message.error("错误"),404===e.status&&p.$message.error("服务出错，请稍后再试"),304===e.status&&p.$message.error("系统故障，请反馈给客服"),400===e.status&&p.$message.error("服务不稳定，请稍后再试"),500===e.status&&p.$message.error("接口超时，请稍后再试"),e},function(e){return a.close(),r.a.reject(e)})},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("3cXf"),o=n.n(a),r=n("MVMM"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var c=n("vSla")({name:"App"},s,!1,function(e){n("kub5")},null,null).exports,u=n("zO6J");r.default.use(u.a);var i=new u.a({routes:[{path:"*",name:"Login",component:function(e){return n.e(2).then(function(){var t=[n("xJsL")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/MenuCommon/:id",name:"MenuCommon",component:function(e){return n.e(1).then(function(){var t=[n("7/CI")];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"/MyAgent",name:"MyAgent",component:function(e){return Promise.all([n.e(0),n.e(5)]).then(function(){var t=[n("8uXg")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/MyCustomer",name:"MyCustomer",component:function(e){return Promise.all([n.e(0),n.e(3)]).then(function(){var t=[n("P2Nb")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/MyAccount",name:"MyAccount",component:function(e){return Promise.all([n.e(0),n.e(7)]).then(function(){var t=[n("+g+S")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/CustomerDetail",name:"CustomerDetail",component:function(e){return n.e(4).then(function(){var t=[n("HDCd")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/AgentDetail",name:"AgentDetail",component:function(e){return n.e(6).then(function(){var t=[n("D0qj")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}]}),l=n("aozt"),p=n.n(l),g=n("3SGZ"),d=n("X2Oc"),f=n("Axgm"),m=n.n(f),h=(n("dRIH"),n("E4C3")),v=n.n(h);n("ve9D");r.default.prototype.$axiosGet=g.a,r.default.prototype.$axiosPost=g.b,r.default.prototype.$axios=p.a,r.default.prototype.$changeTime=d.changeTime,r.default.config.productionTip=!1,i.afterEach(function(e,t,n){"/Login"!==e.path&&"/"!==e.path&&(sessionStorage.getItem("agentList")||Object(d.getAgentList)().then(function(e){if(e.data){var t=[];e.data.resultList.map(function(e,n){t.push({value:e.name,name:e.agentId})}),sessionStorage.setItem("agentList",o()(t))}}))}),v.a.configure({showSpinner:!0}),i.beforeEach(function(e,t,n){v.a.start(),n()}),i.afterEach(function(e){v.a.done()}),r.default.use(m.a),new r.default({el:"#app",router:i,components:{App:c},template:"<App/>"})},X2Oc:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkNull=function(e){return""!==e&&null!==e&&void 0!==e&&0!==e.toString().trim().length},t.getAgentList=function(){return new o.a(function(e,t){Object(r.b)("/back/queryAgentInfoList",{allData:"Y",agentId:null,mobile:null,name:null,pageNo:null,pageSize:null,sortType:null}).then(function(t){e(t)}).catch(function(e){t(e)})})},t.changeTime=function(e){var t=new Date(e);return t.getFullYear()+"-"+s(t.getMonth()+1)+"-"+s(t.getDate())+" "+s(t.getHours())+":"+s(t.getMinutes())+":"+s(t.getSeconds())},t.checkT=s;var a=n("rVsN"),o=n.n(a),r=n("3SGZ");function s(e){return e>9?e:"0"+e}},dRIH:function(e,t){},kub5:function(e,t){},ve9D:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.301fa1e677daa4a1de0e.js.map