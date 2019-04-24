import { POST } from '@/utils/request'

// 订单列表
export function getGoodsList(params = {}) {
  return POST('imProductItem/getProductItemList_h5_customer_index.do', {
    ...params
  })
}
