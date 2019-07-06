import {
  getStaffs,
  getProviders,
  getFees,
  addFee,
  addProvider,
  addStaff,
  addContracts,
  getContracts,
  deleteStaff,
  deleteProvider,
  deleteFee,
  deleteContract,
  recoverStaff,
  recoverFee,
  recoverProvider,
  recoverContract
} from '@/api/config'

const state = {
  staffs: [],
  providers: [],
  fees: [],
  contracts: [],
  staffTotal: 0,
  providerTotal: 0,
  feeTotal: 0,
  contractTotal: 0
}

const mutations = {
  SET_STAFFS: (state, staffs) => {
    state.staffs = staffs
  },
  SET_PROVIDERS: (state, providers) => {
    state.providers = providers
  },
  SET_FEES: (state, fees) => {
    console.log(fees)
    state.fees = fees
  },
  SET_CONTRACTS: (state, contracts) => {
    state.contracts = contracts
  }
}

const actions = {
  // 分页获取员工
  getStaffs({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getStaffs({ page, page_size: pageSize }).then(res => {
        console.log(res)
        commit('SET_STAFFS', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteStaff({ commit }, staffId) {
    return new Promise((resolve, reject) => {
      deleteStaff(staffId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  addStaff({ commit }, staff) {
    return new Promise((resolve, reject) => {
      addStaff(staff).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  recoverStaff({ commit }, staffId) {
    return new Promise((resolve, reject) => {
      recoverStaff(staffId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getProviders({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getProviders({ page, page_size: pageSize }).then(res => {
        commit('SET_PROVIDERS', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteProvider({ commit }, providerId) {
    console.log(providerId)
    return new Promise((resolve, reject) => {
      deleteProvider(providerId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  addProvider({ commit }, provider) {
    return new Promise((resolve, reject) => {
      addProvider(provider).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  recoverProvider({ commit }, providerId) {
    return new Promise((resolve, reject) => {
      recoverProvider(providerId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getFees({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getFees({ page, page_size: pageSize }).then(res => {
        commit('SET_FEES', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteFee({ commit }, feeId) {
    return new Promise((resolve, reject) => {
      deleteFee(feeId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  addFee({ commit }, fee) {
    return new Promise((resolve, reject) => {
      addFee(fee).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  recoverFee({ commit }, feeId) {
    return new Promise((resolve, reject) => {
      recoverFee(feeId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getContracts({ commit }, pageConfig) {
    const { page, pageSize } = pageConfig
    return new Promise((resolve, reject) => {
      getContracts({ page, page_size: pageSize }).then(res => {
        commit('SET_CONTRACTS', res.data.data)
        commit('SET_TOTAL', res.data.total, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteContract({ commit }, contractId) {
    console.log(contractId)
    return new Promise((resolve, reject) => {
      deleteContract(contractId).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  addContracts({ commit }, fee) {
    return new Promise((resolve, reject) => {
      addContracts(fee).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  recoverContract({ commit }, contractId) {
    return new Promise((resolve, reject) => {
      recoverContract(contractId).then(res => {
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

