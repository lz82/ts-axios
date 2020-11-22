import { isDate, isObject } from './utils'

const encode = (val: string): string => {
  // 对@ : $ , 空格 [] 这些特殊字符对支持
  // 直接用encodeURIComponent的化，这些特殊字符也会被encode
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 拼接url
// 参数值为数组
// /base/get?foo[]=bar&foo[]=baz
// 参数值为对象
// /base/get?foo=对象encode后的值
// 参数为date
// /base/get?date=日期的.toISOString() 的结果
// 对@ : $ , 空格 [] 这些特殊字符对支持
// 空值忽略，对值为null 或者 undefined的属性，不会添加到url参数中
// 丢弃url中的哈希标记
// 保留url中已存在的参数
export default function buildUrl(url: string, params: any): string {
  // 如果没有传params，则直接返回
  if (!params) {
    return url
  }

  let parts: string[] = []
  Object.keys(params).forEach(key => {
    // 获取当前key的值
    const val = params[key]
    // 为了方便统一处理values，将values统一为数组
    let values = []
    // 如果值为null或者undefined，退出此次循环
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 判断是否为数组
    if (Array.isArray(val)) {
      // 如果是数组，则将值赋给values
      // 同时key需要在后面拼上[]
      values = val
      key += '[]'
    } else {
      // 否则直接把值变为数组
      values = [val]
    }

    values.forEach(item => {
      // 如果为日期类型，则需要返回ISOString
      if (isDate(item)) {
        item = item.toISOString()
      }
      // 如果是对象，要用JSON序列化
      if (isObject(item)) {
        item = JSON.stringify(item)
      }
      // key和val分别encode
      parts.push(`${encode(key)}=${encode(item)}`)
    })
  })
  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 丢弃hash
    const markHashIndex = url.indexOf('#')
    if (markHashIndex !== -1) {
      url = url.slice(0, markHashIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
