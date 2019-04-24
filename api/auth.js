import { POST } from '@/utils/request'

export function loginByAccount(params) {
  return POST('login/validate.do', params)
}

export function getLoginUser() {
  return POST('main/getLoginUser.do')
}

export function getLoginStatus() {
  return POST('login/getLoginStatus.do')
}

export function qrcodeCheck(params = {}) {
  return POST('login/qrcodeCheck.do', params)
}

export function bindWechat(params = {}) {
  return POST('login/bindWechat.do', params)
}

export function sendSMSCode(params = {}) {
  return POST('login/sendVerificationCode.do', params)
}

export function weixinJsConfig(params = {}) {
  return POST('login/weixinJsConfig.do', params)
}

export function logout(params = {}) {
  return POST('login/logout.do', params)
}
