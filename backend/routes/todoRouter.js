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
            res.status(400).send({ message: "Fill Data fields on title,tododate" })
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


const updateToDo = async(req, res) => {
    try {
        if (!req.body.title || !req.body.todoDate) {
            res.status(400).send({ message: "Fill Data fields on title,tododate" })
        }

        const { id } = req.params

        const toDo = await Todo.findByIdAndUpdate(id, req.body);

        if (!toDo) {
            return res.status(400).send("Not found any todo list");
        } else {
            return res.status(200).send("Todo item Update Successfully");
        }

    } catch (error) {
        return res.status(500).send({ message: error })
    }
}


const deleteToDo = async(req, res) => {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
        return res.status(400).send("The task was not found")
    } else {
        return res.status(200).send("The task delete successfully")
    }
}

module.exports = { addToDo, getAllToDo, getToDo, updateToDo, deleteToDo };