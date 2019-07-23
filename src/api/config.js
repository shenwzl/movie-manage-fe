import request from '@/utils/request'

export function getStaffs(params = {}) {
  return request({
    url: '/staffs',
    method: 'get',
    params
  })
}

export function deleteStaff(staffId) {
  return request({
    url: `/staffs/${staffId}`,
    method: 'delete'
  })
}

export function addStaff(data) {
  return request({
    url: '/staffs',
    method: 'post',
    data
  })
}

export function recoverStaff(staffId) {
  return request({
    url: `/staffs/${staffId}/recover`,
    method: 'put'
  })
}

export function getCompanys(params = {}) {
  return request({
    url: '/customer_company',
    method: 'get',
    params
  })
}

export function deleteCompany(cId) {
  return request({
    url: `/customer_company/${cId}`,
    method: 'delete'
  })
}

export function addCompany(data) {
  return request({
    url: '/customer_company',
    method: 'post',
    data
  })
}

export function recoverCompany(cId) {
  return request({
    url: `/customer_company/${cId}/recover`,
    method: 'put'
  })
}

export function getFees(params = {}) {
  return request({
    url: '/fee_categories',
    method: 'get',
    params
  })
}

export function deleteFee(feeId) {
  return request({
    url: `/fee_categories/${feeId}`,
    method: 'delete'
  })
}

export function addFee(data) {
  return request({
    url: '/fee_categories',
    method: 'post',
    data
  })
}

export function recoverFee(feeId) {
  return request({
    url: `/fee_categories/${feeId}/recover`,
    method: 'put'
  })
}

export function getProviders(params = {}) {
  return request({
    url: '/providers',
    method: 'get',
    params
  })
}

export function deleteProvider(providerId) {
  return request({
    url: `/providers/${providerId}`,
    method: 'delete'
  })
}

export function addProvider(data) {
  return request({
    url: '/providers',
    method: 'post',
    data
  })
}

export function recoverProvider(providerId) {
  return request({
    url: `/provider/${providerId}/recover`,
    method: 'put'
  })
}

export function getContracts(params = {}) {
  return request({
    url: '/contract_subjects',
    method: 'get',
    params
  })
}

export function deleteContract(contractsId) {
  return request({
    url: `/contract_subjects/${contractsId}`,
    method: 'delete'
  })
}

export function addContracts(data) {
  return request({
    url: '/contract_subjects',
    method: 'post',
    data
  })
}

export function recoverContract(contractId) {
  return request({
    url: `/contract_sunjects/${contractId}/recover`,
    method: 'put'
  })
}

