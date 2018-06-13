import Vue from 'vue'
import vuex from 'vuex'
import mmp from './mmp'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    addnum (state) {
      state.count++
    },
    decnum (state) {
      state.count--
    }
  },
  modules: {mmp}
})
