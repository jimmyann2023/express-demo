const fs = require('fs')
const path = require('path')
const express = require("express");

const routes = require('./routes/index');
const users = require('./routes/users/index')
const todos = require("./routes/todos/index")


const app = express();
const port = 3000;

// 配置表单请求体 解析application/json
app.use(express.json())

// 配置表单请求体 解析x-www-from-application/json
app.use(express.urlencoded)

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

//设置路由
app.use('/', routes);
app.use('/users', users);
app.use('/todos', todos);


app.listen(port, () => {
    console.log("Serve is running at http://localhost:3000");
})