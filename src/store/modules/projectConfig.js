import {
  getFeeCategories,
  getContracts,
  getProviders,
  getStaffs,
  getMemberTypes,
  getProjectState
} from '@/api/projectConfig'

const state = {
  feeCategories: [],
  contractSubjects: [],
  allProviders: [],
  allStaffs: [],
  memberTypes: [],
  projectState: []
}

const mutations = {
  SET_FEECATEGORIES: (state, categories) => {
    state.feeCategories = categories
  },
  SET_CONTRACTS: (state, contracts) => {
    state.contractSubjects = contracts
  },
  SET_PROVIDERS: (state, providers) => {
    state.allProviders = providers
  },
  SET_STAFFS: (state, staffs) => {
    console.log(staffs, '123')
    state.allStaffs = staffs
  },
  SET_MEMBERTYPES: (state, memberTypes) => {
    state.memberTypes = memberTypes
  },
  SET_PROJECTSTATE: (state, projectState) => {
    state.projectState = projectState
  }
}

const actions = {
  getFeeCategories({ commit }, data) {
    return new Promise((resolve, reject) => {
      getFeeCategories(data).then(res => {
        commit('SET_FEECATEGORIES', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getContractSubjects({ commit }, data) {
    return new Promise((resolve, reject) => {
      getContracts(data).then(res => {
        commit('SET_CONTRACTS', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllProviders({ commit }, data) {
    return new Promise((resolve, reject) => {
      getProviders(data).then(res => {
        commit('SET_PROVIDERS', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllStaffs({ commit }, data) {
    return new Promise((resolve, reject) => {
      getStaffs(data).then(res => {
        commit('SET_STAFFS', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getMemberTypes({ commit }, data) {
    return new Promise((resolve, reject) => {
      getMemberTypes(data).then(res => {
        commit('SET_MEMBERTYPES', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getProjectState({ commit }, data) {
    return new Promise((resolve, reject) => {
      getProjectState(data).then(res => {
        commit('SET_PROJECTSTATE', res.data)
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

