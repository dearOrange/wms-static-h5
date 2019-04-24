import { POST } from '@/utils/request'

// 获取应收列表类别集合
export function fetchList(params) {
  return POST('fpPayableBill/getListByExpand.do', params, { json: true })
}

// 获取单个结算
export function accountSingle(params) {
  return POST('fpPayableBill/accountReceivableSettlement.do', params)
}

// 获取应收账单
export function getDetail(payableBillUkid) {
  return POST('fpPayableBill/getModelByPayableBillUkid.do', {
    payableBillUkid
  })
}

// 批量结算
export function accountAll(params) {
  return POST('fpPayableBill/batchAccountReceivableSettlement.do', params, {
    json: true
  })
}
