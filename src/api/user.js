import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/session/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/session/logout',
    method: 'delete'
  })
}

export function resetPwd(data) {
  return request({
    url: '/session/reset_pwd',
    method: 'put',
    data
  })
}
