import { POST } from '@/utils/request'

// 获取应收列表类别集合
export function fetchList(params) {
  return POST('frReceivableBill/getH5ListByExpand.do', params, { json: true })
}

// 获取单个结算
export function accountSingle(params) {
  return POST('frReceivableBill/accountReceivableSettlement.do', params)
}

// 获取应收账单
export function getDetail(receivableBillUkid) {
  return POST('frReceivableBill/getModelByReceivableBillUkid.do', {
    receivableBillUkid
  })
}

// 批量结算
export function accountAll(params) {
  return POST('frReceivableBill/batchAccountReceivableSettlement.do', params, {
    json: true
  })
}
