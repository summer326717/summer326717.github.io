<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body,
p {
  margin: 0;
}
input,
button,
td,
th {
  padding: 0;
}
html,
body,
#app,
.denglu {
  height: 100%;
}
input {
  border: none;
  outline: none;
}
button {
  border: none;
  outline: none;
}
html,
button {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
::selection {
  color: #ffffff;
  background: #a9abcc;
}
 /*自定义滚动条*/
::-webkit-scrollbar{
  width:5px;
  height:16px;
  border-radius:5px;
  background-color:#ffffff
}/*原始通道及滑条*/ 
::-webkit-scrollbar-track{
  border-radius:5px;
  background-color:#ffffff
}
::-webkit-scrollbar-thumb{
  border-radius:5px;
  -webkit-box-shadow:inset 0 0 5px rgba(238,240,247,0);
  background-color:#dcdee6
}
.hide{
  visibility: hidden;
}
.y-info-button,.y-normal-button,.y-warn-button {
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease-in-out;
}
.y-info-button {
    color: #dadae8;
    background: #555a79;
}
.y-info-button:hover {
    background: #484d69;
    box-shadow: 0 0 10px #484d69;
}
.y-normal-button {
    background: #dbdef1;
}
.y-normal-button:hover {
    background: #dbdef1;
    box-shadow: 0 0 10px #484d69;
}
.y-warn-button {
    color: #ffffff;
    background: #D9534F;
}
.y-warn-button:hover {
    background: #c9302c;
    box-shadow: 0 0 10px #c9302c;
}
</style>
