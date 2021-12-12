import request from '@/utils/account-request'

export function getLoginByLineUrl(params) {
  return request({
    url: '/auth/logins/line/url',
    method: 'get',
    params
  })
}

export function loginByLine(data) {
  return request({
    url: '/auth/logins/line',
    method: 'post',
    data
  })
}

export function getLoginByFacebookUrl(params) {
  return request({
    url: '/auth/logins/facebook/url',
    method: 'get',
    params
  })
}

export function loginByFacebook(data) {
  return request({
    url: '/auth/logins/facebook',
    method: 'post',
    data
  })
}
