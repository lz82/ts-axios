import { AxiosRequestConfig } from './types'
import buildUrl from './helper/url'

import xhr from './xhr'

// 转化url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

// 处理配置文件
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

// 实例方法
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

export default axios
