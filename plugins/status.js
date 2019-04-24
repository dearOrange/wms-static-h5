import Vue from 'vue'
let Status = require('@/constant/status')
Vue.filter('status', (value, type = 'PURCHASE') => {
  return Status[type][value]
})
