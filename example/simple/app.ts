import axios, { AxiosError } from '../../src/index'
import qs from 'qs'
interface IGet {
  msg: string
}

interface IPost {
  a: number
  b: number
}



// axios.interceptors.response.use(res => {
//   res.data.msg += ' a'
//   return res
// })

// axios.interceptors.response.use(res => {
//   res.data.msg += ' b'
//   return res
// })

// axios.interceptors.response.use(res => {
//   res.data.msg += ' c'
//   return res
// })
const instance = axios.create()
instance.interceptors.request.use(config => {
  config.header['authorization'] = 'thisisatoken'
  return config
})
axios<IPost>('/base/post', {
  // header: {
  //   test: ''
  // },
  method: 'post',
  data: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  },
  transformRequest: [(data) => {
    return qs.stringify(data)
  }, ...axios.defaults.transformRequest as any],
  transformResponse: [...axios.defaults.transformResponse as any, (data) => {
    data.transform = 'transform yet'
    return data
  }]
}).then(res => {
  console.log(res)
})

instance.get('/simple/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  }
}).then(res => console.log(res))
  .catch((err: AxiosError) => console.log(err.message))

// instance.post<IPost>('/base/post', {
//   a: 1,
//   b: 2
// }, {
//   responseType: 'json'
// }).then(res => console.log(res))
