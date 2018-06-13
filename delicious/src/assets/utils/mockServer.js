var Mock = require('mockjs')

Mock.mock('/demo/login', 'post',function(){
  return {
    data: {
      a:1
    }
  }
});

Mock.mock('/login', 'post', {//这里的url地址其实可以换成一个字段，比如msg,下边请求时候对应就可以
  state:0,
  data: {
    'name': '@cname',
    'age|1-10': 10
  },
  message: '登录成功'
})