const util = require('util')

module.exports = () => {
  return (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.send({status: 401, message: 'Invalid token'})
    }
    res.status(500).json({error: util.format(err)}) // 暂时输出在客户端 后期上线需要改
  }
}

