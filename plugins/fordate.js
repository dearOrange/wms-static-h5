export function CurentTime() {
  // 当前时间
  let now = new Date()

  let year = now.getFullYear() // 年
  let month = now.getMonth() + 1 // 月
  let day = now.getDate() // 日

  // let hh = now.getHours() // 时
  // let mm = now.getMinutes() // 分
  // let ss = now.getSeconds()
  let clock = year + '-'

  if (month < 10) clock += '0'

  clock += month + '-'

  if (day < 10) clock += '0'

  clock += day

  // if (hh < 10) clock += '0'

  // clock += hh + ':'
  // if (mm < 10) clock += '0'
  // clock += mm
  // if (ss < 10) clock += '0'
  // clock += ss
  return clock
}
export function PrevTime() {
  // 前一天
  let now = new Date()
  let preDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  let year = preDate.getFullYear() // 年
  let month = preDate.getMonth() + 1 // 月
  let day = preDate.getDate() // 日
  let clock = year + '-'

  if (month < 10) clock += '0'

  clock += month + '-'

  if (day < 10) clock += '0'

  clock += day
  return clock
}
export function CurentMonthFirst() {
  // 本月
  let now = new Date()
  let year = now.getFullYear() // 年
  let month = now.getMonth() + 1 // 月

  let clock = year + '-'

  if (month < 10) clock += '0'

  clock += month + '-'

  let startDate = clock + '01' // 本月第一天

  return startDate
}
export function CurentMonthLast() {
  // 本月
  let now = new Date()
  let year = now.getFullYear() // 年
  let month = now.getMonth() + 1 // 月

  let clock = year + '-'

  if (month < 10) clock += '0'

  clock += month + '-'

  let myDate = new Date(year, month, 0)
  let endDate = clock + myDate.getDate()

  return endDate
}
export function PrevMonthFirst() {
  // 本月
  let now = new Date()
  let year = now.getFullYear() // 年
  let month = now.getMonth() // 月

  let clock = year + '-'

  if (month < 10) clock += '0'

  clock += month + '-'

  let startDate = clock + '01' // 本月第一天

  return startDate
}
export function PrevMonthLast() {
  // 本月
  let now = new Date()
  let year = now.getFullYear() // 年
  let month = now.getMonth() // 月

  let clock = year + '-'

  if (month < 10) clock += '0'

  clock += month + '-'

  let myDate = new Date(year, month, 0)
  let endDate = clock + myDate.getDate()

  return endDate
}
