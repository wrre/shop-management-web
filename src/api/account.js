import request from '@/utils/account-request'

export function findMe() {
  return request({
    url: '/accounts/me',
    method: 'get'
  })
}
