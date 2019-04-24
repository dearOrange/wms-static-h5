import { POST } from '@/utils/request'

export function getList(params = {}) {
  return POST('seReturnHeader/getReturnList_h5.do', params, { json: true })
}

// 读取详情基本信息
export function getDetailOfBasic(returnUkid) {
  return POST('seReturnHeader/getSeReturnHeaderExpandByUkid.do', {
    returnUkid
  })
}
// 读取详情商品
export function getDetailOfGoods(returnUkid) {
  return POST('seReturnDetail/getSeReturnDetailExpandByReturnUkid.do', {
    returnUkid
  })
}

export function create(params) {
  // console.log(params)
  // return Promise.resolve({ success: false })
  return POST('seReturnHeader/saveReturn_h5.do', params, {
    json: true
  })
}

export function update(params) {
  return POST('seReturnHeader/updateReturn_h5.do', params, {
    json: true
  })
}

export function confirm(params) {
  return POST('seReturnHeader/confirmReturn_h5.do', params)
}

export function remove(returnUkid) {
  return POST('seReturnHeader/cancelReturn.do', {
    returnUkid
  })
}
