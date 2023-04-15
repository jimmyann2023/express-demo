const express = require('express');
const router = express.Router();
const userController = require('../../controller/user')


/* GET users listing. */

// 用户登录
router.post("/user/login", userController.login)

// 用户注册
router.post('/user/register', userController.register)

// 更新用户
router.put('/user', userController.putUser)

// 删除用户
router.put('/user', userController.deleteUser)

// router.post("/user/login", (req, res) => {
//   let postData = req.body;
//   let sql = 'select * from userinfo  where name= ? '
//   let where_value = [postData.name];
//   db.query(sql, where_value, (err, result) => {
//     if (err) return console.log('新增数据失败')
//     console.log(result)
//     console.log(result[0])
//     res.status(200).json({
//       message: "登录成功",
//       // jwt.sign() 生成 JWT 字符串
//       // 参数：用户信息对象、加密密钥、配置对象-token有效期
//       // 尽量不保存敏感信息，因此只有用户名，没有密码
//       token: jwt.sign({name: result[0].name}, secretKey, {expiresIn: 60 * 60 * 24})// 授权时效24小时
//     })
//   })
//
//
// })

// router.post('/user/add', async (req, res, next) => {
//   var postData = req.body;
//
//   var sql = 'insert into userinfo set id=?,name=?,age=?,address=?'
//   var add_value = [postData.id, postData.name, postData.age, postData.address]
//   await db.query(sql, add_value, (err, result) => {
//     if (err) return console.log('新增数据失败')
//
//     if (results.affectedRows === 1) {
//       console.log('插入成功')
//       res.status(201).json(result)
//     }
//   })
//
// })

// 获取用户
// router.get('/users', async (req, res, next) => {
//   try {
//     var params = req.query
//     //查询语句
//     var sql = 'select * from userinfo  where name= ? and age=?'
//     var where_value = [params.name, params.age];
//
//     await db.query(sql, where_value, (err, result) => {
//       if (err) {
//         console.log('[SELECT ERROR]:', err.message);
//       }
//       res.status(200).json(result)
//     })
//   } catch (err) {
//     next(err)
//   }
// })

// 更新用户
// router.put("/user", (req, res) => {
//   const value = [req.body.name, req.body.age, req.body.address]
//   const sql = 'update userinfo set name=?, age=?, address=?'
//   db.query(sql, value, (err, results) => {
//     if (err) return console.log('修改数据失败')
//
//     if (results.affectedRows === 1) {
//       console.log('修改数据成功')
//       res.status(201).json(result)
//     }
//   })
//
//
// })

// 删除用户
// router.delete("/", (req, res) => {
//   res.send("delete /user")
// })


module.exports = router;