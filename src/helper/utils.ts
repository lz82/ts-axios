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

// 深拷贝+合并
// 可以传入多个对象
// 后传入的覆盖前面传入的
export function deepMerge(...args: any[]): any {
  let ret: {
    [key: string]: any
  } = Object.create(null)
  args.forEach(arg => {
    if (arg) {
      Object.keys(arg).forEach(key => {
        const val = arg[key]
        if (isObject(val)) {
          // 如果当前key的值是对象
          // 且已经存在了
          // 则递归merge
          // 否则直接递归
          if (isObject(ret[key])) {
            ret[key] = deepMerge(ret[key], val)
          } else {
            ret[key] = deepMerge(val)
          }
        } else {
          ret[key] = val
        }
      })
    }
  })
  return ret
}
