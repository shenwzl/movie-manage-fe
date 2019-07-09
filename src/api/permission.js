import request from '@/utils/request'

export function getRoles(params = {}) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

export function getAllRoles() {
  return request({
    url: '/roles/normal_all',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function updatePermission(data, roleId) {
  return request({
    url: `/roles/${roleId}/update_permission`,
    method: 'put',
    data
  })
}

export function getPermissions(params = {}) {
  return request({
    url: '/permissions',
    method: 'get',
    params
  })
}

export function getAllPermissions(params = {}) {
  return request({
    url: '/permissions/normal_all',
    method: 'get',
    params
  })
}

export function createPermission(data) {
  return request({
    url: '/permissions',
    method: 'post',
    data
  })
}
