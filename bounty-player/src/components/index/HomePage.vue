<template>
  <div>
    {{$store.state.count}}
    <button @click="$store.commit('addnum')">+</button>
    <div>
      <ul>
        <li><router-link to='/TaskList'>悬赏任务</router-link></li>
        <li><router-link to='/Teach'>新手教学</router-link></li>
        <li><router-link to='/Advertising'>广告招商</router-link></li>
        <li><router-link to='/Question'>常见问题</router-link></li>
        <li><router-link to='/About'>关于我们</router-link></li>
      </ul>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
