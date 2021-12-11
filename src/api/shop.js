import request from '@/utils/shop-request'

export function findShops(params) {
  return request({
    url: '/shops',
    method: 'get',
    params
  })
}

export function updateShop(id, data) {
  return request({
    url: `/shops/${id}`,
    method: 'put',
    data
  })
}

export function deleteShop(id) {
  return request({
    url: `/shops/${id}`,
    method: 'delete'
  })
}

