const { red } = require('cli-color');
const express = require('express');
const router = express.Router();
const db = require('../models');

// get all todos
router.get('/all', (req, res) => {
    db.Todo.findAll().then(todos=> res.send(todos))
    .catch((err) => res.send({ success: false, error: err.message }));
});

// get single todo by id
router.get('/find/:id', (req, res) => {
    db.Todo.findOne({
        attributes: ['id', 'text'],
        where: {
            id: req.params.id,
        }
    }).then(todo => res.send(todo))
    .catch((err) => res.send({ success: false, error: err.message }));
});

// post new todo
router.post('/new', (req, res) => {
    db.Todo.create({
        text: req.body.text,
    }).then(submittedTodo => res.send(submittedTodo))
    .catch((err) => res.send({ success: false, error: err.message }));
});

// edit a todo
router.put('/edit', (req, res) => {
    db.Todo.update({ text: req.body.text }, {
        where: {
            id: req.body.id,
        }
    }).then(updatedTodo => res.send({ success: true, id: updatedTodo[0] }))
    .catch((err) => res.send({ success: false, error: err.message }));
});

// delete a single todo
router.delete('/delete/:id', (req, res) => {
    db.Todo.destroy({
        where: {
            id: req.params.id,
        }
    }).then(() => res.send({ success: true }))
    .catch((err) => res.send({ success: false, error: err.message }));
});

module.exports = router;