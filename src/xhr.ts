import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, header = {} } = config
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {}
    xhr.open(method.toUpperCase(), url, true)
    // 设置header
    Object.keys(header).forEach(key => {
      xhr.setRequestHeader(key, header[key])
    })
    xhr.send(data)
  })
}
