const express = require('express');
const router = express.Router();

const productController = require('../../controller/product')

router.post('/',productController.create)

router.put('/',productController.update)

router.get('/:name',productController.finOne)

module.exports = router;