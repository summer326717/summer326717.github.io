<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, #app, .container, .right-content {
  height: 100%;
}
body,p,ul {
  margin: 0;
}
ul,button {
  padding: 0;
}
li {
  list-style: none;
}
a{
  text-decoration: none;
}
input {
  padding: 0;
}
input,button {
    outline: none;
    border: none;
}
.manage-content {
    min-height: calc(100% - 50px);
}
.el-dropdown-menu {
    max-height: 400px;
    overflow-y: scroll;
}
.el-input__inner {
    background: #F7F7F7;
}
/*.el-input--suffix .el-input__inner {
    padding-left: 10px;
}*/
.el-input.is-active .el-input__inner, .el-input__inner:focus {
    border: 1px solid #F1CE02;
}
/* 自定义滚动条 */
::-webkit-scrollbar{
  width:5px;
  height:16px;
  border-radius:5px;
  background-color:#ffffff
}
/* 原始通道及滑条 */
::-webkit-scrollbar-track{
  border-radius:5px;
  background-color:#ffffff
}
::-webkit-scrollbar-thumb{
  border-radius:5px;
  -webkit-box-shadow:inset 0 0 5px rgba(238,240,247,0);
  background-color:#dcdee6
}
.textEll{
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;/*定义行数*/
    -webkit-box-orient: vertical;
}
.tc {
    text-align: center;
}
.pt40 {
    padding-top: 40px;
}
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.hide {
  display: none;
}
.no-data {
    padding: 10% 0;
    text-align: center;
}
.right {
    float: right;
}
.female {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: bottom;
    padding-left: 10px;
    background: url('./assets/img-02.png') no-repeat 100% 50%;
}
.male {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: bottom;
    padding-left: 10px;
    background: url('./assets/img-03.png') no-repeat 100% 50%;
}
.switch-btn {
    width: 57px;
    height: 26px;
    border-radius: 26px;
    position: relative;
    border: 1px solid #2ADA4B;
    background: #2ADA4B;
    box-shadow: #BEBEBE 0 0 5px;
}
.switch-btn::after {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    width: 24px;
    height: 24px;
    border:1px solid #BEBEBE;
    background: #fff;
    border-radius: 50%;
}
.switch-btn2 {
    width: 57px;
    height: 27px;
    background: #BEBEBE;
    border-radius: 27px;
    position: relative;
    box-shadow: #BEBEBE 0 0 5px;
}
.switch-btn2::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    background: #ffffff;
    border:1px solid #BEBEBE;
    border-radius: 50%;
}
.manage-content .m-header {
    font-size: 16px;
    padding: 22px 12px;
    background: #F1F1F1;
    border-bottom: 1px solid #E9E9E9;
}
.manage-content .m-header p {
    border-left: 6px solid #F1CE02;
    padding-left: 10px;
}
.manage-content .m-header .btn-gray {
    float: right;
    margin-top: -10px;
}
.manage-content .m-limit {
    margin: 32px 52px 20px 52px;
    background: #F1F1F1;
}
.manage-content .m-limit .btn-normal {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
}
.manage-content .ptb20 {
    padding: 16px 20px;
    border-top: 1px solid #EAEAEA;
}
/* 小标题 */
.manage-content .m-title {
    height: 60px;
    line-height: 60px;
    padding-left: 40px;
    background-color: #F1F1F1;
    background-image: url('./assets/img-01.png');
    background-repeat: no-repeat;
    background-position: 20px 50%;
}
.manage-content .info-title {
    height: 60px;
    line-height: 60px;
    padding-left: 40px;
    margin: 30px 0;
    font-size: 16px;
    background-color: #F1F1F1;
    background-image: url('./assets/img-18.png');
    background-repeat: no-repeat;
    background-position: 20px 50%;
}
/* 下拉框 */
.manage-content .drop-menu {
    width: 170px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    background: #F7F7F7;
    margin-top: 9px;
    margin-right: 50px;
    display: inline-block;
    border: 1px solid #DCDCDC;
}
/* 文本框 */
.manage-content .ipt-normal {
    padding-left: 10px;
    width: 158px;
    height: 38px;
    border: 1px solid #DCDCDC;
    background: #F7F7F7;
    border-radius: 6px;
    margin-right: 50px;
}
.manage-content .ipt-normal:focus {
    border: 1px solid #FFCD69
}
/* 按钮 */
.manage-content .btn-normal {
    width:85px;
    height:40px;
    background:rgba(241,206,2,1);
    border-radius:6px;
    border: 1px solid #DCDCDC;
}
.manage-content .btn-gray {
    width:85px;
    height:40px;
    background: #F7F7F7;
    border-radius:6px;
    border: 1px solid #DCDCDC;
}
.manage-content .view-btn {
    color: #4B4B4B;
    margin-right: 18px;
}
.manage-content .edit-btn {
    color: #F1CE02;
}
.manage-content .m-table {
    margin: 0 52px;
}
.manage-content .m-t-content {
    font-size: 14px;
}
.manage-content .m-t-content table {
    width: 100%;
    border-collapse: collapse;
}
.manage-content .m-t-content table th {
    background: #F1F1F1;
    height: 38px;
    line-height: 39px;
    font-weight: normal;
    border: 1px solid #EAEAEA;
}
.manage-content .m-t-content table td{
    text-align: center;
    padding: 12px 5px; /*18px 5px;*/
    border: 1px solid #EAEAEA;
}
.manage-detail {
    font-size: 14px;
    padding: 0 50px;
}
.manage-detail .ipt-normal, .manage-detail .ipt-small {
    width: 346px;
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    border-radius: 6px;
    background: #ffffff;
    border: 1px solid #EBEBEB;
}
.manage-detail .ipt-normal:focus, .manage-detail .ipt-small:focus {
    border: 1px solid #FFCD69
}
.manage-detail .ipt-small {
    width: 150px;
}
.manage-detail .left-span {
    width: 40%;
    display: inline-block;
    text-align: right;
    padding-right: 15px;
}
.manage-detail .item {
    padding: 14px 0;
}
.manage-detail .detail-content {
    padding: 50px 0;
}
.manage-detail .detail-view .item{
    padding: 8px 0;
}
.manage-detail .range-icon {
    padding: 0 10px;
}
.save-btn {
    width: 220px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    background: #F1CE02;
}
/* 个人合计 */
.ul {
    text-align: center;
    padding: 40px 0;
}
.ul li {
    display: inline-block;
    width: 154px;
    height: 104px;
    line-height: 50px;
    background: #FFD900;
    font-size: 20px;
    font-weight: bold;
    margin: 0 50px;
    padding: 25px 0;
    border: 1px solid #CCCCCC;
}
</style>
