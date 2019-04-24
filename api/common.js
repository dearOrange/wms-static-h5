import { POST } from '@/utils/request'

export function fetchList(otherSideType) {
  return POST('frReceivableBill/getPaymentSideList.do', { otherSideType })
}
