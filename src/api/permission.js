import request from '@/utils/request'

export function getRoles(params = {}) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

export function createRole(data) {
  return request({
    url: '/roles',
    method: 'post',
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

export function createPermission(data) {
  return request({
    url: '/permissions',
    method: 'post',
    data
  })
}
