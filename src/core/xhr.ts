import { AxiosRequestConfig } from '../types'

import { AxiosResponse, AxiosPromise, AxiosError } from '../types'

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

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  console.log('config', config)
  const { url, method = 'get', data = null, header = {}, responseType = 'text', timeout } = config
  return new Promise<AxiosResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (timeout) {
      xhr.timeout = timeout
    }

    xhr.onerror = () => {
      const err: AxiosError = {
        message: `Network Error`,
        code: '',
        status: '500',
        name: 'network error',
        request: xhr,
        config
      }
      reject(err)
    }

    // 超时
    xhr.ontimeout = () => {
      const err: AxiosError = {
        message: `Timeout of ${timeout}ms exceeded`,
        code: 'ECONNABORTED',
        status: '500',
        name: 'timeout',
        request: xhr,
        config
      }
      reject(err)
    }

    xhr.open(method.toUpperCase(), url, true)
    // 回调函数
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }

      // 超时或出现网络错误时，xhr.status === 0
      if (xhr.status === 0) {
        return
      }
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
      // 200到400之间都认为是正确
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(res)
      } else {
        const err: AxiosError = {
          message: `Request failed with status code ${xhr.status}`,
          code: xhr.statusText,
          status: xhr.statusText,
          name: xhr.statusText,
          request: xhr,
          config,
          response: res
        }
        reject(err)
      }
    }
    // 设置header
    Object.keys(header).forEach(key => {
      xhr.setRequestHeader(key, header[key])
    })
    xhr.send(data)
  })
}
