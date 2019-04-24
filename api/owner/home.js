import { POST } from '@/utils/request'

export function fetchList(params) {
  return POST('home/getH5HomeData.do', params)
}
