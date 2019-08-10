import {
  getProjects,
  saveProjects,
  getBaseInfo,
  saveBaseInfo,
  getShootingInfo,
  saveShootingInfo,
  getLastStateInfo,
  saveLastStateInfo,
  deleteProject,
  recoverProject,
  searchProject,
  exportProject,
  updateState
} from '@/api/project'

const state = {
  projects: []
}

const mutations = {
  SET_PROJECTS: (state, projects) => {
    state.projects = projects
  }
}

const actions = {
  getAllProjects({ commit }, pageConfig) {
    return new Promise((resolve, reject) => {
      getProjects(pageConfig).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getProjects({ commit }, pageConfig) {
    return new Promise((resolve, reject) => {
      getProjects(pageConfig).then(res => {
        commit('SET_PROJECTS', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  saveProjects({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveProjects(data).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteProject({ commit }, pId) {
    return new Promise((resolve, reject) => {
      deleteProject(pId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  recoverProject({ commit }, pId) {
    return new Promise((resolve, reject) => {
      recoverProject(pId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getBaseInfo({ commit }, pId) {
    return new Promise((resolve, reject) => {
      getBaseInfo(pId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  saveBaseInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveBaseInfo(data.baseInfo, data.pId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getShootingInfo({ commit }, pId) {
    return new Promise((resolve, reject) => {
      getShootingInfo(pId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  saveShootingInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveShootingInfo(data.shootingInfo, data.pId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getLastStateInfo({ commit }, pId) {
    return new Promise((resolve, reject) => {
      getLastStateInfo(pId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  saveLastStateInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveLastStateInfo(data.lastStateInfo, data.pId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  searchProject({ commit }, data) {
    return new Promise((resolve, reject) => {
      searchProject(data).then(res => {
        commit('SET_TOTAL', res.data.total)
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateState({ commit }, stateInfo) {
    console.log(stateInfo)
    return new Promise((resolve, reject) => {
      updateState({ state: stateInfo.newState }, stateInfo.id).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  exportProject({ commit }, data) {
    return new Promise((resolve, reject) => {
      exportProject(data).then(res => {
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

