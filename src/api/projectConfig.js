import request from '@/utils/request'

export function getFeeCategories(params) {
  return request({
    url: '/configs/fee_categories',
    method: 'get',
    params
  })
}

export function getContracts(params) {
  return request({
    url: '/configs/contract_subjects',
    method: 'get',
    params
  })
}

export function getCompanys(params) {
  return request({
    url: '/configs/companys',
    method: 'get',
    params
  })
}

export function getProviders(params) {
  return request({
    url: '/configs/providers',
    method: 'get',
    params
  })
}

export function getStaffs(params) {
  return request({
    url: '/configs/staffs',
    method: 'get',
    params
  })
}

export function getMemberTypes(params) {
  return request({
    url: '/configs/member_types',
    method: 'get',
    params
  })
}

export function getProjectState(params) {
  return request({
    url: '/configs/project_states',
    method: 'get',
    params
  })
}
