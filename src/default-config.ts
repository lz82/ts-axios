import { AxiosRequestConfig } from './types'
import buildHeader from './helper/header'
import { transformRequestData, transformResponseData } from './helper/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 300,

  header: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, header?: any): any {
      buildHeader(header, data)
      console.log('default transformRequest...')
      return transformRequestData(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponseData(data)
    }
  ]
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
