import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, params = null } = config
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {}
    console.log(url)
    xhr.open(method.toUpperCase(), url, true)
    xhr.send()
  })
}
