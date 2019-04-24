import { POST } from '@/utils/request'

// 获取供应商列表类别集合
export function fetchList(params) {
  return POST('supplier/getSupplierExpandPageList.do', params, {
    json: true
  })
}

// 供应商新增
export function addList(params) {
  return POST('supplier/saveH5Supplier.do', params, {
    json: true
  })
}

// 供应商详情
export function getDetail(supplierId) {
  return POST('supplier/getModelBySupplierId.do', { supplierId })
}

// 供应商编辑
export function editList(params) {
  return POST('supplier/editH5Supplier.do', params, {
    json: true
  })
}
