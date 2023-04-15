const bcrypt = require('bcryptjs');
const db = require("../db/mysql");
const jwt = require('jsonwebtoken')
const {secretKey} = require('../middleware/constsnt')

// 注册用户
exports.register = async (req, res, next) => {
  try {
    let postData = req.body;
    const pass = bcrypt.hashSync(req.body.password, 10)
    let sql = 'insert into User set name=?,password=?'
    let add_value = [postData.name, pass]

    await db.query(sql, add_value, (err, result) => {
      if (err) return console.log('新增数据失败')

      if (result.affectedRows === 1) {
        res.status(201).json({message:"注册成功"})
      }
    })
  } catch (e) {
    next(e)
  }
}

exports.login = async (req, res, next) => {
  try {

    let sql = 'select * from User  where name= ? '
    let value = [req.body.name];

    // 调用bcrypt.compareSync判断输入密码与数据库加密密码是否一致
    await db.query(sql, value, (err, result) => {
      if (err) return console.log('登录失败')
      const compareResult = bcrypt.compareSync(req.body.password, result[0].password)
      if (!compareResult) return res.status(400).json({message:"请重新校验登录名和密码"})

      res.status(200).json({
        message: "登录成功",
        // jwt.sign() 生成 JWT 字符串
        // 参数：用户信息对象、加密密钥、配置对象-token有效期
        // 尽量不保存敏感信息，因此只有用户名，没有密码
        token: jwt.sign({name: result[0].name}, secretKey, {expiresIn: 60 * 60 * 24})
      })
    })
  } catch (err) {
    next(err)
  }

}

exports.getUser = async (req, res, next) => {
}

exports.putUser = async (req, res, next) => {
}

exports.deleteUser = async (req, res, next) => {
}