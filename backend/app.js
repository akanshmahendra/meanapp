const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://akki:7bDhflTpetlaP7Yy@cluster0-tpn9m.mongodb.net/post-test?retryWrites=true&w=majority', { useUnifiedTopology:true , useNewUrlParser:true })
    .then(() => {
        console.log('Connected to Database!');
    })
    .catch((error) => {
        console.log('Connection Failed with => ', error);
    });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE, OPTIONS, PUT');
    next();
});

app.use('/api/posts', postRoutes);

module.exports = app;