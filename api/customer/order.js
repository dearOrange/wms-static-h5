import { POST } from '@/utils/request'

// 提交
export function submit(params = {}) {
  return POST('order/submission_h5_customer.do', params, {
    json: true
  })
}

// 提交直接
export function submitFast(orderUkid) {
  return POST('order/submissionByUkid.do', {
    orderUkid
  })
}

// 保存草稿
export function save(params = {}) {
  return POST('order/saveOrder_h5_customer.do', params, {
    json: true
  })
}

// 取消订单
export function remove(orderUkid) {
  return POST('order/cancel.do', {
    orderUkid
  })
}

// 查看 - 基本数据
export function getDetailOfBasic(orderUkid) {
  return POST('order/getOrderByUkid.do', {
    orderUkid
  })
}
// 查看 - 商品列表
export function getDetailOfGoods(orderUkid) {
  return POST('order/getOrderDetailList_h5.do', {
    orderUkid
  })
}

// 查看 - 客户地址
export function getCustomerAddress() {
  return POST('address/getDefaultAddressByCustomerId.do')
}

export function orderPayment(params = {}) {
  return POST('order/orderPayment.do', params)
}
