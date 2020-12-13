import { Transformer } from '../types'

const transform = (data: any, header?: any, fns?: Transformer | Transformer[]): any => {
  if (!fns) {
    return data
  }

  // 统一处理
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  // 每个处理过的data
  // 都是下一个函数的输入参数
  // 实现注入
  fns.forEach(fn => {
    data = fn(data, header)
  })

  return data
}

export default transform
