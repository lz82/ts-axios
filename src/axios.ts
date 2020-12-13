import { AxiosStatic, AxiosRequestConfig } from './types'
import defaultConfig from './default-config'
import Axios from './core/axios'
import { extend } from './helper/utils'
import mergeConfig from './core/merge-config'

// 返回混合类型的Axios
// 同时具有属性方法（实例上的）
// 自身又是方法
function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const instance = createAxiosInstance(defaultConfig)

instance.create = function(config) {
  return createAxiosInstance(mergeConfig(defaultConfig, config))
}

console.log(instance.defaults)

export default instance
