import { login, logout, resetPwd } from '@/api/user'
import { getToken, setToken, removeToken, setPermission, removePermission, setName } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        const { data } = response
        console.log(response)
        commit('SET_TOKEN', data.authCode)
        commit('SET_PERMISSION', data.permissions, { root: true })
        setToken(data.authCode)
        setPermission(data.permissions.join(','))
        setName(data.name)
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        removePermission()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetPwd({ commit }, data) {
    return new Promise((resolve, reject) => {
      resetPwd(data).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

