import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, params = null } = config

  // TODO
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {}
    if (method.toUpperCase() === 'GET') {
      if (params) {
        let paramUrl = ''
        Object.keys(params).forEach(key => {
          console.log(key)
          paramUrl += `&${key}=${params[key]}`
        })
        xhr.open(method.toUpperCase(), `${url}?${paramUrl.substring(1)}`, true)
        xhr.send()
      } else {
        xhr.open(method.toUpperCase(), url, true)
        xhr.send()
      }
    }
  })
}
