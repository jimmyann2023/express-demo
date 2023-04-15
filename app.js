const path = require('path')
const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const rfs = require('rotating-file-stream')

// const jwtAuth = require('./middleware/auth')
const errorHandle = require('./middleware/error-handler')
const routes = require('./router');


const app = express();
const port = process.env.PORT || 3000;


// const logger = require('./logs/index')

// 日志
// app.use(morgan('dev'))
let accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))


// 跨域
app.use(cors())

// app.use(jwtAuth)

// 配置表单请求体 解析application/json
app.use(express.json())

// 配置表单请求体 解析x-www-from-application/json
app.use(express.urlencoded({extended: true}))

// 静态资源
// http://localhost:3000/uploads/banner01.jpg 可以看到上传的文件
app.use(express.static(path.join(__dirname, 'public')));

// app.all('*', (req, res, next) => {
//   // google需要配置，否则报错cors error
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   // 允许的地址,http://127.0.0.1:9000这样的格式
//   res.setHeader('Access-Control-Allow-Origin', req.get('Origin'))
//   // 允许跨域请求的方法
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'POST, GET, OPTIONS, DELETE, PUT'
//   )
//   // 允许跨域请求header携带哪些东西
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
//   )
//   next()
// })

//设置路由
app.use('/api', routes);

// 单张


// 挂在错误日志
app.use(errorHandle())


app.listen(port, () => {
  console.log(`Serve is running at http://localhost:${port}`);
})
