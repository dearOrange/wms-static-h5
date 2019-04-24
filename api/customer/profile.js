import { POST } from '@/utils/request'

export function fetchList(params) {
  return POST('main/getLoginUser.do', params)
}

export function fetchEdit(params) {
  return POST('syUser/updateUser.do', params)
}

export function fetchOwner(params) {
  return POST('owner/getOwnerExpandByUser.do', params)
}

export function editOwner(params) {
  return POST('owner/updateOwnerExpand.do', params, { json: true })
}

export function getShareToken(params) {
  return POST('syUser/getShareToken.do', params)
}

export function getCustomerByOwner(params) {
  return POST('syUser/getCustomerByOwner.do', params)
}

export function checkShareSelf(params) {
  return POST('syUser/checkShareSelf.do', params)
}

export function getShareOwner(params) {
  return POST('syUser/getShareOwner.do', params)
}

export function saveShareCustomer(params) {
  return POST('syUser/saveShareCustomer.do', params, {
    json: true
  })
}

export function getAddress() {
  return POST('customer/getCustomerExpandByModel_customer.do')
}

export function updateAddress(params) {
  return POST('address/updateAddress_customer.do', params)
}
