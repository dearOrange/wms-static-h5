import { Toast } from 'mint-ui'
import { isFunction } from 'lodash'

let toastInstance

let ERROR_CODE = {
  '1001': {
    message: function(data) {
      popError(data.message)
    }
  },
  '1002': {
    message: function(data) {
      popError(data.message)
    }
  },
  '400': { message: '[400]错误' },
  '404': { message: '[404]错误' },
  '500': { message: '[500]错误' }
}

function popError(msg) {
  if (toastInstance && !toastInstance.closed) {
    return
  }
  toastInstance = Toast({
    message: `${msg}`,
    duration: 2000
  })
}

export default function error(code, data = {}) {
  let { message } = ERROR_CODE[code] || { message: data.message }
  if (message) {
    if (isFunction(message)) {
      return message(data)
    } else {
      popError(message)
    }
  }
}
