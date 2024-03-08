const mongoose = require('mongoose');

const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    todoDate: {
        type: Date,
        default: Date.now(),
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("todoModel", TodoSchema)