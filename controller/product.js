const db = require("../db/mysql");


exports.create = async (req, res, next) => {
  try {
    // 拆封数组字段
    let Path = ''
    for (let i = 0; i < req.body.banner.length - 1; i++) {
      Path += `${req.body.banner[i]} ,`
    }
    const ImgPath = Path + req.body.banner[req.body.banner.length - 1]
    console.log(ImgPath)
    let sql = 'INSERT INTO Product SET ?'
    let value = {
      name: req.body.name,
      content: req.body.content,
      banner: ImgPath
    }
    await db.query(sql, value, (err, result) => {
      if (err) return console.log(err)
      if (result.affectedRows === 1) {
        console.log('插入成功')
        res.status(201).json({message: '插入成功'})
      }
    })
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    // 拆封数组字段
    let Path = ''
    for (let i = 0; i < req.body.banner.length - 1; i++) {
      Path += `${req.body.banner[i]} ,`
    }
    const ImgPath = Path + req.body.banner[req.body.banner.length - 1]


    let sql = 'UPDATE Product SET banner =? ,content=?  WHERE name = ? '
    let value = [ImgPath, req.body.content, req.body.name]
    await db.query(sql, value, (err, result) => {
      if (err) return console.log(err)
      if (result.affectedRows === 1) {
        console.log('修改成功')
        res.status(201).json({message: '修改成功'})
      }
    })
  } catch (err) {
    next(err)
  }
}

exports.finOne = async (req, res, next) => {
  try {
    let sql = 'SELECT * From Product  WHERE name = ? '
    let value = [req.params.name]
    db.query(sql, value, (err, result) => {
      if (err) return console.log(err)
      let data = result
      data[0].banner=data[0].banner.split(",")
      res.status(200).json(data)
    })
  } catch (err) {
    next(err)
  }

}