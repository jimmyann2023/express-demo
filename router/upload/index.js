const express = require('express');
const router = express.Router();

const upload = require('../../middleware/FileUpload/upload')

const UploadController = require('../../controller/upload')
router.post('/profile', upload.single('file'), UploadController.file)
// router.post('/profile', upload.single('file'), (req, res) => {
//   console.log(req.file)
//   res.send('ok')
// })
// 一组最多12张
router.post('/photos/upload', upload.array('file', 12),UploadController.multipleFile)

module.exports = router;