import { POST } from '@/utils/request'

// 获取应收列表类别集合
export function fetchList(params) {
  return POST('fpPayableBill/getBillDetailListByExpand.do', params, {
    json: true
  })
}
