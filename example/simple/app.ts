import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b'],
    d: new Date(),
    e: { name: 'lz' }
  },
  timeout: 1
}).then(res => console.log(res))
  .catch(err => console.log(err))


axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log(res))



