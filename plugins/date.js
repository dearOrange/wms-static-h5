import Vue from 'vue'
import { format } from 'date-fns'
import { isString } from 'lodash'

Vue.use({
  install: function(vm) {
    vm.prototype.$format = format
  }
})

Vue.filter('date', (value, type = 'YYYY-MM-DD HH:mm:ss') => {
  let date = value
  if (isString(value)) {
    date = new Date(value)
  }
  return format(date, type)
})
