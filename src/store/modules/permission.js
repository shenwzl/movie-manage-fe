import { getRoles, createRole, getPermissions, createPermission } from '@/api/permission'

const state = {
  roles: [],
  permissions: [],
  userTotal: 0
}

const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles
    // state.userTotal = data.total
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  getRoles({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getRoles({ page, page_size: pageSize }).then(res => {
        commit('SET_ROLES', res.data.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  addRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      createRole(role).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getPermissions({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getPermissions({ page, page_size: pageSize }).then(res => {
        commit('SET_ROLES', res.data.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 创建新用户
  addPermission({ commit }, role) {
    return new Promise((resolve, reject) => {
      createPermission(role).then(res => {
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

