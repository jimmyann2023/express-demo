const express = require('express');
const router = express.Router();



const order = require('./order')
const product = require('./product')

router.use(require('./users'))
router.use(require('./upload'))


router.use('/order', order)
router.use('/product', product)


module.exports = router;