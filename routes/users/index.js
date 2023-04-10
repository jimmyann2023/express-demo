const express = require('express');
const router = express.Router();

//这个路由可以设置用户
/* GET users listing. */

router.put("/", (req, res) => {
    res.send("put /user")
})

router.delete("/", (req, res) => {
    res.send("delete /user")
})

module.exports = router;