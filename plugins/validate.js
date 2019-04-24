import Vue from 'vue'

import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate, {
  events: 'change',
  errorBagName: 'errors',
  fieldsBagName: 'FieldBags'
})

Validator.localize('cn', zh)
const dict = {
  cn: {
    messages: {
      required: name => `${name}不能为空!`
    },
    attributes: {
      phone: '密码',
      username: '',
      price: ''
    }
  }
}
Validator.localize(dict)

// 手机号码
Validator.extend('phone', {
  getMessage: (field, [args]) => `请输入正确的手机号码`,
  validate: (value, [args]) => {
    const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    return reg.test(value)
  }
})

// 单价
Validator.extend('price', {
  getMessage: (field, [args]) => `请输入正确的价钱`,
  validate: (value, [args]) => {
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
    return reg.test(value)
  }
})
