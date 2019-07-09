import { getAllUser, getRoleByUser, updateRole, createUser, resetPwd, deleteUser, recoverUser } from '@/api/users'

const state = {
  users: [],
  userTotal: 0
}

const mutations = {
  SET_USERS: (state, data) => {
    state.users = data.data
    state.userTotal = data.total
  }
}

const actions = {
  // 分页获取用户
  getAllUser({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getAllUser({ page, page_size: pageSize }).then(res => {
        commit('SET_USERS', res.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getRoleByUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getRoleByUser(userId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateRole({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateRole(data.role, data.id).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 创建新用户
  addUser({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      createUser({ email, password }).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  resetPwd({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      resetPwd({ password: userInfo.password }, userInfo.userId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      deleteUser(userId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  recoverUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      recoverUser(userId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
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

