import axios, { AxiosError } from '../../src/index'

axios.get('/simple/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  }
}).then(res => console.log(res))
  .catch((err: AxiosError) => console.log(err.message))


axios.post('/base/post', {
  a: 1,
  b: 2
}, {
  responseType: 'json'
}).then(res => console.log(res))
