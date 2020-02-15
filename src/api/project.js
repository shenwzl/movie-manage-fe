import request from '@/utils/request'

export function getProjects(data) {
  return request({
    url: '/projects/list',
    method: 'post',
    data
  })
}

export function saveProjects(data) {
  return request({
    url: '/projects',
    method: 'post',
    data
  })
}

export function updateState(data, id) {
  return request({
    url: `/projects/${id}/update_state`,
    method: 'put',
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

export function searchProject(data) {
  return request({
    url: '/project_search',
    method: 'post',
    data
  })
}

export function exportProject(data) {
  return request({
    url: '/project_search/export',
    method: 'post',
    data
  })
}

export function exportDetailProject(id) {
  return request({
    url: `/projects/${id}/export_detail`,
    method: 'post'
  })
}

export function getProjectUser(id) {
  return request({
    url: `/project_permissions/${id}/permissions?permission_type=1`,
    method: 'get'
  })
}

export function editProjectUser(data) {
  return request({
    url: `/project_permissions/${data.id}/permissions`,
    method: 'post',
    data
  })
}

export function getAllUsers() {
  return request({
    url: '/configs/users',
    method: 'get'
  })
}
