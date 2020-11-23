import { AxiosRequestConfig } from './types'
import buildUrl from './helper/url'
import buildData from './helper/data'
import buildHeader from './helper/header'
import { PromiseResponse } from './types'
import xhr from './xhr'

// 转化url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

// 转化data
function transformData(config: AxiosRequestConfig): void {
  config.data = buildData(config)
}

function transformHeader(config: AxiosRequestConfig): void {
  config.header = buildHeader(config)
}

// 处理配置文件
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

// 实例方法
function axios(config: AxiosRequestConfig): PromiseResponse {
  processConfig(config)
  // 注意顺序，这个方法要在transformData之前，因为transformData会把data转为string
  transformHeader(config)
  transformData(config)
  return xhr(config).then(res => {
    // 如果返回data是字符串，则尝试将其转为json类型
    if (typeof res.data === 'string') {
      try {
        res.data = JSON.parse(res.data)
      } catch {}
    }
    return res
  })
}

export default axios
