const dotenv = require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const TaskModel = require("./model")

const mongoose = require('mongoose');
const password = process.env.MONGO_DB_PW_KEY
const uri = `mongodb+srv://travelApp:${password}@cluster0.ueghe.mongodb.net/toDoApp?retryWrites=true&w=majority`
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

async function addTask(req, res) {
    const newTask = new TaskModel(req.body)
    try {
        await newTask.save()
        res.send(newTask)
    } catch (err) {
        res.status(406).send(err)
    }
}

async function readTask(req, res) {
    try {
        const tasks = await TaskModel.find({})
        res.send(tasks)
    } catch (err) {
        res.status(406).send(err)
    }
}


express()
    .use(express.json())
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post("/task", addTask)
    .get("/task", readTask)
    .listen(PORT, () => console.log(`Listening on ${PORT}`))