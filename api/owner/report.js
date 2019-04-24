import { POST } from '@/utils/request'

// 采购入库业务报表
export function getList(params = {}) {
  return POST('reportForms/getPurchaseReport.do', params)
}

// 进销存业务报表
export function sellList(params = {}) {
  return POST('reportForms/entersSellsSavesDataH5.do', params)
}

// 销售业务报表
export function orderList(params = {}) {
  return POST('order/businessReport_h5_owner.do', params, { json: true })
}
