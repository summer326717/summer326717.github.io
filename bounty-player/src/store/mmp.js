import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    count: 0,
    mmp: 0
  },
  mutations: {
    addnum (state) {
      state.count++
      state.mmp++
    },
    decnum (state) {
      state.count--
    }
  }
})
