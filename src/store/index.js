import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isWX: false
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user
  },
  strict: debug
})
