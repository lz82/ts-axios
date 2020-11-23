import { AxiosRequestConfig } from './types'

import { AxiosResponse, PromiseResponse } from './types'

// 将response headers从字符串转为对象
const formatHeader = (origin: string): any => {
  if (!origin.trim()) {
    return
  }
  let ret = Object.create(null)
  origin.split('\r\n').forEach(row => {
    if (row) {
      const [key, value] = row.split(': ')
      if (key.trim()) {
        ret[key.trim()] = value.trim()
      }
    }
  })
  return ret
}

export default function xhr(config: AxiosRequestConfig): PromiseResponse {
  console.log('config', config)
  const { url, method = 'get', data = null, header = {}, responseType = 'text' } = config
  return new Promise<AxiosResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {}
    xhr.open(method.toUpperCase(), url, true)
    // 回调函数
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      console.log('xhr', responseType)
      const responseHeaders = formatHeader(xhr.getAllResponseHeaders())

      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
      const res: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }
      resolve(res)
    }
    // 设置header
    Object.keys(header).forEach(key => {
      xhr.setRequestHeader(key, header[key])
    })
    xhr.send(data)
  })
}
