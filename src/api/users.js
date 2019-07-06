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

export function recoverUser(userId) {
  return request({
    url: `/users/${userId}/recover`,
    method: 'put'
  })
}
