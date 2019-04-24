import { POST } from '@/utils/request'

// 获取采购退货单列表
export function getList(params = {}) {
  return POST('purchaseBack/getPurchaseBackOrderList.do', params, {
    json: true
  })
}

// 获取采购详情基本信息
export function getDetail(backUkid) {
  return POST('purchaseBack/purchaseBackDetail.do', {
    backUkid
  })
}
// 创建采购退货单
export function create(params) {
  return POST('purchaseBack/savePurchaseBackOrder.do', params, {
    json: true
  })
}

// 更新采购退货单
export function update(params) {
  return POST('purchaseBack/updatePurchaseBackOrder.do', params, {
    json: true
  })
}

// 确认采购退货单
export function confirm(params) {
  return POST('purchaseBack/confirmPurchaseBack.do', params, {
    json: true
  })
}

export function remove(backUkid) {
  return POST('purchaseBack/updatePurchaseBackOrder.do', {
    backUkid,
    backStatus: 990
  })
}
