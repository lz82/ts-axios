import axios, { AxiosError } from '../../src/index'

interface IGet {
  msg: string
}

interface IPost {
  a: number
  b: number
}
axios.interceptors.request.use(config => {
  config.header['test'] += 'b'
  return config
})

axios.interceptors.request.use(config => {
  config.header['test'] += 'c'
  return config
})

axios.interceptors.request.use(config => {
  config.header['test'] += 'a'
  return config
})

axios.interceptors.response.use(res => {
  res.data.msg += ' a'
  return res
})

axios.interceptors.response.use(res => {
  res.data.msg += ' b'
  return res
})

axios.interceptors.response.use(res => {
  res.data.msg += ' c'
  return res
})

axios<IGet>('/simple/get', {
  header: {
    test: ''
  },
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  }
}).then(res => {
  console.log(res.data.msg)
})

// axios.get('/simple/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b'],
//     d: new Date(),
//     e: { name: 'lz' }
//   }
// }).then(res => console.log(res))
//   .catch((err: AxiosError) => console.log(err.message))

// axios.post<IPost>('/base/post', {
//   a: 1,
//   b: 2
// }, {
//   responseType: 'json'
// }).then(res => console.log(res.data.a, res.data.b))
