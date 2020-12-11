import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 300,

  header: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

// 为没有数据的方法添加空的头
methodsNoData.forEach(method => {
  defaults.header[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

// 有请求数据的方法添加头
methodsWithData.forEach(method => {
  defaults.header[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
