import request from '@/utils/request'

export function getAllUser(params = {}) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function editUser(data, id) {
  return request({
    url:`/users/${id}`,
    method: 'put',
    data
  })
}

export function resetPwd(data, userId) {
  return request({
    url: `/users/${userId}/reset_pwd`,
    method: 'put',
    data
  })
}

export function deleteUser(userId) {
  return request({
    url: `/users/${userId}`,
    method: 'delete'
  })
}

export function getRoleByUser(userId) {
  return request({
    url: `/users/${userId}/roles`,
    method: 'get'
  })
}

export function updateRole(data, userId) {
  return request({
    url: `/users/${userId}/update_role`,
    method: 'put',
    data
  })
}

export function recoverUser(userId) {
  return request({
    url: `/users/${userId}/recover`,
    method: 'put'
  })
}
