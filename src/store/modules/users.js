import { getAllUser, createUser } from '@/api/users'

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
        commit('SET_USERS', res)
        resolve()
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
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}

