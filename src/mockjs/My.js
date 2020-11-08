export default {
  'http://localhost:8080/t|get': options => {
    return {
      status: 200,
      msg: '获取成功',
      data: {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604847028017&di=533632a97731d71755248a4250bedc24&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201911%2F23%2F20191123152152_atmbk.thumb.700_0.jpg',
        name: '卢本伟'
      }
    }
  },
  'http://localhost:8080/q|get': options => {
    return {
      status: 200,
      msg: '获取成功',
      data: {
        balance: 145730
      }
    }
  }
}
