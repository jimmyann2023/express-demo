const express = require("express");
const app = express();
const port = 3000;

// 配置表单请求体 解析application/json
app.use(express.json())

// 配置表单请求体 解析x-www-from-application/json
// app.use(express.urlencoded)

const {getDB, saveDB} = require('./db')


app.get("/", (req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.dir(req.query)
    res.send("Hello World")
})

app.post("/", (req, res) => {
    res.status(201).send({post: "foot"})
})

app.put("/user", (req, res) => {
    res.send("put /user")
})

app.delete("/user", (req, res) => {
    res.send("delete /user")
})


app.get("/todos/", async (req, res) => {
    try {
        const db = await getDB()
        res.status(200).json(db.todos);
    } catch (e) {
        res.status(500).json({errorMsg: e.message})
    }


    // 已经封装在上面 getDB
    // fs.readFile('./db.json', "utf-8", (err, data) => {
    //     if (err) {
    //         res.status(500).json({
    //             errorMsg: "读取失败" + err.message
    //         })
    //     }
    //     const db = JSON.parse(data)
    //     res.status(200).send(db.todos)
    // })
})

app.get("/todos/:id", async (req, res) => {
    try {
        const db = await getDB()
        const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!todo) {
            return res.status(404).end()
        }
        res.status(200).json(todo);
    } catch (e) {
        res.status(500).json({errorMsg: e.message})
    }
    // fs.readFile('./db.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         res.status(500).json({errorMsg: err.message})
    //     }
    //     const db = JSON.parse(data);
    //     const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
    //     if (!todo) {
    //         return res.status(404).end()
    //     }
    //     res.status(200).json(todo);
    // })
})

app.post("/todos/", async (req, res) => {
    try {
        const todo = req.body
        if (!todo.title) {
            return res.status(422).json({error: "The field title is required."})
        }
        const db = await getDB()
        const lastTodo = db.todos[db.todos.length - 1]
        todo.id = lastTodo ? lastTodo.id + 1 : 1
        db.todos.push(todo)
        saveDB(db)
        res.status(201).json(todo)
    } catch (e) {
        res.status(500).json({errorMsg: e.message})
    }


})
app.patch("/todos/:id", async (req, res) => {
    try {
        const todo = req.body
        const db = await getDB()
        const ret = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!ret) {
            return res.status(404).end()
        }
        Object.assign(ret, todo)
        await saveDB(ret)
        res.status(200).json(ret)

    } catch (e) {
        res.status(500).json({errorMsg: e.message})
    }

})
app.delete("/todos/:id", async (req, res) => {
    try {
        const todoId = Number.parseInt(req.params.id)
        const db = await getDB();
        const index = db.todos.findIndex(todo => todo.id === todoId)

        if (index === -1) {
            return res.status(404).end()
        }
        db.todos.splice(index, 1)
        await saveDB(db)
        res.status(204).end()
    } catch (e) {
        res.status(500).json({errorMsg: e.message})
    }
})


app.listen(port, () => {
    console.log("Serve is running at http://localhost:3000");
})