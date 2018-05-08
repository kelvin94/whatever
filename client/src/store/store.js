import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex) // use Vuex allows vue instance to have access to components

export default new Vuex.Store({
  strict: true, // strict: true enforces state mutations to be done via actions
  plugins: [createPersistedState()],
  state: {
    user: null,
    token: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    logOut (state) {
      state.user = null
      state.token = null
      state.isUserLoggedIn = false
    }
  },
  actions: {
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setUser (context, user) {
      context.commit('setUser', user)
    },
    logout (context) {
      context.commit('logOut')
    }
  }
})
