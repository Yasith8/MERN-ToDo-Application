const Todo = require('../models/todomodel');

const getAllToDo = async(req, res) => {
    try {
        let toDo = await Todo.find({}).sort({ 'createdAt': -1 });
        return res.status(200).json(toDo);

    } catch (err) {
        return res.status(500).send({ message: err })
    }
}


const getToDo = async(req, res) => {
    try {
        const id = req.params.id;
        let toDo = await Todo.findById({ _id: id })
        return res.status(200).json(toDo);
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}


const addToDo = async(req, res) => {
    try {
        if (!req.body.title || !req.body.todoDate) {
            res.status(400).send({ message: "Fill Data fields on title" })
        } else {
            const todo = {
                title: req.body.title,
                description: req.body.description || "",
                todoDate: req.body.todoDate,
                isActive: true
            }

            const newTodo = await Todo.create(todo)
            return res.status(200).send(newTodo);
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports = { addToDo, getAllToDo, getToDo };