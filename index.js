const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://travelApp:shperlolz10@cluster0.ueghe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri);

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.json())
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))