import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import users from './modules/users'
import config from './modules/config'
import permission from './modules/permission'
import projectConfig from './modules/projectConfig'
import project from './modules/project'
import log from './modules/log'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    total: 0
  },
  mutations: {
    SET_TOTAL: (state, total) => {
      state.total = total
    },
    SET_PERMISSION: (state, permission) => {
      state.rolePermissions = permission
    }
  },
  modules: {
    app,
    settings,
    user,
    users,
    config,
    permission,
    projectConfig,
    project,
    log
  },
  getters
})

export default store
