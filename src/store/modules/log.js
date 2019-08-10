import { getLogs } from '@/api/log'

const state = {
  logs: []
}

const mutations = {
  SET_LOGS: (state, logs) => {
    state.logs = logs
  }
}

const actions = {
  getLogs({ commit }, params) {
    return new Promise((resolve, reject) => {
      getLogs(params).then(res => {
        commit('SET_LOGS', res.data.data)
        commit('SET_TOTAL', res.data.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}

