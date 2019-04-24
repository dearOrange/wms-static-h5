import { POST } from '@/utils/request'

export function getUrls(params) {
  return POST('syFile/getUrls.do', params)
}

// 获取类别集合
export function categoryList(params) {
  return POST('imCategory/getListByWechat.do', params)
}

// 获取类别集合
export function fetchList(type) {
  return POST('syDefinedCode/getListByType.do', {
    type
  })
}

// 商品分类
// export function cateType(ownerId) {
//   return POST('imCategory/getListByModel.do', { ownerId })
// }

// 商品分类列表
export function cateType(params) {
  return POST('imCategory/getListByWechat.do', params)
}

// 地址
export function getAddress(params) {
  return POST('area/getBaAreaListByParentId.do', params)
}

// 商品列表
export function getGoodsList() {
  return POST('imProductItem/selectModelList.do', {
    status: 1
  })
}
// 仓库列表
export function getDepotList() {
  return POST('baStock/getStockByParam.do', {
    status: 1
  })
}
export function getDepotListFromCustomer() {
  return POST('baStock/getStockList_h5_customer.do', {
    status: 1
  })
}

// 客户信息
export function getCustomerList() {
  return POST('customer/getCustomerExpandListByUserId_h5.do')
}

// 提供商信息
export function getProviderList() {
  return POST('supplier/getH5SupplierList.do')
}

export function getLogs(relatedUkid, relatedTable) {
  return POST('syLog/getListByParams.do', {
    relatedUkid,
    relatedTable
  })
}
