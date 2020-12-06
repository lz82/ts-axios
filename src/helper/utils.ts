const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
  return true
}

export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 合并对象
export function extend<T, F>(to: T, from: F): T & F {
  for (let key in from) {
    ;(to as T & F)[key] = from[key] as any
  }
  // Object.keys(from).forEach(key => {
  //   (to as any)[key] = (from as any)[key]
  // })
  return to as T & F
}
