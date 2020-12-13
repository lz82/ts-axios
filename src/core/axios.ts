import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolveFn,
  RejectFn
} from '../types'
import InterceptorManager from './interceptor-manager'
import dispatchRequest from './dispatch-request'
import mergeConfig from './merge-config'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  reject?: RejectFn
}

// Axios 类
// 具有request, get, post...实例方法
export default class Axios {
  interceptors: Interceptors
  defaults: AxiosRequestConfig
  constructor(config: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = config
  }
  private _requestWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  private _requestWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    // 将传入config和default-config进行merge
    config = mergeConfig(this.defaults, config)
    console.log(
      'merged config',
      config.transformRequest[0],
      config.transformRequest[1],
      config.transformResponse[1]
    )
    let chain: Array<PromiseChain<any>> = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('GET', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('Delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('HEAD', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('OPTIONS', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('POST', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('PUT', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('PATCH', url, data, config)
  }
}
