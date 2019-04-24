import { POST } from '@/utils/request'

// 获取客户列表类别集合
export function fetchList(params) {
  return POST('customer/getH5CustomerExpandList.do', params)
}

// 客户新增
export function addList(params) {
  return POST('customer/saveH5CustomerExpand.do', params, {
    json: true
  })
}

// 客户详情
export function getDetail(customerId) {
  return POST('customer/getModelByCustomerId.do', { customerId })
}

// 客户编辑
export function editList(params) {
  return POST('customer/editH5CustomerExpand.do', params, {
    json: true
  })
}
