import axios, { AxiosError } from '../../src/index'

interface IGet {
  msg: string
}

interface IPost {
  a: number
  b: number
}
axios.interceptors.request.use(config => {
  console.log(config)
  config.header['test'] = 1111111111111
  return config
})
axios<IGet>('/simple/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  },
  header: {
    test: 1
  }
}).then(res => { console.log(res.data.msg) })

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
