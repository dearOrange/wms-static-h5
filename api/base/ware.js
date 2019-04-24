import { POST } from '@/utils/request'

// 获取客户列表类别集合
export function fetchList(params) {
  return POST('baStock/getStockByParams.do', params)
}

// 客户新增
export function addList(params) {
  return POST('baStock/saveH5Stock.do', params)
}

// 客户详情
export function getDetail(stockId) {
  return POST('baStock/getModelByStockId.do', { stockId })
}

// 客户编辑
export function editList(params) {
  return POST('baStock/editStock.do', params)
}
