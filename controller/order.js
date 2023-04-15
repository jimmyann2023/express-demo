const db = require("../db/mysql");

exports.findAll= async (req, res, next)=>{
  try {
    let sql = 'SELECT * FROM Porder'
    await db.query(sql, (err, result) => {
      if (err) return console.log(err)
      res.status(201).json(result)
    })
  } catch (err) {
    next(err)
  }
}

exports.create = async (req,res,next)=>{
  try {
    let sql = 'INSERT INTO Porder SET ?'
    let add_value = {
      title: req.body.title,
      content: req.body.content,
      company: req.body.company,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      qq: req.body.qq,
      wangwang: req.body.wangwang,
      msn: req.body.msn,
      time: req.body.date
    }

    await db.query(sql, add_value, (err, result) => {
      if (err) return console.log(err)

      if (result.affectedRows === 1) {
        console.log('插入成功')
        res.status(201).json({message: '插入成功'})
      }
    })
  } catch (e) {
    next(e)
  }
}