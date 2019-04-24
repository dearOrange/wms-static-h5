export function isPhone(phone) {
  let rphone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
  return rphone.test(phone)
}
