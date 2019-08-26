import request from '@/utils/request'

export function getLogs(params) {
  return request({
    method: 'get',
    url: '/operation_logs',
    params
  })
}
