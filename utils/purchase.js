import { sumBy as _sumBy } from 'lodash'

export function sumBy(list = [], prop) {
  return _sumBy(this.list, item => item[prop] || 0)
}
