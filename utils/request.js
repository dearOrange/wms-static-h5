/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import error from '@/utils/error'

// 创建axios实例，可以自定义配置
const instance = axios.create({
  baseURL: config.server,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

function cancelableConfig() {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  return {
    cancelToken: source.token,
    source
  }
}

// // 请求拦截器
// instance.interceptors.request.use(
//   config => {
//     console.log(config)
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )

// 响应拦截器
instance.interceptors.response.use(
  ...(() => {
    return [
      // 请求成功
      response => {
        let { status, data } = response
        if (status === 200) {
          // let code = data.code
          let { code, message } = data
          let success = code === '0'

          if (!success) {
            error(code, data)
          }
          return Promise.resolve({
            success,
            msg: message,
            data: data.data,
            page: {
              total: data.total
            }
          })
        }
      },
      // 请求失败
      ({ message, response, status }) => {
        // 无返回信息 - 可能是被取消了
        if (!response) {
          return Promise.resolve({
            success: false,
            msg: message,
            data: null
          })
        } else {
          let { status, data } = response
          error(status)
          return Promise.resolve({
            success: false,
            msg: message,
            data
          })
        }
      }
    ]
  })()
)

function get(url, params = {}, options = {}) {
  let config = cancelableConfig()
  let { source } = config
  delete config.source
  let request = instance.get(url, {
    params,
    ...config,
    ...options
  })
  request.cancel = source.cancel
  return request
}

function post(url, params = {}, options = {}) {
  let config = cancelableConfig()
  let isJson = options.json
  delete options.json
  let { source } = config

  if (isJson) {
    options.headers = { 'content-type': 'application/json;charset=UTF-8' }
  }

  delete config.source
  let request = instance.post(
    url,
    isJson ? JSON.stringify(params) : qs.stringify(params),
    {
      ...config,
      ...options
    }
  )
  // request.then(data => {
  //   console.log(data)
  // })
  request.cancel = source.cancel
  return request
}

export const GET = get
export const POST = post

// export default instance
