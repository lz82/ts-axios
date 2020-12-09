import { AxiosInstance } from './types'
import Axios from './core/axios'
import { extend } from './helper/utils'

// 返回混合类型的Axios
// 同时具有属性方法（实例上的）
// 自身又是方法
function createAxiosInstance(): AxiosInstance {
  const context = new Axios()

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const instance = createAxiosInstance()

export default instance
