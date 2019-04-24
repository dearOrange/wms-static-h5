import { POST } from '@/utils/request'

// 获取采购订单列表
export function getList(params = {}) {
  return POST('prPurchaseHeader/getPurchaseOrderList.do', params, {
    json: true
  })
}

// 获取采购详情基本信息
export function getDetail(purchaseUkid) {
  return POST('prPurchaseHeader/purchaseDetail.do', {
    purchaseUkid
  })
}

export function create(params) {
  return POST('prPurchaseHeader/savePurchaseOrder.do', params, {
    json: true
  })
}

export function update(params) {
  return POST('prPurchaseHeader/updatePurchaseOrder.do', params, {
    json: true
  })
}

export function confirm(params) {
  return POST('prPurchaseHeader/confirmPurchase.do', params, {
    json: true
  })
}

export function remove(purchaseUkid) {
  return POST('prPurchaseHeader/updatePurchaseOrder.do', {
    purchaseUkid,
    purchaseStatus: 990
  })
}
