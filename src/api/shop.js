import request from '@/utils/shop-request'

export function findShops(params) {
  return request({
    url: '/shops',
    method: 'get',
    params
  })
}
