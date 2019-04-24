import { POST } from '@/utils/request'

// 读取商品详情
export function getDetail(productItemUkid) {
  return POST('imProductItem/getProductItemDetail_customer.do', {
    productItemUkid
  })
}
