import Vue from 'vue'
import { isNaN } from 'lodash'
Vue.filter('money', (value, type) => {
  let numValue = isNaN(+value) ? 0 : +value
  return numValue
})

Vue.filter('CNY', (value, type) => {
  let numValue = isNaN(+value) ? 0 : +value
  return `￥${numValue.toFixed(2)}`
})
