import { AxiosRequestConfig } from '../types'
import buildUrl from '../helper/url'
import transform from './transform'
import { flattenHeaders } from '../helper/header'
import { AxiosPromise } from '../types'
import xhr from './xhr'

// 转化url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

// 处理配置文件
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.header, config.transformRequest)
  config.header = flattenHeaders(config.header, config.method!)
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

// 实例方法
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)

  return xhr(config).then(res => {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
  })
}

export default dispatchRequest
