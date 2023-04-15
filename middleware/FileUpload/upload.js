const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsPath = path.join(__dirname, '../../public/uploads/')
    cb(null, uploadsPath)
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname)
  }
})
const upload = multer({storage})

module.exports = upload;