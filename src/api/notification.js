import request from '@/utils/request'

export function getNotifications(data) {
  return request({
    url: '/api/getNotifications',
    method: 'get',
    params: data
  })
}