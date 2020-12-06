import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatch-request'

// request(config: AxiosRequestConfig): AxiosPromise;

// get(url: string, config ?: AxiosRequestConfig): AxiosPromise;
// delete (url: string, config ?: AxiosRequestConfig): AxiosPromise;
// head(url: string, config ?: AxiosRequestConfig): AxiosPromise;
// options(url: string, config ?: AxiosRequestConfig): AxiosPromise;
// post(url: string, data ?: any, config ?: AxiosRequestConfig): AxiosPromise;
// put(url: string, data ?: any, config ?: AxiosRequestConfig): AxiosPromise;
// patch(url: string, data ?: any, config ?: AxiosRequestConfig): AxiosPromise;
export default class Axios {
  private _requestWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return dispatchRequest(
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
    return dispatchRequest(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }

  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
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
