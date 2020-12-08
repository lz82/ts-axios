import { ResolveFn, RejectFn } from '../types'

interface Interceptor<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    this.interceptors.push({
      resolve,
      reject
    })

    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // 并没有在对外的interface中定义
  // 因为外部并不需要使用
  // 外部只使用use和eject
  forEach(fn: (params: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
