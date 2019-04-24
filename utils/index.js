import { sumBy as _sumBy, findIndex } from 'lodash'

export function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('醒啦')
    }, time)
  })
}

export function sumBy(list = [], prop) {
  return _sumBy(list, item => item[prop] || 0)
}

export function replaceBy(arr = [], item, by) {
  let index = findIndex(arr, o => {
    return o[by] === item[by]
  })
  arr.splice(index, 1, item)
  return [...arr]
}
