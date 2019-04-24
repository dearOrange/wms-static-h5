import ChinaAreaData from 'china-area-data'
import { map } from 'lodash'
delete ChinaAreaData['86']['710000'] // 中国台湾
delete ChinaAreaData['86']['810000'] // 中国香港
delete ChinaAreaData['86']['820000'] // 中国澳门

function _formatter(obj, limitLevel = 3, curLevel = 1) {
  return map(obj, (label, value) => {
    let _curLevel = curLevel
    let _data = {
      label,
      value
    }

    if (ChinaAreaData[value] && limitLevel > _curLevel) {
      _data.children = _formatter(ChinaAreaData[value], limitLevel, ++_curLevel)
    }
    return _data
  })
}

export function connectedName([proviceID, cityID, districtID], sep = '') {
  let names = []
  if (proviceID) {
    names.push(ChinaAreaData['86'][proviceID])
    if (cityID) {
      names.push(ChinaAreaData[proviceID][cityID])
      if (districtID) {
        names.push(ChinaAreaData[cityID][districtID])
      }
    }
  }
  return names.length > 0 ? names.join(sep) : ''
}

export function getCityDistrict(proviceID) {
  return _formatter(ChinaAreaData[proviceID])
}

export function getProviceCityDistrict() {
  return _formatter(ChinaAreaData['86'])
}

export function getProviceCity() {
  return _formatter(ChinaAreaData['86'], 2)
}
