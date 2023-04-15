const {expressjwt: jwt} = require('express-jwt')

// 前端验证方式
// request.headers['Authorization'] =`Bearer ${token}`;

const {secretKey} = require('./constsnt');
// 用来指定哪些接口不需要访问权限----正则表达式 /api开头的
const jwtAuth =
  jwt({secret: secretKey, algorithms: ['HS256']})
    .unless({path: ["/api/user/login", "/api/user/register"]})

module.exports = jwtAuth;