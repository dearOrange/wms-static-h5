import { POST } from '@/utils/request'

export function getUserTypes() {
  return POST('syUser/selectUserType.do')
}
export function saveUserType({ ownerId, customerId }) {
  return POST('syUser/saveUserByOwnerAndCust.do', {
    ownerId,
    customerId
  })
}
