import { POST } from '@/utils/request'

export function subscribe(params = {}) {
  return POST('syUser/subscribe.do', params)
}

export function join(params = {}) {
  return POST('syUser/join.do', params, {
    json: true
  })
}

export function getPriceList(params = {}) {
  return POST('sySoftwarePrice/getPriceList.do', params)
}
