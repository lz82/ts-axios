import { AxiosRequestConfig } from '../types'

import { isObject } from './utils'

// 如果是普通对象，则返回string
// 否则原样返回
// https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send
// xhr 的body 可以是`Blob` `BufferSource` `FormData`  `URLSearchParams`或`USVString`
export default function buildData(config: AxiosRequestConfig): any {
  const { data } = config
  if (isObject(data)) {
    return JSON.stringify(data)
  } else {
    return data
  }
}
