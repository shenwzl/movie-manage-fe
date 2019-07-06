import request from '@/utils/request'

export function getStaffs(params = {}) {
  return request({
    url: '/staffs',
    method: 'get',
    params
  })
}

export function getProviders(params = {}) {
  return request({
    url: '/providers',
    method: 'get',
    params
  })
}

export function getFees(params = {}) {
  return request({
    url: '/fees',
    method: 'get',
    params
  })
}

export function addFee(data) {
  return request({
    url: '/fees',
    method: 'post',
    data
  })
}

export function addProvider(data) {
  return request({
    url: '/providers',
    method: 'post',
    data
  })
}

export function addStaff(data) {
  return request({
    url: '/staffs',
    method: 'post',
    data
  })
}

export function getContracts(params = {}) {
  return request({
    url: '/contract_subjects',
    method: 'get',
    params
  })
}

export function addContracts(data) {
  return request({
    url: '/contract_subjects',
    method: 'post',
    data
  })
}

