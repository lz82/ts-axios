import { AxiosRequestConfig } from './types'
import buildUrl from './helper/url'

import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  console.log(buildUrl(config.url, config.params))
  xhr(config)
}

export default axios
