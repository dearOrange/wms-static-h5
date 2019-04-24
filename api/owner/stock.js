import { POST } from '@/utils/request'

// 根据参数查集合(台账查询)
export function getStandList(params) {
  return POST('stInventoryLedger/getListByModel.do', params)
}

// 根据参数查集合(库存)
export function getWareList(params) {
  return POST('stInventory/getListByModel.do', params)
}

// 根据参数查集合(调拨单)
export function getAllotList(params) {
  return POST('stAllocationHeader/getListByModel.do', params, { json: true })
}

// 新增调拨单
export function addAllot(params) {
  return POST('stAllocationHeader/saveStAllocationHeader.do', params, {
    json: true
  })
}

// 调拨单调出
export function toCheckAllot(params) {
  return POST('stAllocationHeader/updateByCallOut.do', params, { json: true })
}

// 调拨单调入
export function fromCheckAllot(params) {
  return POST('stAllocationHeader/updateByTransfer.do', params, { json: true })
}

// 调拨单取消
export function cancelAllot(allocationUkid) {
  return POST('stAllocationHeader/updateByCancel.do', { allocationUkid })
}

// 根据ID查调拨单
export function getAllotDetail(allocationUkid) {
  return POST('stAllocationHeader/getById.do', { allocationUkid })
}

// 修改调拨单
export function changeAllot(params) {
  return POST('stAllocationHeader/updateStAllocationHeader.do', params, {
    json: true
  })
}

// 根据参数查集合(调整单)
export function getAdjustList(params) {
  return POST('stAdjustHeader/getListByModel.do', params, { json: true })
}

// 根据ID查调整单
export function getAdjustDetail(adjustUkid) {
  return POST('stAdjustHeader/getById.do', { adjustUkid })
}

// 新增调整单
export function addAdjust(params) {
  return POST('stAdjustHeader/saveStAdjustHeader.do', params, { json: true })
}

// 调整单审核
export function checkAdjust(adjustUkids) {
  return POST('stAdjustHeader/batchUpdateByStatus.do', { adjustUkids })
}

// 新增取消
export function cancelAdjust(adjustUkids) {
  return POST('stAdjustHeader/batchUpdateByCancel.do', { adjustUkids })
}

// 修改调整单
export function changeAdjust(params) {
  return POST('stAdjustHeader/updateStAdjustHeader.do', params, { json: true })
}

// 获取客户列表类别集合
export function wareList(params) {
  return POST('baStock/getStockByParam.do', params)
}
