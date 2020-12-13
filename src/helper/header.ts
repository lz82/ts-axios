import { AxiosRequestConfig } from '../types'

import { isObject, deepMerge } from './utils'

function normalizeHeader(header: any, name: string) {
  Object.keys(header).forEach(key => {
    if (key !== name && key.toUpperCase() === name.toUpperCase()) {
      // 如果key和传入的name不一致，但是转大写后又一致，则用传入的name替换原来属性, 同时删除原属性
      header[name] = header[key]
      delete header[key]
    }
  })
}

// 当data为对象时，为header添加content-type:application/json;
export default function buildHeader(header: any = {}, data?: any): void {
  // 如果data没有传值，则不需要为header添加content-type: application/json
  if (!data) {
    return header
  }
  // 如果data为对象
  if (isObject(data)) {
    // 先讲header中的key统一为Content-Type
    normalizeHeader(header, 'Content-Type')
    // 如果没有传入header或者传入当header中没有content-type
    // 为header添加content-type
    if (!header['Content-Type']) {
      header['Content-Type'] = 'application/json;charset=UTF-8'
    }
  }
  return header
}

export function flattenHeaders(header: any, method: string): any {
  const ret = deepMerge(header.common, header[method], header)

  const deleteKey = ['common', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']

  deleteKey.forEach(key => {
    delete ret[key]
  })

  return ret
}
