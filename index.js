const dotenv = require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb');
const password = process.env.MONGO_DB_PW_KEY
const uri = `mongodb+srv://travelApp:${password}@cluster0.ueghe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri);

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

async function addTask(req, res) {
    res.send("Not implemented yet")
 }

 async function readTask(req, res) {
    res.send("Not implemented yet")
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