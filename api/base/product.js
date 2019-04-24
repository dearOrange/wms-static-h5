import { POST } from '@/utils/request'

// 获取类别集合
export function fetchList(params) {
  return POST('imProductItem/getH5ModelList.do', params)
}

// 商品新增
export function addList(params) {
  return POST('imProductItem/saveH5Product.do', params)
}

// 商品分类
export function getDetail(productItemUkid) {
  return POST('imProductItem/getModelByProductItemUkid.do', { productItemUkid })
}

// 商品编辑
export function editList(params) {
  return POST('imProductItem/editH5Product.do', params, {
    json: true
  })
}
