const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const { addToDo, getAllToDo, getToDo, updateToDo, deleteToDo, updateActive } = require('./routes/todoRouter')

app.use(express.json())

const PORT = process.env.PORT
const URL = process.env.URL

app.use(cors());


app.get('/todo', getAllToDo)

app.get('/todo/:id', getToDo)

app.post('/todo', addToDo)

app.put('/todo/:id', updateToDo)

app.put('/todo/active/:id', updateActive)

app.delete('/todo/:id', deleteToDo)


//connect the db
mongoose.connect(URL)
    .then(() => {
        console.log("Connected to db")
        app.listen(PORT, () => {
            console.log("app listen in " + PORT)
        })

    })
    .catch((err) => {
        console.log("Error connecting to the database: ", err);
    })