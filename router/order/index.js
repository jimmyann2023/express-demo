const express = require('express');
const db = require("../../db/mysql");
const router = express.Router();
const OderController = require('../../controller/order')

router.get('/', OderController.findAll)
router.post('/', OderController.create)

module.exports = router;