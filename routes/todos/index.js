const express = require('express');
const router = express.Router();

const {getDB, saveDB} = require("../../db");

router.get("/", async (req, res,next) => {
    try {
        const db = await getDB()
        res.status(200).json(db.todos);
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res,next) => {
    try {
        const db = await getDB()
        const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!todo) {
            return res.status(404).end()
        }
        res.status(200).json(todo);
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res,next) => {
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
    } catch (err) {
        next(err)
    }
})
router.patch("/:id", async (req, res,next) => {
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

    } catch (err) {
        next(err)
    }
})
router.delete("/:id", async (req, res,next) => {
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
    } catch (err) {
        next(err)
    }
})

module.exports = router;
