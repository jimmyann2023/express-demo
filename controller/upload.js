const db = require("../db/mysql");

exports.file = async (req, res, next) => {
  try {


    let originalname = req.file.originalname
    let path = req.file.path;

    let sql = 'INSERT INTO Imgsrc  set ?'
    let add_value = {
      title: originalname, src: path

    }

    await db.query(sql, add_value, (err, result) => {
      if (err) return console.log('新增数据失败')

      if (result.affectedRows === 1) {
        console.log('插入成功')
        res.status(201).json({message: '插入成功'})
      }
    })
  } catch (e) {
    next(e)
  }
}

exports.multipleFile = async (req, res, next) => {
  try {
    console.log(req)
    // let originalname = req.file.originalname
    // let path = req.file.path;
    //
    // let sql = 'INSERT INTO Imgsrc  set ?'
    // let add_value = {
    //   title: originalname, src: path
    //
    // }
    //
    // await db.query(sql, add_value, (err, result) => {
    //   if (err) return console.log('新增数据失败')
    //
    //   if (result.affectedRows === 1) {
    //     console.log('插入成功')
    //     res.status(201).json({message: '插入成功'})
    //   }
    // })
  } catch (err) {
    next(err)
  }
}