import { AxiosRequestConfig } from '../types'
import { isObject, deepMerge } from '../helper/utils'

// 默认策略，val2有的话就取val2，没有取val1
const defaultStrate = (val1: any, val2: any): any => {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// val2优先策略，直接qu
const secondPriorityStrate = (val1: any, val2: any): any => {
  return val2
}

const deepMergeStrate = (val1: any, val2: any): any => {
  if (isObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const secondPriorityKeys = ['url', 'params', 'data']
const deepMergeKeys = ['header']

const strateSelector = (key: any) => {
  if (secondPriorityKeys.includes(key)) {
    return secondPriorityStrate
  } else if (deepMergeKeys.includes(key)) {
    return deepMergeStrate
  } else {
    return defaultStrate
  }
}

const mergeConfig = (
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig => {
  if (!config2) {
    config2 = {}
  }

  let retConfig = Object.create(null)

  const mergeField = (key: string) => {
    const strate = strateSelector(key)
    retConfig[key] = strate(config1[key], config2![key])
  }

  // 1.0 先对config2中的key遍历，将合并结果放入返回的config中
  for (let key in config2) {
    mergeField(key)
  }

  // 2.0 再对config1中的key遍历，如果key不存在与config2，则将合并结果放入返回config
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  return retConfig
}

export default mergeConfig
