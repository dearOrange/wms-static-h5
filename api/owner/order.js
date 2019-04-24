import { POST } from '@/utils/request'

// 订单列表 - 来自货主
export function getListFromOwner(params = {}) {
  return POST('order/getOrderPageList_h5_owner.do', params, { json: true })
}
// 订单列表 - 来自客户
export function getListFromCustomer(params = {}) {
  return POST('order/getOrderPageList_h5_customer.do', params)
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

// 创建
export function create(params) {
  return POST('order/saveOrder_h5_owner.do', params, {
    json: true
  })
}

// 更新
export function update(params) {
  return POST('order/updateOrder_h5.do', params, {
    json: true
  })
}

// 确认
export function confirm(params) {
  return POST('order/confirmShipment_h5.do', params, {
    json: true
  })
}

// 删除
export function remove(orderUkid) {
  return POST('order/cancel.do', {
    orderUkid
  })
}
