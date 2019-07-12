import request from '@/utils/request'

export function getProjects(params) {
  return request({
    url: '/projects',
    method: 'get',
    params
  })
}

export function saveProjects(data) {
  return request({
    url: '/projects',
    method: 'post',
    data
  })
}

export function deleteProject(pId) {
  return request({
    url: `/projects/${pId}`,
    method: 'delete'
  })
}

export function recoverProject(pId) {
  return request({
    url: `/projects/${pId}/recover`,
    method: 'put'
  })
}

export function getBaseInfo(pId) {
  return request({
    url: `/projects/${pId}/base_info`,
    method: 'get'
  })
}

export function saveBaseInfo(data, pId) {
  return request({
    url: `/projects/${pId}/base_info`,
    method: 'put',
    data
  })
}

export function getShootingInfo(pId) {
  return request({
    url: `/projects/${pId}/shooting_info`,
    method: 'get'
  })
}

export function saveShootingInfo(data, pId) {
  return request({
    url: `/projects/${pId}/shooting_info`,
    method: 'put',
    data
  })
}

export function getLastStateInfo(pId) {
  return request({
    url: `/projects/${pId}/last_state_info`,
    method: 'get'
  })
}

export function saveLastStateInfo(data, pId) {
  return request({
    url: `/projects/${pId}/last_state_info`,
    method: 'put',
    data
  })
}
