webpackJsonp([2],{"7To+":function(e,n){},Swj8:function(e,n){},lO7g:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var m={name:"",data:function(){return{menuList:[{menuName:"组件规范",menuItem:[{menuName:"DemoPage",menuLink:"/DemoPage"},{menuName:"HomePage",menuLink:"/HomePage"},{menuName:"HomePage",menuLink:"/HomePage"},{menuName:"HomePage",menuLink:"/HomePage"},{menuName:"HomePage",menuLink:"/HomePage"},{menuName:"HomePage",menuLink:"/HomePage"}]},{menuName:"用户管理",menuItem:[{menuName:"UserManage",menuLink:"/UserManage"}]},{menuName:"代理人管理",menuItem:[{menuName:"AgentManage",menuLink:"/AgentManage"}]},{menuName:"财务管理",menuItem:[{menuName:"FinanceManage",menuLink:"/FinanceManage"}]},{menuName:"系统管理",menuItem:[{menuName:"SystemManage",menuLink:"/SystemManage"}]}]}},mounted:function(){var e=document.getElementsByClassName("router-link-active")[0];if(e){var n=e.parentElement.children[0].clientHeight,t=e.parentElement.childElementCount;e.parentElement.style.height=n*t+"px",e.parentNode.previousElementSibling.children[0].style.transform="rotate(-180deg)"}},methods:{openMenu:function(e,n){if(n>0){var t=document.getElementsByClassName("second-menu")[e].children[0].clientHeight,m=document.getElementsByClassName("second-menu")[e].children.length;0==document.getElementsByClassName("second-menu")[e].clientHeight?(document.getElementsByClassName("i-arrow")[e].style.transform="rotate(-180deg)",document.getElementsByClassName("second-menu")[e].style.height=t*m+"px"):(document.getElementsByClassName("i-arrow")[e].style.transform="",document.getElementsByClassName("second-menu")[e].style.height="0px")}else console.log("没有二级菜单")}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}}},a={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"left-menu"},[t("p",{staticClass:"menu-title"},[e._v("Delicious")]),e._v(" "),t("ul",e._l(e.menuList,function(n,m){return t("li",{key:m},[t("a",{on:{click:function(t){e.openMenu(m,n.menuItem.length)}}},[e._v(e._s(n.menuName)),n.menuItem.length>0?t("i",{staticClass:"i-arrow"}):e._e()]),e._v(" "),t("div",{staticClass:"second-menu"},e._l(n.menuItem,function(n,m){return t("router-link",{key:m,attrs:{to:n.menuLink}},[e._v(e._s(n.menuName))])}))])}))])},staticRenderFns:[]};var s={name:"Home",data:function(){return{}},components:{leftmenu:t("VU/8")(m,a,!1,function(e){t("Swj8")},null,null).exports},methods:{}},u={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"right-container"},[n("leftmenu"),this._v(" "),this._m(0),this._v(" "),n("div",{staticClass:"bottom-container"},[n("router-view")],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"top-menu"},[n("span",{staticClass:"login-name"},[this._v("张阿三")]),this._v(" "),n("button",{staticClass:"y-info-button"},[this._v("退出")])])}]};var i=t("VU/8")(s,u,!1,function(e){t("7To+")},"data-v-4cdfaaa0",null);n.default=i.exports}});
//# sourceMappingURL=2.e932c135eb1d1ea7327e.js.map