const express = require('express');
const router = express.Router();

const {getDB, saveDB} = require("../../db");

router.get("/todos/", async (req, res) => {
    try {
        const db = await getDB()
        res.status(200).json(db.todos);
    } catch (e) {
        res.status(500).json({errorMsg: e.message})
    }
})

router.get("/todos/:id", async (req, res) => {
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
})

router.post("/todos/", async (req, res) => {
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
router.patch("/todos/:id", async (req, res) => {
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
router.delete("/todos/:id", async (req, res) => {
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

module.exports = router;
