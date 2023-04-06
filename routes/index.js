const express = require('express');
const router = express.Router();

//这个路由可以设置用户
/* GET users listing. */
router.get("/", (req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.dir(req.query)
    res.send("Hello World")
})

router.post("/", (req, res) => {
    res.status(201).send({post: "foot"})
})



module.exports = router;