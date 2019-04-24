import { POST } from '@/utils/request'

// 获取分类列表类别集合
export function fetchList(params) {
  return POST('imCategory/getImCategoryList.do', params)
}

// 商品分类新增
export function addList(params) {
  return POST('imCategory/saveH5ImCategory.do', params)
}

// 商品分类详情
export function getDetail(categoryUkid) {
  return POST('imCategory/getModelByCategoryUkid.do', { categoryUkid })
}

// 商品编辑
export function editList(params) {
  return POST('imCategory/updateImCategory.do', params, {
    json: true
  })
}
