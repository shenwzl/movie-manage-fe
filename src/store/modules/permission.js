import {
  getRoles,
  getAllRoles,
  createRole,
  getPermissions,
  getAllPermissions,
  createPermission,
  updatePermission
} from '@/api/permission'

const state = {
  roles: [],
  permissions: [],
  allPermissions: [],
  allRoles: []
}

const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ALLROLES: (state, roles) => {
    state.allRoles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_ALLPERMISSIONS: (state, permissions) => {
    state.allPermissions = permissions
  }
}

const actions = {
  getRoles({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getRoles({ page, page_size: pageSize }).then(res => {
        commit('SET_ROLES', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllRoles({ commit }) {
    return new Promise((resolve, reject) => {
      getAllRoles().then(res => {
        commit('SET_ALLROLES', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  addRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      createRole(role).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updatePermission({ commit }, data) {
    return new Promise((resolve, reject) => {
      updatePermission(data.checkedPermissions, data.id).then(res => {
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
        commit('SET_PERMISSIONS', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      getAllPermissions().then(res => {
        commit('SET_ALLPERMISSIONS', res.data)
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

