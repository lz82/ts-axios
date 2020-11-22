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
  }
})


axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})



