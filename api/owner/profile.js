import { POST } from '@/utils/request'

export function fetchList(params) {
  return POST('main/getLoginUser.do', params)
}

export function fetchEdit(params) {
  return POST('syUser/updateUser.do', params, { json: true })
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

export function getUserList(params) {
  return POST('syUser/getUserList.do', params)
}

export function waitData(params) {
  return POST('syUser/dealtWith.do', params)
}
