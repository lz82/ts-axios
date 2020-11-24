import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get1',
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  }
}).then(res => console.log(res))
  .catch((err: AxiosError) => console.log(err.message))


axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log(res))



